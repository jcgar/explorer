import React, { FC, useEffect } from "react"

import { withTheme } from "../../setup/withTheme"
import { IChildren } from "../../interface"

const Layout: FC<IChildren> = ({ children }) => {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.body.scrollTop = 0
  })

  return (
    <>
      <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons"/>
      <link href="https://use.fontawesome.com/releases/v5.0.10/css/all.css" rel="stylesheet"/>
      {withTheme(
        <>
        { children }
        </>
      )}
    </>
  )
}
export default Layout