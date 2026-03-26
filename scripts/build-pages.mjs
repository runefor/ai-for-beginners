import { spawn } from "node:child_process";

const repositoryName =
  process.env.PAGES_REPOSITORY_NAME ??
  process.env.GITHUB_REPOSITORY?.split("/")[1] ??
  "ai-for-beginners";

const child = spawn("npm run build", {
  stdio: "inherit",
  shell: true,
  env: {
    ...process.env,
    GITHUB_PAGES: "true",
    PAGES_BASE_PATH: `/${repositoryName}`,
  },
});

child.on("exit", (code) => {
  process.exit(code ?? 1);
});
