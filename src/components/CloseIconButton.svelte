<script lang="ts">
  let { onclick }: { onclick: () => void } = $props();
</script>

<button class="close" aria-label="Close dialog" {onclick}>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="icon icon-tabler icons-tabler-outline icon-tabler-x"
    ><path stroke="none" d="M0 0h24v24H0z" fill="inherit" /><path
      d="M18 6l-12 12"
    /><path d="M6 6l12 12" /></svg
  >
</button>

<style>
  .close {
    padding: var(--spacing-near);
    border-radius: 100%;
  }
</style>
