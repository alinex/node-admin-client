<template>
  <q-page padding>
    <!-- content -->
    TEXT
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',

  async created () {
    console.log('--------------------------------------------')
    const data = await this.$feathers.service('info').find()
    console.log(data)
  }
}
</script>

<style>
</style>
