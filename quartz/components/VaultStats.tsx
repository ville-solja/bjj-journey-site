import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

console.log("✅ VaultStats component loaded")

export const VaultStats: QuartzComponentConstructor = () => {
  return (props: QuartzComponentProps) => {
    return (
      <div class="vault-stats" style="margin-top: 2rem; font-size: 0.9rem; line-height: 1.4;">
        ✅ VaultStats component is working!
      </div>
    )
  }
}

export default VaultStats
