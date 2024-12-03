<script lang="ts">
  import { feedHandler, onboardingHandler } from "../core/hooks.svelte";
  import AddFeedForm from "./AddFeedForm.svelte";
  import Chip from "./Chip.svelte";
  import Details from "./Details.svelte";

  const noSubscriptions = $derived(feedHandler.authors.length);
  const isEmpty = $derived(
    !feedHandler.isLoading && feedHandler.feed.length === 0
  );

  $effect(() => {
    if (isEmpty) {
      onboardingHandler.isOnboarding = true;
    }
  });

  const SUGGESTED_FEEDS = [
    {
      category: "Web Development",
      id: "web-development",
      items: [
        {
          title: "Adam Argyle",
          src: "https://res.cloudinary.com/dnpmdb8r8/image/upload/argyleink/rss-icon.png",
          onclick: () => feedHandler.add("https://nerdy.dev/rss.xml"),
        },
        {
          title: "Anthony Fu",
          src: "https://antfu.me/avatar.png",
          onclick: () => feedHandler.add("https://antfu.me/feed.xml"),
        },
        {
          title: "Codrops",
          src: null,
          onclick: () => feedHandler.add("https://feeds.feedburner.com/Codrops"),
        },
        {
          title: "Lea Verou",
          src: null,
          onclick: () =>
            feedHandler.add("https://feeds.feedburner.com/leaverou"),
        },
        {
          title: "Bram.us",
          src: null,
          onclick: () => feedHandler.add("https://www.bram.us/feed/"),
        },
        {
          title: "Ahmad Shadeed",
          src: null,
          onclick: () => feedHandler.add("https://ishadeed.com/feed.xml"),
        },
        {
          title: "Figma Blog",
          src: null,
          onclick: () =>
            feedHandler.add("https://www.figma.com/blog/feed/atom.xml"),
        },
        {
          title: "Josh Comeau's blog",
          src: null,
          onclick: () => feedHandler.add("https://www.joshwcomeau.com/rss.xml"),
        },
        {
          title: "web.dev",
          src: null,
          onclick: () =>
            feedHandler.add("https://web.dev/static/blog/feed.xml"),
        },
      ],
    },
    {
      category: "Sports",
      id: "sports",
      items: [
        {
          title: "kicker",
          src: "https://mediadb.kicker.de/content/img/kicker-logo_171x60.png",
          onclick: () =>
            feedHandler.add("https://newsfeed.kicker.de/news/aktuell"),
        },
        {
          title: "Yahoo Sports",
          src: "http://l.yimg.com/rz/d/yahoo_sports_en-US_s_f_p_182x21_sports.gif",
          onclick: () =>
            feedHandler.add("https://sports.yahoo.com/general/news/rss/"),
        },
        {
          title: "ESPN",
          src: "https://a.espncdn.com/i/espn/teamlogos/lrg/trans/espn_dotcom_black.gif",
          onclick: () => feedHandler.add("https://www.espn.com/espn/rss/news"),
        },
      ],
    },
    {
      category: "Economics",
      id: "economics",
      items: [
        {
          title: "Business Insider",
          src: null,
          onclick: () =>
            feedHandler.add(
              "https://www.businessinsider.de/feed/businessinsider-alle-artikel"
            ),
        },
        {
          title: "Handelsblatt",
          src: null,
          onclick: () =>
            feedHandler.add(
              "https://www.handelsblatt.com/contentexport/feed/schlagzeilen"
            ),
        },
      ],
    },
    {
      category: "Games",
      id: "games",
      items: [
        {
          title: "IGN Articles",
          src: "https://s3.amazonaws.com/o.assets.images.ign.com/kraken/IGN-Logo-RSS.png",
          onclick: () =>
            feedHandler.add("https://www.ign.com/rss/articles/feed?tags=games"),
        },
        {
          title: "Kotaku",
          src: null,
          onclick: () => feedHandler.add("https://kotaku.com/rss"),
        },
        {
          title: "Gamestar",
          src: "https://www.gamestar.de/images/gslogo100x60.jpg",
          onclick: () =>
            feedHandler.add("https://www.gamestar.de/news/rss/news.rss"),
        },
      ],
    },
    {
      category: "Fashion & Beauty",
      id: "fashionbeauty",
      items: [
        {
          title: "Allure",
          src: null,
          onclick: () => feedHandler.add("https://www.allure.com/feed/rss"),
        },
      ],
    },
  ] as const;
</script>

<section class="container">
  <header class="header">
    <h1 class="h1">A simply, AI enhanced RSS Reader</h1>
    <h2 class="h2">
      With readii you can simply follow your favorite blogs or news sites by
      adding their RSS feed to your personal feed.
    </h2>
  </header>
  <div class="suggestions">
    <h3 class="h3">Choose from the list</h3>
    {#each SUGGESTED_FEEDS as { category, id, items }}
      <Details name="suggestions" title={`${category} (${items.length})`} {id}>
        {#snippet content()}
          <div class="nc-cluster">
            {#each items as { title, src, onclick }}
              <Chip {title} {src} {onclick} />
            {/each}
          </div>
        {/snippet}
      </Details>
    {/each}
  </div>
  <div class="import">
    <h3 class="h3">Import your own</h3>
    <div class="stack">
      <div class="card">
        <AddFeedForm />
      </div>
      <div class="card stack">
        {#if noSubscriptions === 0}
          <p>
            Add a feed to your list by choosing from the list or add the URL in
            the input.
          </p>
        {:else}
          <p>
            You selected {noSubscriptions} feed{noSubscriptions > 1 ? "s" : ""} to
            start with.
          </p>
        {/if}
        <button
          type="button"
          onclick={() => {
            onboardingHandler.isOnboarding = false;
          }}>Start reading</button
        >
      </div>
    </div>
  </div>
</section>

<style>
  @custom-media --sm-n-above (width >= 480px);
  @custom-media --md-n-above (width >= 768px);

  .container {
    margin-block-start: var(--spacing-far);
    inline-size: min(100%, 120ch);
    margin-inline: auto;
    display: grid;
    gap: var(--spacing-far);
    grid-template:
      "header" auto
      "suggestions" auto
      "import" auto
      / 1fr;

    @media (--md-n-above) {
      grid-template:
        "header header" auto
        "suggestions import" auto
        / 1fr 1fr;
      gap: var(--spacing-far);
      row-gap: var(--spacing-farthest);
    }
  }

  .header {
    grid-area: header;
    display: grid;
    gap: var(--spacing-base);
    inline-size: min(100%, 80ch);
    text-align: center;
    margin-inline: auto;
  }

  .import {
    grid-area: import;
  }

  .suggestions {
    grid-area: suggestions;
  }

  .h1 {
    color: var(--color-brand-primary-emphasis);
  }

  .h2 {
    color: var(--color-brand-secondary-base);
  }

  .h3 {
    margin-block-end: var(--spacing-near);
  }
</style>
