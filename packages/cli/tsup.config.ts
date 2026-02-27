import { defineConfig } from "tsup";

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
  // Keep JSX runtime as external (ink/react are runtime deps)
  external: ["react", "react/jsx-runtime", "ink", "@inkjs/ui"],
});
