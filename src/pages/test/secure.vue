<template>
  <q-page class="flex flex-center">
    <h4>Secure Page</h4>
    <p>Counter: {{ count }}</p>
    <q-btn label="Increment" @click="increment()" />
  </q-page>
</template>

<style>
</style>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'PageIndex',
  computed: {
    ...mapState('test', ['count'])
  },
  methods: {
    ...mapActions('test', ['increment']),
    ...mapActions('auth', ['authenticate'])
  },
  created () {
    console.log('-----------------------', this.$feathers)
    //    this.increment()
    //    this.$feathers.authenticate().then(() => {
    //      console.log('show application page')
    //    }).catch(() => {
    //      console.log('show login page')
    //    })
    //    console.log('-----------------------')
    // this.$feathers.
    this.authenticate({
      strategy: 'local',
      email: 'info@alinex.de',
      password: 'secret'
    }).then(() => {
      console.log('Logged in')
    }).catch((e) => {
      console.log('failed', e)
    })
  }
}
</script>
