import React, { FC } from "react"

import { IChildren } from "../../interface"
import { TreeView } from '@material-ui/lab'
import { IconFolderStyled, IconFolderOpenStyled, IconFileStyled } from "./styled"

interface IProps extends IChildren {
  className?: string;
}
const CustomTreeView: FC<IProps> = ({ className = '', children }) => {
  return (
    <TreeView className={className}
      defaultCollapseIcon={<IconFolderOpenStyled />}
      defaultExpandIcon={<IconFolderStyled />}
      defaultEndIcon={<IconFileStyled />}
    >{ children }
    </TreeView>
  )
}
export default CustomTreeView