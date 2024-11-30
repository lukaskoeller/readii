<script lang="ts">
  import { feedHandler, onboardingHandler } from "../core/hooks.svelte";
  import AddFeedForm from "./AddFeedForm.svelte";
  import Chip from "./Chip.svelte";
  import Details from "./Details.svelte";

  const noSubscriptions = $derived(feedHandler.authors.length);
  const isEmpty = $derived(
    !feedHandler.isLoading && feedHandler.feed.length === 0
  );

  $effect(() => {
    if (isEmpty) {
      onboardingHandler.isOnboarding = true;
    }
  });
</script>

<section class="container">
  <header class="header">
    <h1 class="h1">A simply, AI enhanced RSS Reader</h1>
    <h2 class="h2">
      With readii you can simply follow your favorite blogs or news sites by
      adding their RSS feed to your personal feed.
    </h2>
  </header>
  <div class="suggestions">
    <h3 class="h3">Choose from the list</h3>
    <details name="suggestions" id="top">
      <summary>Generic (12)</summary>
      <div>
        <Chip title="Adam Argyle" />
      </div>
    </details>
    <Details name="suggestions" title="Tech (2)" id="tech" open>
      {#snippet content()}
        <div class="nc-cluster">
          <Chip
            title="Adam Argyle"
            src="https://res.cloudinary.com/dnpmdb8r8/image/upload/argyleink/rss-icon.png"
            onclick={() => feedHandler.add("https://nerdy.dev/rss.xml")}
          />
          <Chip
            title="Anthony Fu"
            src="https://antfu.me/avatar.png"
            onclick={() => feedHandler.add("https://antfu.me/feed.xml")}
          />
        </div>
      {/snippet}
    </Details>
    <details name="suggestions" id="politics">
      <summary>Politics (5)</summary>
      <div>Badges with Authors</div>
    </details>
    <details name="suggestions" id="economics">
      <summary>Economics (4)</summary>
      <div>Badges with Authors</div>
    </details>
    <details name="suggestions" id="games">
      <summary>Games (7)</summary>
      <div>Badges with Authors</div>
    </details>
    <details name="suggestions" id="fashionbeauty">
      <summary>Fashion & Beauty (13)</summary>
      <div>Badges with Authors</div>
    </details>
  </div>
  <div class="import">
    <h3 class="h3">Import your own</h3>
    <div class="stack">
      <div class="card">
        <AddFeedForm />
      </div>
      <div class="card stack">
        {#if noSubscriptions === 0}
          <p>
            Add a feed to your list by choosing from the list or add the URL in
            the input.
          </p>
        {:else}
          <p>
            You selected {noSubscriptions} feed{noSubscriptions > 1 ? "s" : ""} to
            start with.
          </p>
        {/if}
        <button
          type="button"
          onclick={() => {
            onboardingHandler.isOnboarding = false;
          }}>Start reading</button
        >
      </div>
    </div>
  </div>
</section>

<style>
  @custom-media --sm-n-above (width >= 480px);
  @custom-media --md-n-above (width >= 768px);

  .container {
    margin-block-start: var(--spacing-far);
    inline-size: min(100%, 120ch);
    margin-inline: auto;
    display: grid;
    gap: var(--spacing-far);
    grid-template:
      "header" auto
      "suggestions" auto
      "import" auto
      / 1fr;

    @media (--md-n-above) {
      grid-template:
        "header header" auto
        "suggestions import" auto
        / 1fr 1fr;
      gap: var(--spacing-far);
      row-gap: var(--spacing-farthest);
    }
  }

  .header {
    grid-area: header;
    display: grid;
    gap: var(--spacing-base);
    inline-size: min(100%, 80ch);
    text-align: center;
    margin-inline: auto;
  }

  .import {
    grid-area: import;
  }

  .suggestions {
    grid-area: suggestions;
  }

  .h1 {
    color: var(--color-brand-primary-emphasis);
  }

  .h2 {
    color: var(--color-brand-secondary-base);
  }

  .h3 {
    margin-block-end: var(--spacing-near);
  }
</style>
