import { rmSync } from "node:fs";

rmSync(new URL("../.astro/data-store.json", import.meta.url), { force: true });
