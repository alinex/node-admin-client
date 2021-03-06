// Configuration for your app

const os = require('os')

function localeIP () {
  const inet = os.networkInterfaces()
  let ip = null
  Object.keys(inet).forEach(function (key) {
    let alias = 0
    inet[key].forEach(function (iface) {
      if (alias || iface.family !== 'IPv4' || iface.internal !== false) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return
      }
      ip = iface.address
      alias++
    })
  })
  return ip
}

module.exports = function (ctx) {
  return {
    plugins: [
      'i18n',
      'feathers',
      'vuelidate'
    ],
    css: [
      'app.styl'
    ],
    extras: [
      ctx.theme.mat ? 'roboto-font' : null,
      'material-icons',
      // 'ionicons',
      'mdi'
      // 'fontawesome'
    ],
    supportIE: false,
    build: {
      scopeHoisting: true,
      // vueRouterMode: 'history',
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      // useNotifier: false,
      publicPath: ctx.mode.spa ? '/web/' : '/',
      extendWebpack (cfg) {
        // cfg.module.rules[0].options.loaders['i18n'] = '@kazupon/vue-i18n-loader'
        // cfg.module.rules.push({
        //   enforce: 'pre',
        //   test: /\.(js|vue)$/,
        //   loader: 'eslint-loader',
        //   exclude: /(node_modules|quasar)/,
        //   options: { fix: true }
        // })
      },
      env: ctx.dev
        ? { // so on dev we'll have
          API: JSON.stringify(process.env.API || `http://${localeIP()}:3030`)
        }
        : { // and on build (production)
          API: JSON.stringify(process.env.API || 'https://demo.alinex.de:64850')
        }
    },
    devServer: {
      // https: true,
      port: ctx.mode.spa
        ? 8000
        : (ctx.mode.pwa ? 9000 : 9090),
      open: true // opens browser window automatically
    },
    // framework: 'all' --- includes everything; for dev only!
    framework: {
      i18n: 'de',
      components: [
        'AddressbarColor',
        'QBreadcrumbs',
        'QBreadcrumbsEl',
        'QBtn',
        'QBtnDropdown',
        'QChatMessage',
        'QCheckbox',
        'QCollapsible',
        'QField',
        'QIcon',
        'QInnerLoading',
        'QInput',
        'QItem',
        'QItemMain',
        'QItemSide',
        'QItemTile',
        'QLayout',
        'QLayoutHeader',
        'QLayoutDrawer',
        'QList',
        'QListHeader',
        'QModal',
        'QModalLayout',
        'QPageContainer',
        'QPage',
        'QRouteTab',
        'QSearch',
        'QSelect',
        'QSpinnerGears',
        'QTab',
        'QTabs',
        'QTabPane',
        'QTable',
        'QTableColumns',
        'QToolbar',
        'QToolbarTitle',
        'QTooltip'
      ],
      directives: [
        'Ripple',
        'CloseOverlay'
      ],
      plugins: [
        'AppVisibility',
        'Dialog',
        'Notify'
      ]
    },
    // animations: 'all' --- includes all animations
    animations: [
    ],
    pwa: {
      manifest: {
        name: 'Alinex Administration Panel',
        short_name: 'Admin Panel',
        description: 'Administration tasks made easy and fast',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'statics/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },
    cordova: {
      // id: 'org.cordova.quasar.app'
    },
    electron: {
      extendWebpack (cfg) {
        // do something with cfg
      },
      packager: {
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Window only
        // win32metadata: { ... }
      }
    },

    // leave this here for Quasar CLI
    starterKit: '1.0.0-beta.4'
  }
}
