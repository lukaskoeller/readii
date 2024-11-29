<script lang="ts">
  import type { Snippet } from "svelte";

  type SuggestionDetailsProps = {
    name: string;
    id?: string;
    title: string;
    content: Snippet;
  };

  let { name, id, title, content }: SuggestionDetailsProps = $props();
</script>

<details {name} {id}>
  <summary>{title}</summary>
  <div class="stack">{@render content()}</div>
</details>

<style>
  .stack {
    display: flex;
    gap: var(--spacing-near);
    flex-wrap: wrap;
  }
</style>
