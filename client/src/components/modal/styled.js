import styled, { css } from 'styled-components';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import { Icon, icons } from "../../icons/styled"

export const DialogStyled = styled(Dialog)`
  display: block;
  width: 100%;
  ${({ theme }) => css`
    ${theme.breakpoints.up('sm')} {
      width: 80%;
      margin: 0 auto;
    }
  `}
`

export const IconCloseStyled = styled(Icon).attrs(props => ({
  icon: icons.close
}))``
export const TitleStyled = styled(DialogTitle)`
  position: relative;
  & span {
    font-size: 1.25rem;
  }

  & button {
    position: absolute;
    right: 1rem;
    top: 1rem;
    width: 2rem;
    height: 2rem;
  }
`
export const WrapperStyled = styled(DialogContent)`
  ${({theme}) => css`
    background-color: ${theme.palette.background.paper};
    box-shadow: ${theme.shadows[5]};
    border-radius: 8px;
    padding: ${theme.spacing(3)}px;
    &:focus {
      outline: none;
    }
  `}
`




