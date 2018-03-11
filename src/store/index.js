import Vue from 'vue'
import Vuex from 'vuex'
import feathersVuex from 'feathers-vuex'
import feathersClient from '../feathers'

// import auth from './auth'
import test from './test'

const { service, auth } = feathersVuex(feathersClient, { idField: '_id' })

Vue.use(Vuex)

const store = new Vuex.Store({
  plugins: [
    service('todos'),
    auth()
  ],
  modules: {
    test
  }
  //  state: {
  //    count: 2
  //  },
  //  mutations: {
  //    increment (state) {
  //      // mutate state
  //      state.count++
  //    }
  //  },
  //  actions: {
  //    increment (context) {
  //      context.commit('increment')
  //    }
  //  }
})

export default store
