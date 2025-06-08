<script>
  import AddFeedForm from "./AddFeedForm.svelte";
</script>

<button class="import-button" popovertarget="import-button">Add RSS Feed</button
>
<div class="import-popup" id="import-button" popover>
  <AddFeedForm />
</div>

<style>
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
</style>
