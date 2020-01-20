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
    FIRESTORE_MEASUREMENTID: process.env.FIRESTORE_MEASUREMENTID
  },
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
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
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
