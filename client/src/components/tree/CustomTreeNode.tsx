import React, { FC } from "react"

import { INode } from "../../interface"
import CustomTreeItem from "./CustomTreeItem"
import { LoaderStyled } from "./styled"

interface IProps extends INode {
  path: string;
  onClick?: (path: string, name: string) => void;
  onToggle?: (path: string, name: string) => void;
}
const CustomTreeNode: FC<IProps> = ({
  path,
  onToggle,
  onClick,
  folders = [],
  files = []
}) => {
  return (
    <>
      {folders.map(({ name, node }, i) => {
        const nodeId = `${path}/${name}`
        return (
          <CustomTreeItem key={i}
            label={`${name}/`}
            nodeId={nodeId}
            onClick={() => onToggle && onToggle(path, name)}>
            { node
              ? <CustomTreeNode
                  path={nodeId}
                  onClick={onClick}
                  onToggle={onToggle}
                  folders={node.folders}
                  files={node.files} />
              : <LoaderStyled />}
          </CustomTreeItem>)}
      )}
      {files.map(({ name }, i) =>
        <CustomTreeItem key={i}
          label={name}
          onClick={() => onClick && onClick(path, name)}
          nodeId={`${path}/${name}`} />
      )}
    </>
  )
}
export default CustomTreeNode