export default {
  mode: 'spa',
  env: {
    FIRESTORE_APIKEY: process.env.FIRESTORE_APIKEY,
    FIRESTORE_AUTHDOMAIN: process.env.FIRESTORE_AUTHDOMAIN,
    FIRESTORE_DATABASEURL: process.env.FIRESTORE_DATABASEURL,
    FIRESTORE_PROJECTID: process.env.FIRESTORE_PROJECTID,
    FIRESTORE_STORAGEBUCKET: process.env.FIRESTORE_STORAGEBUCKET,
    FIRESTORE_MESSAGINGSENDERID: process.env.FIRESTORE_MESSAGINGSENDERID,
    FIRESTORE_APPID: process.env.FIRESTORE_APPID,
    FIRESTORE_MEASUREMENTID: process.env.FIRESTORE_MEASUREMENTID,
    RECAPTCHA_SITEKEY: process.env.RECAPTCHA_SITEKEY,
    RECAPTCHA_SECRET: process.env.RECAPTCHA_SECRET
  },
  serverMiddleware: ['~/api/index.js'],
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.HTML_TITLE || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/pokeball.png' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/firebase.js'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/recaptcha'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true
  },

  proxy: {
    '/api/': {
      target: 'https://pokego.codes/api',
      pathRewrite: { '^/api/': '' },
      changeOrigin: true
    }
  },
  /* reCAPTCHA options */
  recaptcha: {
    hideBadge: false, // Hide badge element (v3 & v2 via size=invisible)
    siteKey: '6LdR7c8UAAAAAHeGUi7a2QY1dfOhtBnjI4-Y4wlN', // Site key for requests
    version: 3 // Version
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */

    babel: {
      presets({ isServer }) {
        return [
          [
            require.resolve('@nuxt/babel-preset-app'),
            // require.resolve('@nuxt/babel-preset-app-edge'), // For nuxt-edge users
            {
              buildTarget: isServer ? 'server' : 'client',
              corejs: { version: 3 }
            }
          ]
        ]
      }
    },
    extend(config, ctx) {}
  }
}
