<template>
  <q-page class="q-pa-lg">

    <q-breadcrumbs class="q-mb-lg">
      <q-breadcrumbs-el :label="$t('goHome')" icon="home" to="/" replace />
      <q-breadcrumbs-el :label="$t(`${$route.meta.module}.title`)" icon="account box" to="/users" />
      <q-breadcrumbs-el label="Detail" icon="edit" />
    </q-breadcrumbs>

    <q-field class="q-pb-md"
      icon="email"
      label="Email">
      <q-input v-model.trim="user.email"
        type="email"
        placeholder="myname@gmail.com"
        autofocus
        ref="email" />
    </q-field>

    <div class="q-pt-md float-right">
      <q-btn icon="delete" label="Delete"
        color="secondary"
        style="width:200px" />
      <q-btn icon="check circle" label="Save"
        color="primary"
        style="width:200px" />
    </div>

  </q-page>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

export default {
  // name: 'PageName',
  data: () => ({
    user: null,
    loading: true
  }),
  validations: {
    user: {
      email: { required, email }
    }
  },
  async created () {
    try {
      this.user = await this.$feathers.service('users').get(this.$route.params.id)
    } catch (error) {
      console.error(error.message)
      this.$q.notify('ERROR: ' + error.message + '. Check server connection.')
    } finally {
      this.loading = false
    }
  }
}
</script>

<style lang="stylus">
.q-table tbody td
  white-space: pre-wrap
</style>
