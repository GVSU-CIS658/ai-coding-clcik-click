import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: 'marketLight',
    themes: {
      marketLight: {
        dark: false,
        colors: {
          primary: '#2563eb',
          secondary: '#1e3a8a',
          accent: '#3b82f6',
          background: '#f5f8ff',
          surface: '#ffffff',
          success: '#15803d',
          warning: '#b45309',
          error: '#b91c1c',
        },
      },
    },
  },
})

export default vuetify
