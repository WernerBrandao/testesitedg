import esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["drizzle/schema.ts"],
  outfile: "drizzle/schema.js",
  platform: "node",
  format: "esm",
});