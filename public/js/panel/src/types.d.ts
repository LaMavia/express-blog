import * as React from "react"
declare namespace Panel {
  interface navLink {
    Name: string
    Href: string
    Component: any
    Exact?: boolean
  }
  
  interface navSegment {
    Name: string,
    Links: navLink[]
  }
}

export default Panel