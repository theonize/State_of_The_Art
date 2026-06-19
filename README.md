# State of the Art

**The latest and greatest issues facing the Church in the world today.**

An interactive book — *part declaration, part Bible-study guide, part
information portal* — on the issues pressing on the people of God: human dignity
and human rights, the protection of children, nationalism and the Kingdom of
God, advocacy and public witness, heresy and discernment, power and
accountability, creation care, technology and AI, race and migration, wealth and
poverty, and sexuality and the body.

It is written from a **broadly ecumenical Christian** perspective, declaring
plainly where Scripture is plain and presenting multiple faithful views where
Christians sincerely differ.

## Read it

The book is published to GitHub Pages:

> **https://theonize.github.io/State_of_The_Art/**

## What's inside

- **The Declaration** — a preamble and articles confessing what the Church can
  hold together.
- **Foundations** — the Kingdom of God, and the image of God in every person.
- **The Issues** — eleven chapters on the questions of our age, each with
  Scripture, multiple views, reflection prompts, and resources.
- **Appendix** — a glossary and curated resources.

Interactive features (no account needed; everything is stored privately in your
browser): journaling prompts, self-check questions, expandable "multiple views"
panels, Bible Gateway Scripture links, a glossary tooltip, and per-chapter
reading-progress tracking.

## Tech stack

- **[VitePress](https://vitepress.dev/)** — a Markdown-driven static-site
  generator. Chapters are authored as Markdown in [`docs/`](docs/); custom Vue
  components in [`docs/.vitepress/theme/components/`](docs/.vitepress/theme/components/)
  power the interactive study tools.

## Develop locally

```bash
npm install        # install dependencies
npm run docs:dev   # start the dev server (hot reload)
npm run docs:build # build the static site to docs/.vitepress/dist
npm run docs:preview
```

## Deployment

Deployment is automated with GitHub Actions
([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)). On every push
to `main` (and to the working branch), the workflow builds the site and
publishes it to GitHub Pages.

**Required one-time setup** (repo admin): enable Pages at **Settings → Pages →
Build and deployment → Source → "GitHub Actions"**. This organization does not
allow the workflow's token to enable Pages automatically, so it must be turned
on once in the UI. After that, every push to the branch builds and deploys with
no further action — re-run the latest workflow (Actions tab → latest run →
"Re-run jobs") to publish immediately.

## Authoring new content

1. Add a Markdown file under `docs/` (e.g. `docs/issues/my-topic.md`).
2. Add it to the sidebar in
   [`docs/.vitepress/config.mts`](docs/.vitepress/config.mts) (and, if it's a
   chapter, to the chapter list in `ProgressDashboard.vue`).
3. Use the study components in your Markdown: `<Declaration>`, `<Scripture>`,
   `<Reflect>`, `<SelfCheck>`, `<Views>` / `<View>`, `<KeyTerm>`, and
   `<ChapterComplete>`. See [`docs/guide/how-to-use.md`](docs/guide/how-to-use.md)
   for live examples.

## License

Released under the [Apache-2.0 License](LICENSE).
