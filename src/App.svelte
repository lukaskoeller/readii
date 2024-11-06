<script lang="ts">
  import rssFile from "./assets/cssreflex.xml?raw";
  import ArticleCard from "./components/ArticleCard.svelte";

  const data = new DOMParser().parseFromString(rssFile, "text/xml");
  const items = data.querySelectorAll("item");
  console.log(items);
  

</script>

<main>
  <h1>readii</h1>
  <p>A simple, open-source, and privacy-focused RSS reader.</p>
  {#each [...items] as data}
    <ArticleCard item={data} />
  {/each}
</main>

<style>
</style>
