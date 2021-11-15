import React, { FC } from "react"
import { CircularProgress } from "@material-ui/core"
import CustomTreeNode from "../components/tree/CustomTreeNode"
import { TreeStyled } from "../components/tree/styled"
import useI18n from "../use/i18n/useI18n"
import useTree, { TreeStates } from "../use/tree/useTree"
import PathFormCompose from "./PathFormCompose"
import FileCompose from "./FileCompose"

export const labelIds = {
  title: 'view.tree.title',
  notFound: 'view.tree.notFound',
  welcome: 'view.tree.welcome',
}

const TreeCompose: FC = () => {
  const { tm } = useI18n()
  const {
    welcome,
    notFound,
    title
  } = tm(labelIds)

  const {
    state,
    path,
    fileData,
    files,
    folders,
    loadFile,
    closeFile,
    submitNewPath,
    toggleFolder
  } = useTree()

  return (
    <>
      <header>
        <h1>{ title }</h1>
      </header>
      <nav>
        <PathFormCompose onSubmit={submitNewPath} />
      </nav>
      <main>
        { state === TreeStates.INITIAL && welcome }
        { state === TreeStates.LOADING && <CircularProgress /> }
        { state === TreeStates.NOT_FOUND && notFound }
        { state === TreeStates.FOUND &&
          <TreeStyled>
            <CustomTreeNode
              path={path}
              onToggle={toggleFolder}
              onClick={loadFile}
              files={files}
              folders={folders}
            />
          </TreeStyled>}
      </main>
      <aside>
        { fileData && fileData.name &&
          <FileCompose
            fileData={fileData}
            onClose={closeFile}/> }
      </aside>
    </>
  )
}

export default TreeCompose

