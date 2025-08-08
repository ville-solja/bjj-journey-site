import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

const VaultStats: QuartzComponentConstructor = () => {
  return (_props: QuartzComponentProps) => {
    return (
      <div style="margin-top: 2rem; font-size: 0.9rem; line-height: 1.4;">
        ✅ VaultStats component loaded correctly!
      </div>
    )
  }
}

export default VaultStats
