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
  <div>{@render content()}</div>
</details>