import { cp, mkdir, rm } from "node:fs/promises";
import { build } from "esbuild";
import { fileURLToPath } from "node:url";

const outDir = new URL("../dist/", import.meta.url);
await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

for (const item of ["index.html", "src"]) {
  await cp(new URL(`../${item}`, import.meta.url), new URL(`./${item}`, outDir), {
    recursive: true,
  });
}

for (const item of ["tokens.css", "base.css", "components.css", "utilities.css", "favicon.ico", "fonts", "logos"]) {
  await cp(new URL(`../shared-ui/${item}`, import.meta.url), new URL(`./shared-ui/${item}`, outDir), {
    recursive: true,
  });
}

await mkdir(new URL("./src/vendor/", outDir), { recursive: true });
await build({
  bundle: true,
  entryPoints: [fileURLToPath(new URL("../src/pdf-vendor.js", import.meta.url))],
  format: "esm",
  minify: true,
  outfile: fileURLToPath(new URL("./src/vendor/pdf-vendor.js", outDir)),
  platform: "browser",
});

console.log("Static build written to dist/");
