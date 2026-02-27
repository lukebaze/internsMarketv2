import { defineConfig } from "tsup";
import { readFileSync } from "fs";

const pkg = JSON.parse(readFileSync("package.json", "utf-8"));

export default defineConfig({
  entry: ["src/cli.tsx"],
  format: ["esm"],
  target: "node20",
  outDir: "dist",
  // Bundle @internsmarket/core into the output so it's not needed from npm
  noExternal: ["@internsmarket/core"],
  splitting: false,
  sourcemap: true,
  clean: true,
  // Inject version at build time
  define: { __CLI_VERSION__: JSON.stringify(pkg.version) },
  // Keep JSX runtime as external (ink/react are runtime deps)
  external: ["react", "react/jsx-runtime", "ink", "@inkjs/ui"],
});
