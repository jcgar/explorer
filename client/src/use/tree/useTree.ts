import { useState } from "react"
import { IFile, IFileData, IFolder, INode } from "../../interface"

const pathURL = 'http://localhost:9000/'
const endpoints = {
  fetchFolder: 'list-folder',
  downloadFile: 'download-file'
}
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}
const EMPTY_NODE: INode = { files: undefined, folders: undefined }
const EMPTY_FOLDER: IFolder = { name: '', node: null }
const EMPTY_FILE: IFileData = { name: undefined, mime: undefined, data: undefined }
export enum TreeStates {
  INITIAL,
  LOADING,
  FOUND,
  NOT_FOUND
}

const useTree = () => {
  const [ state, setState ] = useState<TreeStates>(TreeStates.INITIAL)
  const [ root, setRoot ] = useState<IFolder>(EMPTY_FOLDER)
  const [ currentPath, setCurrentPath ] = useState<string[]>([])
  const [ fileData, setFileData ] = useState<IFileData>(EMPTY_FILE)

  const submitNewPath = async (values: any) => {
    setCurrentPath(parseCurrentPath(values.path))
    const response = await fetchFolder(values.path)
    if (response) {
      setRoot(parseRoot([], root, response))
      setState(TreeStates.FOUND)
    } else {
      setState(TreeStates.NOT_FOUND)
    }
  }
  const toggleFolder = async(str:string, name: string) => {
    const folder = `${str}/${name}`
    const paths = parseCurrentPath(folder)
    const node = findNode(paths, root)

    if (node && !node.node) {
      const response = await fetchFolder(folder)
      if (response) {
        setRoot(parseRoot(paths, root, response))
        setState(TreeStates.FOUND)
      } else {
        setState(TreeStates.NOT_FOUND)
      }
    }
  }
  const loadFile = async(str:string, name: string) => {
    const path = `${str}/${name}`

    const { mime, data } = await downloadFile(path) || {}

    if (data) {
      // const { file, mime } = response
      // setFileData({
      //   name,
      //   mime,
      //   data: file.data.map((char: number) => String.fromCharCode(char)).join('')
      // })
      setFileData({
        name,
        mime,
        data
      })
    }
  }
  const closeFile = () => {
    setFileData(EMPTY_FILE)
  }

  const { files, folders } = root.node || EMPTY_NODE

  return {
    state,
    path: currentPath.join('/'),
    fileData,
    files,
    folders,
    submitNewPath,
    loadFile,
    closeFile,
    toggleFolder
  }
}

export default useTree

/**
 * fetch folder data from server
 * @param path 
 * @returns {Object} folder data
 */
async function fetchFolder(path: string) {
  const url = `${pathURL}${endpoints.fetchFolder}`
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ path }),
    headers
  })
  if (response.status === 200) {
    return await response.json()
  } else {
    return
  }
}

/**
 * download file from server
 * @param path 
 * @returns {Object} file data
 */
 async function downloadFile(path: string) {
  const url = `${pathURL}${endpoints.downloadFile}`
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ path }),
    headers
  })
  if (response.status === 200) {
    const mime = response.headers.get('Content-type') || ''

    if (mime.startsWith('text')) {
      const data = await response.text()
      return {
        mime,
        data
      }
    } else {
      const data = await response.blob()
      const objectURL = URL.createObjectURL(data);
      return {
        mime,
        data: objectURL
      }
    }
  } else {
    return
  }
}
/**
 * retrieves current path hierarchy
 * @param path 
 * @returns {Array}
 */
function parseCurrentPath(path: string): string[] {
  return path.split('/').filter(Boolean)
}

/**
 * retrieves root IFolder structure
 * @param paths 
 * @param root 
 * @param response 
 * @returns 
 */
function parseRoot(paths: string[], root: IFolder, response: any): IFolder {
  const data = {
    files: response.files.map(getFileName),
    folders: response.folders
  }
  if (paths.length === 0) {
    root.node = data
  } else {
    const actual = findNode(paths, root)
    if (actual) {
      actual.node = data
    }
  }
  return { ...root}
}

/**
 * find node in folder structure
 * @param paths 
 * @param root 
 * @returns 
 */
function findNode(paths: string[], root: IFolder): IFolder | undefined {
  let result
  let node = root.node
  paths.forEach((path, i) => {
    const actual = ((node || EMPTY_NODE).folders || []).find(ob => ob.name === path)
    if (actual) {
      if (i + 1 === paths.length) {
        result = actual
        return
      }
      node = actual.node
    }
  })

  return result
}

/**
 * parse file name with extension
 * @param file 
 * @returns 
 */
function getFileName(file: IFile) {
  const { name, ext } = file
  const fullName = ext ? `${name}.${ext}` : name

  return { name: fullName }
}