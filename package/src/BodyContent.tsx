import type { ReactNode } from "react"

const BodyContent = ({ children }: { children?: ReactNode }) => {

  return (
    <div className="vc-content" data-vc="content">
      {children}
    </div>
  )
}

export default BodyContent