<template>
  <q-page class="q-pa-lg">

    <q-breadcrumbs class="q-mb-lg">
      <q-breadcrumbs-el :label="$t('home.title')" icon="home" to="/" />
      <q-breadcrumbs-el :label="$t(`${$route.meta.module}.title`)" icon="chat" />
    </q-breadcrumbs>

    <q-chat-message
      label='Sunday, 19th'
    />

    <!--
    <ul>
        <li v-for="message in messages" :key="message._id">
          <label>{{ message.name }}:</label> {{ message.text }}
        </li>
    </ul>
    -->
    <q-chat-message v-for="message in messages"
      :key="message._id"
      :name="message.name" :text="[message.text]" :sent="message.sent" />

    <q-input v-model.trim="add"
      type="text"
      autofocus clearable
      ref="add"
      @keyup.enter="sendMessage" />

  </q-page>
</template>

<script>
import axLoader from 'components/axLoader'

export default {
  // name: 'PageName',
  data: () => ({
    add: '',
    messages: [
      { _id: 1,
        name: 'me',
        text: 'hunter2',
        sent: true
      },
      { _id: 2,
        name: 'Jane',
        text: 'hey, if you type in your pw'
      },
      { _id: 3,
        name: 'Jane',
        text: 'it will show as stars'
      },
      { _id: 4,
        name: 'Anton',
        text: "hello, I'm there, too"
      }
    ],
    loading: true
  }),
  methods: {
    sendMessage () {
      this.messages.push({
        _id: 5,
        text: this.add,
        name: 'me',
        sent: true
      })
      this.resetMessage()
    },
    resetMessage () {
      this.add = ''
    }
  },
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
