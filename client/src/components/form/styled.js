import styled from 'styled-components';

import {
  Button,
  colors,
  TextField,
} from '@material-ui/core';

export const SubmitButtonStyled = styled(Button).attrs(({
  variant: 'contained',
  color: 'primary',
  type: 'submit'
}))`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px !important;
`;


export const TextFieldStyled = styled(TextField).attrs(props => ({
  variant: 'outlined',
  size: 'small'
}))`
  margin: 1rem 0;
  width: 100%;

  & label {
    background: white;
    padding: 0.2rem;
  }
  & label.Mui-focused {
    color: #9c27b0;
  }

  .Mui-focused {
    & fieldset.MuiOutlinedInput-notchedOutline {
      border-color: #9c27b0;
    }
  }
`

export const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  padding: 1px;
  & input, & label {
    font-size: 0.8rem;
  }
`;

export const ErrorStyled = styled.div`
  color: ${colors.red};
  margin: 0 0 1rem;
  border-radius: 8px;
  font-style: italic;
  font-weight: bold;
  font-size: 0.7rem;
  flex-direction: column;
  height: 3rem;
  width: 100%;
`
export const ErrorSpaceStyled = styled.div`
  height: 3rem;
  display: block;
`