// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import { createVuetify } from 'vuetify'

const myCustomLightTheme = {
  dark: false,
  colors: {
    background: '#F0F8FF',
    surface: '#FFFFFF',
    primary: '#5F9EA0',
    'primary-darken-1': '#3700B3',
    secondary: '#7FFFD4',
    'secondary-darken-1': '#018786',
    error: '#B00020',
  },
}

export default createVuetify({
  theme: {
    defaultTheme: 'myCustomLightTheme',
    themes: {
      myCustomLightTheme,
    },
  },
})