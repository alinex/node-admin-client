<template>
  <q-page class="q-pa-lg">

    <q-breadcrumbs class="q-mb-lg">
      <q-breadcrumbs-el :label="$t('home.title')" icon="home" to="/" />
      <q-breadcrumbs-el :label="$t(`${$route.meta.module}.title`)" icon="chat" />
    </q-breadcrumbs>

    <q-chat-message
      label='Sunday, 19th'
    />

    <q-chat-message
      name="me"
      avatar="statics/boy-avatar.png"
      :text="['hunter2']"
      stamp="4 minutes ago"
      sent
    />

    <q-chat-message
      name="Jane"
      avatar="statics/linux-avatar.png"
      :text="['hey, if you type in your pw', 'it will show as stars']"
      stamp="7 minutes ago"
    />

    <q-chat-message
      name="Anton"
      avatar="statics/linux-avatar.png"
      :text="['hey, if you type in your pw']"
      stamp="3 minutes ago"
    />

  </q-page>
</template>

<script>
import axLoader from 'components/axLoader'

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
      this.$q.notify('ERROR: Retrieving data from server: ' + error.message + '.')
    } finally {
      this.loading = false
    }
  },
  components: { axLoader }
}
</script>
