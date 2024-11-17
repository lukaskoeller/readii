<script lang="ts">
    let { text }: { text: string } = $props();

  const SUMMARIZER_CONFIG: {
    type: AISummarizerType;
    format: AISummarizerFormat;
    length: AISummarizerLength;
  } = {
    type: "tl;dr",
    format: "plain-text",
    length: "medium",
  };

  let summarizer: AISummarizer | undefined = $state();
  let summarizerStatus: "readily" | "downloading" | "unavailable" | "loading" =
    $state("loading");
  let downloadProgress: number = $state(0);

  const initAISummarizer = async () => {
    const canSummarize = await ai.summarizer.capabilities();
    if (canSummarize && canSummarize.available !== "no") {
      if (canSummarize.available === "readily") {
        // The summarizer can immediately be used.
        summarizerStatus = "readily";
        summarizer = await ai.summarizer.create(SUMMARIZER_CONFIG);
      } else {
        // The summarizer can be used after the model download.
        summarizerStatus = "downloading";
        summarizer = await ai.summarizer.create(SUMMARIZER_CONFIG);
        (summarizer as AISummarizer).addEventListener(
          "downloadprogress",
          (e) => {
            downloadProgress = e.loaded / e.total;
          }
        );
        await (summarizer as AISummarizer).ready;
        summarizerStatus = "readily";
      }
    } else {
      // The summarizer can't be used at all.
      summarizerStatus = "unavailable";
    }
  };

  // Initialize the AI summarizer.
  initAISummarizer();
</script>

<div class="card">
  <h2>AI Summarizer</h2>
  <div>
    {#if summarizerStatus === "loading"}
      <p>Loading AI Summarizer…</p>
    {:else if summarizerStatus === "readily"}
      {#await summarizer}
        <p>Initializing AI Summarizer…</p>
      {:then summarizer}
        {#await (summarizer as AISummarizer).summarize(text)}
          <p>Summarizing text…</p>
        {:then summary}
          <p>{summary}</p>
        {:catch error}
          <p>Failed to summarize text.</p>
          <pre>{error}</pre>
        {/await}
      {:catch}
        <p>Failed to initialize AI Summarizer.</p>
      {/await}
    {:else if summarizerStatus === "downloading"}
      <p>Downloading AI Summarizer…</p>
      <progress value={downloadProgress}></progress>
    {:else if summarizerStatus === "unavailable"}
      <p>AI Summarizer is not available.</p>
    {/if}
  </div>
</div>

<style>
  .card {
    padding: var(--spacing-near);
    border-radius: var(--border-radius-medium);
    background-color: var(--color-brand-primary-base);
  }
</style>
