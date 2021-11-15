import React from 'react'
import { ReactElement } from 'react'

import {
  ThemeProvider as MuiThemeProvider,
  StylesProvider,
} from '@material-ui/styles'
import { ThemeProvider } from 'styled-components'
import { createMuiTheme } from '@material-ui/core'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'



export function withTheme(element: ReactElement) {
  const theme = createMuiTheme({
    breakpoints: {
      values: {
        xs: 400,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
    mixins: {
      toolbar: {
        minHeight: 45,
      }
    },
    typography: {
      fontFamily: 'Roboto',
      h1: {
        fontSize: '3rem',
        fontWeight: 700
      },
      h2: {
        fontSize: '2.5rem',
        fontWeight: 700
      },
      h3: {
        fontSize: '2rem',
      },
      h4: {
        fontSize: '1.5rem',
      },
      h5: {
        fontSize: '1.2rem',
      },
      h6: {
        fontSize: '1rem',
      },
      subtitle1: {
        fontSize: '1.1rem',
      }
    },
  })
  library.add(fas)

  return (
    <MuiThemeProvider theme={theme}>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          {element}
        </ThemeProvider>
      </StylesProvider>
    </MuiThemeProvider>
  )
}