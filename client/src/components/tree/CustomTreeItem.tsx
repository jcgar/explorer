import React, { FC } from "react"

import { IChildrenOpt } from "../../interface"
import { TreeItem } from '@material-ui/lab'

interface IProps extends IChildrenOpt {
  className?: string;
  onClick?: () => void;
  label: string;
  size?: number;
  nodeId: string;
}
const CustomTreeItem: FC<IProps> = ({
  className = '',
  children = '',
  label,
  size = 0,
  ...props
}) => {
  return (
    <TreeItem
      {...props}
      label={
        <div>
          <span>{label}</span>
          { !!size && <span>{size}</span> }
        </div>
      }>{ children }</TreeItem>
  )
}
export default CustomTreeItem