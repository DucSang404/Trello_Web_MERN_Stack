import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { deepOrange, deepPurple, green, orange } from '@mui/material/colors'

// Create a theme instance.
const theme = extendTheme({
  trello: {
    appBarHeight: '58px',
    boardBarHeight: '58px'
  },

  colorSchemes: {
    light: {
      palette: {
        primary: green,
        secondary: deepOrange,
        background: {
          default: '#ffffff'
        }
      },
      spacing: (factor) => `${0.25 * factor}rem`
    },
    dark: {
      palette: {
        primary: deepPurple,
        secondary: orange,
        background:
        {
          default: '#121212'
        }
      },
      spacing: (factor) => `${0.25 * factor}rem`
    }
  }
})


export default theme