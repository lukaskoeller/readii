<script lang="ts">
  let { size }: { size?: "sm" | "md" } = $props();
</script>

<div class="logo" data-size={size}>
  <span class="logo-img">
    <svg
      width="64"
      height="40"
      viewBox="0 0 64 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M25.6 17.01V6.57569C25.6 2.94404 28.4654 0 32 0C35.5346 0 38.4 2.94404 38.4 6.57569V16.973L45.5759 9.60018C48.0752 7.03221 52.1275 7.03221 54.6268 9.60018C57.1262 12.1682 57.1262 16.3316 54.6268 18.8996L46.8902 26.8486H57.6C61.1346 26.8486 64 29.7927 64 33.4243C64 37.056 61.1346 40 57.6 40H6.4C2.86538 40 0 37.056 0 33.4243C0 29.7927 2.86538 26.8486 6.4 26.8486H17.0738L9.33702 18.8994C6.83766 16.3314 6.83766 12.1679 9.33702 9.59995C11.8364 7.03198 15.8886 7.03198 18.388 9.59995L25.6 17.01Z"
        fill="currentColor"
      />
    </svg>
  </span>
  <span class="logo-word">readii</span>
</div>

<style>
  @custom-media --sm-n-above (width >= 480px);

  .logo {
    display: flex;
    align-items: center;
    gap: var(--spacing-near);

    @media (--sm-n-above) {
      gap: var(--spacing-base);
    }

    &[data-size="sm"] {
      gap: var(--spacing-near);
    }

    &[data-size="sm"] {
      gap: var(--spacing-base);
    }
  }

  .logo-img {
    inline-size: 32px;

    @media (--sm-n-above) {
      inline-size: 64px;
    }

    & path {
        fill: var(--color-brand-primary-base);
    }
  }

  [data-size="sm"] .logo-img {
    inline-size: 32px;
  }
  [data-size="md"] .logo-img {
    inline-size: 64px;
  }

  .logo-word {
    font-family: var(--font-family-display);
    font-weight: var(--font-weight-default);
    font-size: var(--font-size-large);

    @media (--sm-n-above) {
      font-size: var(--font-size-display);
    }
  }

  [data-size="sm"] .logo-word {
    font-size: var(--font-size-large);
  }

  [data-size="md"] .logo-word {
    font-size: var(--font-size-display);
  }
</style>
