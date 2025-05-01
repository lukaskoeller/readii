<script lang="ts">
    import "$lib/styles/theme.css"
    // import "@nordcode/ui/utils/media"
    import "@nordcode/ui/bundle"
    import "@nordcode/ui/utils/layouts"
    import "@nordcode/ui/components/card"
    import "@nordcode/ui/components/forms"
    import "@nordcode/ui/components/inputs"
    import "@nordcode/ui/components/buttons"
    import "@nordcode/ui/components/gallery"
    import "$lib/styles/overrides.css"

    let { children } = $props();
</script>

<main>
    {@render children()}
</main>