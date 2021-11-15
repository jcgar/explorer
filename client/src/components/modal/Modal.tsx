import React, { FC } from 'react';

import { Fade, IconButton } from '@material-ui/core';
import { DialogStyled, IconCloseStyled, TitleStyled, WrapperStyled } from './styled';
import { IChildren } from '../../interface';

interface IProps extends IChildren {
  handleClose?: () => void;
  open?: boolean;
  title: string;
}

const Modal: FC<IProps> = ({
  children,
  handleClose,
  title,
  open = false,
}) => (
  <DialogStyled
    fullWidth
    open={open}
    onClose={handleClose}
  >
    <Fade in={open}>
      <>
        <TitleStyled>
          <span>{ title }</span>
          <IconButton onClick={handleClose}>
            <IconCloseStyled />
          </IconButton>
        </TitleStyled>
        <WrapperStyled>{children}</WrapperStyled>
      </>
    </Fade>
  </DialogStyled>
);

export default Modal
