import { QuartzComponentConstructor } from "../types"
import * as React from "react"

// Read vault word count from file at build time
let wordCount: string | null = null

try {
  const fs = require("fs")
  const raw = fs.readFileSync("vault_wordcount.txt", "utf-8")
  wordCount = parseInt(raw).toLocaleString()
} catch (err) {
  wordCount = null
}

const VaultStats: QuartzComponentConstructor = () => {
  if (!wordCount) {
    return (
      <div style={{ marginTop: "2rem", fontSize: "0.9rem" }}>
        <strong>📊 Vault Word Count:</strong>
        <br />
        Not available
      </div>
    )
  }

  return (
    <div style={{ marginTop: "2rem", fontSize: "0.9rem", lineHeight: "1.4" }}>
      <strong>📊 Vault Word Count:</strong>
      <br />
      {wordCount} words
    </div>
  )
}

export default VaultStats
