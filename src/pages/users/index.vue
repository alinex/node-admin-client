<template>
  <q-page class="q-pa-lg">

    <q-breadcrumbs class="q-mb-lg">
      <q-breadcrumbs-el :label="$t('home.title')" icon="home" to="/" />
      <q-breadcrumbs-el :label="$t(`${$route.meta.module}.title`)" icon="account box" />
    </q-breadcrumbs>

    <ax-loader :loading="loading">
      <q-list link separator no-border>
        <q-list-header>{{ $tc('core.users.list', users.length, { count: users.length }) }}</q-list-header>
        <q-item v-for="user in users" :key="user._id"
          :to="'/users/' + user._id">
          <q-item-side :avatar="user.avatar" />
          <q-item-main :label="user.email"
            :sublabel="user.name + ' (' + user.nickname + ')'" />
        </q-item>
      </q-list>
    </ax-loader>

    <div class="q-pt-md float-right">
      <q-btn class="submit" color="positive" icon="person add" :label="$t('core.users.createButton')"
        @click="$router.push('/users/new')" />
    </div>
  </q-page>
</template>

<script>
import axLoader from 'components/axLoader'

const users = this.$feathers.service('users')

export default {
  // name: 'PageName',
  data: () => ({
    users: [],
    loading: true
  }),
  async created () {
    try {
      const response = await users.find()
      this.users = response.data
    } catch (error) {
      console.error(error.message)
      this.$q.notify('ERROR: Retrieving data from server: ' + error.message + '.')
    } finally {
      this.loading = false
    }
  },
  components: { axLoader }
}
</script>
