import ga from './analytics.js'
// import store from '../store'

export default ({ router, app }) => {
  router.afterEach((to, from) => {
    console.log('-----------------------------------')
    // console.log(store.state.auth)
    ga.logPage(to.path, to.name, null) // eslint-disable-line no-undef
  })
}
