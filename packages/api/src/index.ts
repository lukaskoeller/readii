import { XMLParser } from "fast-xml-parser";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { validator } from "hono/validator";
import { z } from "zod/mini";
import { getFeedData } from "./utils";
import { ZodError } from "zod";

const QuerySchema = z.object({
  url: z.string().check(
    z.url({
      protocol: /^https?$/,
    })
  ),
});

const app = new Hono();

app.get(
  "/proxy",
  validator("query", (value, c) => {
    const result = QuerySchema.safeParse(value);
    if (!result.success) {
      throw new HTTPException(400, { message: z.prettifyError(result.error) });
    }
    return result.data;
  }),
  async (c) => {
    const { url } = c.req.query();
    let feedObj;
    try {
      const response = await fetch(url);
      const text = await response.text();
      const parser = new XMLParser({
        ignoreAttributes: false,
        trimValues: true,
        alwaysCreateTextNode: true,
      });
      feedObj = parser.parse(text);
    } catch (error) {
      throw new HTTPException(500, { message: `Failed to fetch ${url}` });
    }

    try {
      const data = getFeedData(feedObj);
      return c.json(data);
    } catch (error) {
      console.log(error.message);
      throw new HTTPException(500, { message: "Failed to parse feed data" });
    }
  }
);

export default app;
