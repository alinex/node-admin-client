<template>
  <q-page class="layout-padding">
    <h4 row>Secure Page</h4>
    <p row>User ID: {{ user ? user._id : 'not logged in' }}</p>
    <p row>Counter: {{ count }}</p>
    <q-btn label="Increment" @click="increment()" />
    <q-btn label="Test" @click="test()" />
  </q-page>
</template>

<style>
</style>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'PageIndex',
  computed: {
    ...mapState('auth', ['user']),
    ...mapState('test', ['count'])
  },
  methods: {
    ...mapActions('test', ['increment']),
    ...mapActions('auth', ['authenticate']),
    test () {
      console.log(this.$store.state.auth.user)
    }
  }
}
</script>
