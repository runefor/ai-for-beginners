This is a Next.js presentation app for "AI for Beginners".

## Local Development

Install dependencies and start the local dev server:

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Production Checks

```bash
npm run lint
npm run build
```

## GitHub Pages

GitHub Pages builds are intentionally separate from local/server builds.

- Local / normal hosting:
  - `npm run build`
- GitHub Pages static export:
  - `npm run build:pages`

When the Pages build runs, the app uses a repository subpath base automatically in GitHub Actions, and static assets are rewritten to that base path.

The repository also includes a GitHub Actions workflow at `.github/workflows/deploy-pages.yml` for automatic deployment from `main`.

After pushing, enable GitHub Pages in the repository settings and choose **GitHub Actions** as the source.
