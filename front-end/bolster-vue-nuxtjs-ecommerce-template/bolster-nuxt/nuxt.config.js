import bodyParser from 'body-parser'
import session from 'express-session'

export default {
    mode: 'universal',
    /*
    ** Headers of the page
    */
    head: {
        htmlAttrs: {
            lang: 'en',
        },
        title: 'Bolster - eCommerce Nuxt.js/Vue.js Template',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
            {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css?family=Archivo:400,400i,500,500i,600,600i,700,700i&display=swap'
            }
        ],
    },
    /*
        ** Add server middleware
        ** Nuxt.js uses `connect` module as server
        ** So most of express middleware works with nuxt.js server middleware
    */
    serverMiddleware: [
        // body-parser middleware
        bodyParser.json(),
        // session middleware
        session({
            secret: 'fsdfvcbchgdfdf535455uhvbcvzdfgn',
            resave: false,
            saveUninitialized: false,
            cookie: { maxAge: 60000}
        }),
        // API middleware servd
        // We add /api/login & /api/Logout routes etc..
        '~/api'
    ],
    /*
    ** Customize the progress-bar colors
    */
        loading: { color: '#fff' },
    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
        { src: '~/plugins/vue-carousel', ssr: false },
        { src: '~/plugins/vue-backtotop', ssr: false },
        { src: '~/plugins/vue-toastification', ssr: false },
        { src: '~/plugins/vueperslides', ssr: false },
        { src: '~/plugins/TinyMCE.js', mode: 'client' }
        // { src: '~/plugins/firebase' },
    ],
    /*
    ** Nuxt.js dev-modules
    */
    buildModules: [
    ],
    /*
    ** Nuxt.js modules
    */
    modules: [
        // Doc: https://bootstrap-vue.js.org
        'bootstrap-vue/nuxt',
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
    ],
    /*
    /*
    ** Global CSS
    */
    css: [
        './assets/scss/styles/animate.min.css',
        './assets/scss/styles/bootstrap.min.css',
        './assets/scss/styles/fontawesome.min.css',
        './assets/scss/styles/style.scss',
        './assets/scss/styles/admin.scss',
        './assets/scss/styles/responsive.scss',
    ],
    /** Axios module configuration
     ** See https://axios.nuxtjs.org/options
    ** Add .
    */
    axios: {
        proxy: true
    },
    /*
    ** Globally configure <nuxt-link> default active class.
    */
    router: {
        linkActiveClass: 'active'
    },
    /*
    ** Build configuration
    */
    build: {
        /*
        ** You can extend webpack config here
        */
        extend (config, { isDev, isClient }) {
            // 웹팩 구성 요소를 여기에 추가
            if (isClient) {
                config.module.rules.push({
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules\/(?!(chart.js)\/).*/,
                    options: {
                        presets: ['@babel/preset-env']
                    }
                });
            }
        },

        transpile: ['vue-chartjs'],

        babel: {
            presets({ isServer }) {
                return [
                    [
                        require.resolve('@nuxt/babel-preset-app'),
                        {
                            buildTarget: isServer ? 'server' : 'client',
                            useBuiltIns: 'usage',
                            corejs: { version: 3 }
                        } // 옵션은 객체여야 함
                    ]
                ]
            },
            compact: false,
            plugins: [
                ['@babel/plugin-proposal-class-properties', { loose: true }],
                ['@babel/plugin-proposal-private-methods', { loose: true }],
                ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
            ]
        },
    }
}
