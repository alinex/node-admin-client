<template>
  <q-page class="q-pa-lg">

    <q-breadcrumbs class="q-mb-lg">
      <q-breadcrumbs-el :label="$t('goHome')" icon="home" to="/" />
      <q-breadcrumbs-el :label="$t(`${$route.meta.module}.title`)" icon="account box" />
    </q-breadcrumbs>

    <q-list link separator no-border>
      <q-list-header>Users</q-list-header>
      <q-item v-for="user in users" :key="user._id"
        :to="'/users/' + user._id">
        <q-item-side :avatar="user.gravatar" />
        <q-item-main :label="user.email"
          :sublabel="user.name + ' (' + user.nickname + ')'" />
      </q-item>
    </q-list>

    <div class="q-pt-md float-right">
      <q-btn class="submit" color="positive" icon="person add" label="Add User"
        @click="$router.push('/users/new')" />
    </div>

  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  data: () => ({
    users: [],
    loading: true
  }),
  async created () {
    try {
      const response = await this.$feathers.service('users').find()
      this.users = response.data
    } catch (error) {
      console.error(error.message)
      this.$q.notify('ERROR: ' + error.message + '. Check server connection.')
    } finally {
      this.loading = false
    }
  }
}
</script>
