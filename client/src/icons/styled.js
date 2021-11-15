import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  faChevronDown, faChevronRight, faTimes, faFileAlt, faFolder, faFolderOpen,
} from "@fortawesome/free-solid-svg-icons";

export const icons = {
  close: faTimes,
  folder: faFolder,
  folderOpen: faFolderOpen,
  file: faFileAlt,
  down: faChevronDown,
  right: faChevronRight
} 

export const Icon = styled(FontAwesomeIcon)`
  overflow: unset;
`