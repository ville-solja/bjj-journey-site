import { QuartzComponentConstructor } from "../types"

let wordCount: string | null = null

try {
  const raw = require("fs").readFileSync("vault_wordcount.txt", "utf-8")
  wordCount = parseInt(raw).toLocaleString()
} catch (err) {
  wordCount = null
}

export const VaultStats: QuartzComponentConstructor = () => {
  if (!wordCount) return null

  return (
    <div
      style={{
        marginTop: "2rem",
        fontSize: "0.9rem",
        lineHeight: "1.4",
      }}
    >
      <strong>Vault Word Count:</strong>
      <br />
      {wordCount} words
    </div>
  )
}
