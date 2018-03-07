<template>
  <q-page class="flex flex-center">
    <h4>Secure Page</h4>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex',
  created () {
    console.log('-----------------------')
    this.$feathers.authenticate().then(() => {
      console.log('show application page')
    }).catch(() => {
      console.log('show login page')
    })
    console.log('-----------------------')
    this.$feathers.authenticate({
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
