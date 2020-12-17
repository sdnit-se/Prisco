const colors = require('vuetify/es5/util/colors').default

module.exports = {
  server: {
    port: 3000, // default: 3000     
    host: '0.0.0.0', // default: localhost   
  },   // other configs 
  outputDir: "dist",
  telemetry: false,
  assetsDir: "static",
  mode: 'spa',
  /*
   ** Headers of the page
   */
  meta: {
    ogTitle: false,
    ogDescription: false,
  },
  head: {
    titleTemplate: 'Prisco | Zero Touch Provisioning system designed for Cisco.',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      // OPEN GRAPH
      {
        property: 'og:title',
        content: 'Prisco | Zero Touch Provisioning system designed for Cisco.'
      },
      {
        property: 'og:site_name',
        content: 'Prisco | Zero Touch Provisioning system designed for Cisco.'
      },
      {
        property: 'og:apple-mobile-web-app-title',
        name: 'apple-mobile-web-app-title',
        content: 'Prisco | Zero Touch Provisioning system designed for Cisco.'
      },
      {
        property: 'og:description',
        content: 'Prisco | Zero Touch Provisioning system designed for Cisco.'
      },
      {
        hid: `description`,
        name: 'description',
        content: 'Prisco | Zero Touch Provisioning system designed for Cisco.'
      },
      // TWITTER
      {
        property: 'twitter:title',
        content: 'Prisco | Zero Touch Provisioning system designed for Cisco.'
      },
      {
        property: 'twitter:description',
        name: 'twitter:description',
        content: 'Prisco | Zero Touch Provisioning system designed for Cisco.'
      },
      {
        property: 'apple-mobile-web-app-status-bar-style',
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'black-translucent'
      }
    ],
    script: [
      {
        charset: 'utf-8',
        src: 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['~/assets/styles.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    '@nuxtjs/robots',
    ["nuxt-compress", {
      gzip: {
        cache: true
      },
      brotli: {
        threshold: 10240
      }
    }]
  ],

  // ROBOTS.txt CONFIGURATION
  robots: {
    UserAgent: '*',
    Allow: '/',
    Disallow: ''
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: '#fff23e',
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          primary: '#181818',
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) { }
  }
}
