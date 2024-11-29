<script>
  import AddButton from "./AddButton.svelte";
  import Logo from "./Logo.svelte";
</script>

<header class="header">
  <Logo />
  <div>
    <AddButton />
  </div>
</header>

<style>
  @custom-media --md-n-above (width >= 768px);

  .header {
    display: flex;
    justify-content: space-between;
    padding: var(--spacing-near);
    align-items: center;

    @media (--md-n-above) {
      padding-inline: var(--spacing-far);
      padding-block-start: var(--spacing-base);
    }
  }
</style>
