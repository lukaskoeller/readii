import fs from "fs";
import path from "path";

// 1. Import utilities from `astro:content`
import { defineCollection } from "astro:content";

// 2. Import loader(s)
import { file } from "astro/loaders";

// 3. Import Zod
import { z } from "astro/zod";
import feedSuggestionsJson from "@readii/data/suggestions/json?url";

const dataURL = feedSuggestionsJson.replace("/@fs", "");
const baseUrl = new URL(".", import.meta.url);
const iconsDir = `${baseUrl.pathname}content/icons`;

// 4. Define your collection(s)
const feedSuggestions = defineCollection({
  loader: file(dataURL),
  schema: ({ image }) =>
    z.object({
      id: z.string(),
      title: z.string(),
      url: z.string(),
      feedUrl: z.string(),
      description: z.string(),
      iconUrl: image().nullable(),
      ogImageUrl: image().nullable(),
      categories: z.array(z.string()),
    }),
});

// 5. Export a single `collections` object to register your collection(s)
export const collections = { feedSuggestions };

async function parseSuggestions(text: string) {
  emptyDir(iconsDir);
  const data = JSON.parse(text);

  const parsedDataPromises = data.map(async (item: any) => {
    if (!item.iconUrl) {
      return {
        ...item,
        iconUrl: null,
      };
    }
    const fileExtension = item.iconUrl.split(".").pop().split("?")[0];
    try {
      const title = item.title;
      if (!title) throw new Error("Title is missing");
      const iconUrl = await downloadImage(
        item.iconUrl,
        iconsDir,
        `${encodeURI(toKebabCase(title))}-icon.${fileExtension}`
      );

      return {
        ...item,
        iconUrl,
      };
    } catch (error) {
      console.error(`Failed to download icon for ${item.title}:`, error);

      return {
        ...item,
        iconUrl: null,
      };
    }
  });
  const parsedData = await Promise.all(parsedDataPromises);
  console.log(parsedData);

  return parsedData;
}

async function downloadImage(
  url: string,
  destFolder: string,
  filename: string
) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText} (${url})`);
  if (!fs.existsSync(destFolder)) fs.mkdirSync(destFolder, { recursive: true });
  const filePath = path.join(destFolder, filename);
  const arrayBuffer = await res.arrayBuffer();
  fs.writeFileSync(filePath, Buffer.from(arrayBuffer));
  return filePath;
}

function toKebabCase(str: string): string {
  return (
    str
      ?.match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      ?.map((x) => x.toLowerCase())
      ?.join("-") ?? String(str)
  );
}

function emptyDir(dirPath: string) {
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
  }
  fs.mkdirSync(dirPath, { recursive: true });
}
