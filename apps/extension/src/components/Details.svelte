<script lang="ts">
  import type { Snippet } from "svelte";

  type SuggestionDetailsProps = {
    name: string;
    id?: string;
    title: string;
    content: Snippet;
    open?: boolean;
    className?: string;
  };

  let { name, id, title, content, open, className }: SuggestionDetailsProps = $props();
</script>

<details {name} {id} {open} class={className}>
  <summary>{title}</summary>
  <div>{@render content()}</div>
</details>
