import feathersClient from '../feathers'

export default ({ app, router, Vue }) => {
  // Vue.use(vueFeathers, feathersClient)
  Vue.prototype.$feathers = feathersClient
}
