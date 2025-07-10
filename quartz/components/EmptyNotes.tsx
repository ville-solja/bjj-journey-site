import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { resolveRelative } from "../util/path"
import { i18n } from "../i18n"

const isEmptyNote = (text?: string | null): boolean => {
  if (!text) return true
  const stripped = text.trim().replace(/<!--.*?-->/gs, "") // strip comments
  return stripped === ""
}

const EmptyNotes: QuartzComponent = ({ allFiles, fileData, cfg }: QuartzComponentProps) => {
  const emptyPages = allFiles.filter(
    (page) => isEmptyNote(page.text)
  )

  if (emptyPages.length === 0) return null

  return (
    <section>
      <h3>🕳️ Empty Notes</h3>
      <ul>
        {emptyPages.map((page) => {
          const title = page.frontmatter?.title ?? page.slug?.split("/").pop() ?? "Untitled"
          return (
            <li>
              <a class="internal" href={resolveRelative(fileData.slug!, page.slug!)}>
                {title}
              </a>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default (() => EmptyNotes) satisfies QuartzComponentConstructor
