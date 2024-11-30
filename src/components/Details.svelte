<script lang="ts">
  import type { Snippet } from "svelte";

  type SuggestionDetailsProps = {
    name: string;
    id?: string;
    title: string;
    content: Snippet;
    open?: boolean;
  };

  let { name, id, title, content, open }: SuggestionDetailsProps = $props();
</script>

<details {name} {id} {open}>
  <summary>{title}</summary>
  <div>{@render content()}</div>
</details>
