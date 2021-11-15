import React, { FC, useEffect, useState } from "react"
import { WrapperFileStyled } from "../components/file/styled"
import { SubmitButtonStyled } from "../components/form/styled"
import Modal from "../components/modal/Modal"
import { IFileData } from "../interface"
import useI18n from "../use/i18n/useI18n"

export const labelIds = {
  download: 'view.tree.download',
}

export interface IProps {
  fileData: IFileData;
  onClose: () => void;
}

const FileCompose: FC<IProps> = ({ 
  fileData,
  onClose
 }) => {
  const { tm } = useI18n()
  const {
    download
  } = tm(labelIds)
  const [ open, setOpen ] = useState<boolean>(false)
  const { name = '', mime, data } = fileData
  
  const isText = mime?.startsWith('text')
  const isImage = mime?.startsWith('image')
  useEffect(() => {
    setOpen(!!name)
  }, [name])

  return (
    <Modal
      open={open}
      title={name}
      handleClose={onClose}>
      <WrapperFileStyled>
        <p>{ mime }</p>
        { isText &&  <textarea defaultValue={ data }/>}
        { isImage && <img src={data} alt={name} />}
        { !isText && !isImage && 
          <a href={data} download={name}><SubmitButtonStyled>
            { download }
          </SubmitButtonStyled></a>}
      </WrapperFileStyled>
    </Modal>
  )
}

export default FileCompose