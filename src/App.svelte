<script lang="ts">
  import rssFile from "./assets/cssreflex.xml?raw";
  import ArticleCard from "./components/ArticleCard.svelte";

  const data = new DOMParser().parseFromString(rssFile, "text/xml");
  const items = data.querySelectorAll("item");
  console.log(items);

  class OPMLParser {
    url?: string;
    rawFile?: string;

    constructor(input: string) {
      try {
        const url = new URL(input);
        this.url = url.toString();
      } catch {
        this.rawFile = input;
      }
    }

    async parse() {
      if (!this.rawFile) {
        if (this.url) {
          const response = await fetch(this.url, {
            mode: "cors",
            headers: {
              "Content-Type": "text/xml",
            },
          });
          const text = await response.text();
          this.rawFile = text;
          console.log("response", {
            response,
            text,
          });
        } else {
          throw new Error(
            "Expected either a `url` or a `rawFile` to be defined. Make sure to pass it when creating an `OPMLParser` instance."
          );
        }
      }
      
      const parser = new DOMParser();
      const doc = parser.parseFromString(this.rawFile, "text/xml");
      const outlines = doc.querySelectorAll("outline");
      const feeds = Array.from(outlines).map((outline) => {
        return {
          title: outline.getAttribute("title"),
          xmlUrl: outline.getAttribute("xmlUrl"),
          htmlUrl: outline.getAttribute("htmlUrl"),
        };
      });
      return feeds;
    }
  }

  const opml = new OPMLParser("https://nerdy.dev/subscriptions.opml");
  console.log(opml.parse());
</script>

<header>
  <h1>readii</h1>
  <div>
    <button>Import</button>
  </div>
</header>
<main>
  {#each [...items] as data}
    <ArticleCard item={data} />
  {/each}
</main>

<style>
</style>
