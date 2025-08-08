import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import fs from "fs"

const VaultStats: QuartzComponentConstructor = () => {
  let wordCount = "unknown"
  try {
    const raw = fs.readFileSync("vault_wordcount.txt", "utf-8")
    wordCount = parseInt(raw).toLocaleString()
  } catch {
    wordCount = "unavailable"
  }

  return () => (
    <div style={{ marginTop: "2rem", fontSize: "0.9rem", lineHeight: "1.4" }}>
      <strong>Vault Word Count</strong>
      <br />
      {wordCount} words
    </div>
  )
}

export default VaultStats
