import fs from "fs"
import path from "path"

import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// ───────────────────────────────────────────────────────────
// Load vault word count from vault_wordcount.txt at build time
let wordCount: string | null = null
try {
  const raw = fs.readFileSync(path.resolve("vault_wordcount.txt"), "utf-8")
  wordCount = parseInt(raw).toLocaleString() // format with commas
} catch (err) {
  wordCount = null
}

// Shared components across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jackyzha0/quartz",
      "Discord Community": "https://discord.gg/cRFFHYye7t",
    },
  }),
}

// Layout for individual content pages (e.g., notes)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        { Component: Component.Search(), grow: true },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
    // Optional: Component.RecentNotes({ limit: 10 }),
    wordCount
      ? Component.Static(`<div style="margin-top: 2rem; font-size: 0.9rem;"><strong>Vault Word Count:</strong><br>${wordCount} words</div>`)
      : Component.Spacer()
  ],
}

// Layout for list pages (e.g., tags, folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        { Component: Component.Search(), grow: true },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [
    {
      Component: () =>
        wordCount
          ? {
              html: `<div style="margin-top: 2rem; font-size: 0.9rem; line-height: 1.4;"><strong>Vault Word Count</strong><br>${wordCount} words</div>`,
            }
          : { html: "" },
    },
  ],
}
