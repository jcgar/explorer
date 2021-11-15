import styled, { css } from 'styled-components'
import CustomTreeView from "./CustomTreeView"
import { theme } from '../../styles/base'
import { Icon, icons } from "../../icons/styled"
import { CircularProgress } from '@material-ui/core'

export const TreeStyled = styled(CustomTreeView)`
  text-align: left;
  margin: 1rem;
`
export const IconFileStyled = styled(Icon).attrs({
  icon: icons.file
})`
  color: ${theme.gray.p500};
`
export const IconFolderStyled = styled(Icon).attrs(props => ({
  icon: icons.folder
}))``
export const IconFolderOpenStyled = styled(Icon).attrs(props => ({
  icon: icons.folderOpen
}))``

export const LoaderStyled = styled(CircularProgress).attrs(props => ({
  size: '1rem'
}))``
