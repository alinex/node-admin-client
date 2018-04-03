import Vue from 'vue'
import Vuex from 'vuex'
import feathersVuex from 'feathers-vuex'
import feathersClient from '../feathers'

// import auth from './auth'
import layout from './layout'

const { service, auth } = feathersVuex(feathersClient, { idField: '_id' })

Vue.use(Vuex)

const store = new Vuex.Store({
  plugins: [
    service('users'),
    auth({ userService: 'users' })
  ],
  modules: {
    layout
  }
})

export default store
