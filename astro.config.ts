import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  output: "static",
  adapter: cloudflare(),
  site: "https://herbarium-dna-protocol.pages.dev",
});
