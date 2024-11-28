<script lang="ts">
  import { RSSFeed } from "../core";

  let formEl: HTMLFormElement;

  const onSubmit = async (event: SubmitEvent) => {
    event.preventDefault();
    const formData = new FormData(formEl);
    const url = formData.get("url") as string;

    const response = await fetch(url);
    const rawText = await response.text();
    const rssItem = new RSSFeed(rawText);

    // Add RSS Feed to Storage
    await chrome.storage.local.set({ [url]: rssItem })
  };
</script>

<header>
  <h1>readii</h1>
  <div>
    <button class="import-button" popovertarget="import-button"
      >Add RSS Feed</button
    >
    <div class="import-popup" id="import-button" popover onsubmit={onSubmit}>
      <form class="form" bind:this={formEl}>
        <!-- COMPONENT-START: nc-input-field -->
        <div class="nc-input-field">
          <label for="nc-input" class="label">
            <div>
              <div class="nc-input-label">URL</div>
              <span class="nc-hint"
                >Insert the URL of RSS Feed you would like to subscribe to</span
              >
            </div>
          </label>
          <input
            id="url"
            name="url"
            class="nc-input"
            aria-required="true"
            autocomplete=""
            type="url"
            required
          />
        </div>
        <!-- COMPONENT-END: nc-input-field -->
        <button class="submit-button" type="submit">Add</button>
      </form>
    </div>
  </div>
</header>

<style>
  header {
    display: flex;
    justify-content: space-between;
    padding: var(--spacing-near);
    align-items: center;
  }

  .import-button {
    anchor-name: --import-button;
  }

  .import-popup {
    position: absolute;
    position-anchor: --import-button;
    position-area: end span-start;

    margin-block-start: var(--spacing-near);
    inline-size: min(48ch, 100%);
    background-color: var(--color-surface-muted);
    padding: var(--spacing-base);
    border-radius: var(--border-radius-large);
    box-shadow: var(--shadow-elevation-medium);
  }

  .form {
    display: grid;
    gap: var(--spacing-base);
  }

  .label {
    display: grid;
    gap: var(--spacing-nearest);
  }

  .submit-button {
    justify-self: end;
    padding-inline: var(--spacing-far);
  }
</style>
