<script lang="ts">
  import { formatDistanceToNow, format } from "date-fns";

  let { item }: { item: Element } = $props();
  const title = item.querySelector("title")?.innerHTML;

  const publishedAtStr = item.getElementsByTagName("pubDate")[0].innerHTML;
  const publishedAt = new Date(publishedAtStr);
  const dateToNow = formatDistanceToNow(publishedAt);
  const htmlDatetime = format(publishedAt, "yyyy-MM-dd");

  const creator = item
    .getElementsByTagName("dc:creator")[0]
    .innerHTML.replace("<![CDATA[", "")
    .replace("]]>", "");

  const urlStr = item.querySelector("link")?.innerHTML;
  const url = urlStr ? new URL(urlStr) : null;
  const articleUrl = url ? url.href : null;
  const baseUrl = url ? url.origin : null;
</script>

<article>
  <h1>{title}</h1>
  <time datetime={htmlDatetime}>{dateToNow}</time>
  <address>
    By <a href={baseUrl} rel="author noopener noreferrer">{creator}</a>
  </address>
  <!-- {@html item.getElementsByTagName("content:encoded")[0].innerHTML.replace("<![CDATA[", "").replace("]]>", "")} -->
  <a href={articleUrl} target="_blank" rel="noopener noreferrer"> Visit </a>
</article>
