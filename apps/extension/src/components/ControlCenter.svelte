<script lang="ts" module>
  import { feedHandler } from "../core/hooks.svelte";
  import Chip from "./Chip.svelte";
  import CloseIconButton from "./CloseIconButton.svelte";

  let noSubscriptions = $derived(feedHandler.authors.length);

  let dialog: HTMLDialogElement;

  const onSubmit = async (event: SubmitEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const keys = formData.getAll("authorKey") as string[];
    try {
      await feedHandler.remove(keys);
      form.reset();
      dialog.close();
    } catch (error) {
      console.error(error);
      // @todo: Show error message
    }
  };
</script>

<dialog bind:this={dialog} class="dialog dialog-grid card">
  <header class="dialog-header">
    <h1>Edit RSS Feeds</h1>
    <CloseIconButton onclick={() => dialog.close()} />
  </header>
  <form onsubmit={onSubmit} id="edit-feeds">
    <div class="stack dialog-body">
      <p class="is-empty">There are no feeds.</p>
      {#each feedHandler.authors as author}
        {#if author.name}
          <div class="field">
            <input
              type="checkbox"
              name="authorKey"
              id={author.key}
              value={author.key}
            />
            <label for={author.key}>{author.name}</label>
          </div>
        {/if}
      {/each}
    </div>
  </form>
  <footer class="dialog-footer">
    <button
      type="button"
      data-variant="secondary"
      onclick={() => dialog.close()}>Cancel</button
    >
    <button type="submit" form="edit-feeds" data-variant="destructive"
      >Delete</button
    >
  </footer>
</dialog>
<div class="control-center">
  <details class="details" open>
    <summary class="summary">
      <span>RSS Feeds ({noSubscriptions})</span>
      <button
        data-variant="secondary"
        data-size="sm"
        onclick={() => {
          dialog.showModal();
        }}>Edit</button
      >
    </summary>
    <div class="nc-cluster">
      {#each feedHandler.authors as author}
        {#if author.name}
          <Chip title={author.name} src={author.image.url} />
        {/if}
      {/each}
    </div>
  </details>
</div>

<style>
  @custom-media --md-n-above (width >= 768px);

  .control-center {
    position: sticky;
    top: var(--spacing-far);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-base);
    font-family: var(--font-family-sans);
  }

  .details {
    border: 0;
  }

  .summary {
    display: flex
;
    justify-content: space-between;
    align-items: center;
  }

  .field {
    display: flex;
    gap: var(--spacing-near);
    align-items: center;
  }

  .dialog-body:has(:only-child) {
    block-size: 100%;
    display: grid;
    place-items: center;
  }
</style>
