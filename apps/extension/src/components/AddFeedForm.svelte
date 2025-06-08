<script lang="ts">
  import { feedHandler } from "../core/hooks.svelte";

  let formEl: HTMLFormElement;

  const onSubmit = async (event: SubmitEvent) => {
    event.preventDefault();
    const formData = new FormData(formEl);
    const url = formData.get("url") as string;
    await feedHandler.add(url);
    formEl.reset();
  };
</script>

<form class="form" bind:this={formEl} onsubmit={onSubmit}>
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

<style>
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
