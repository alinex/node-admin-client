<template>
  <q-page class="q-pa-lg">

    <q-breadcrumbs class="q-mb-lg">
      <q-breadcrumbs-el :label="$t('home.title')" icon="home" to="/" />
      <q-breadcrumbs-el :label="$t(`${$route.meta.module}.title`)" icon="chat" />
    </q-breadcrumbs>

    <q-chat-message v-for="message in messages" :key="message._id"
      :name="message.user.nickname"
      :text="[message.text]"
      :avatar="message.user.avatar"
      :sent="isSent(message) ? true : false"
      :stamp="messageDate(message)"
    />

    <ax-loader :loading="loading" :sending="sending">
      <q-input
        class="row col-12 fixed-bottom chat-message q-pa-md"
        style="z-index: 1001"
        v-model.trim="message"
        @keyup.enter="send"
        type="textarea"
        float-label="Enter your message"
        :min-rows="1"
      />
    </ax-loader>

  </q-page>
</template>

<style lang="stylus" scoped>
  .chat-message
    background: white
</style>

<script>
import axLoader from 'components/axLoader'
import moment from 'moment'

export default {
  // name: 'PageName',
  data: () => ({
    message: '',
    messages: [],
    loading: true,
    sending: false
  }),
  methods: {
    isSent (message) {
      return (message.userId === this.$store.state.auth.user._id)
    },
    messageDate (message) {
      return moment(message.createdAt).format('LLL')
    },
    send () {
      if (this.message) {
        this.sending = true
        this.$feathers.service('messages').create({ text: this.message }).then(() => {
          this.message = ''
          this.sending = false
        })
      }
    }
  },
  async mounted () {
    moment.locale(this.$i18n.locale)
    const messages = this.$feathers.service('messages')
    // get all messages
    try {
      const response = await messages.find({
        query: {
          $sort: { createdAt: -1 },
          $limit: 25
        }
      })
      this.messages = response.data.reverse()
    } catch (error) {
      console.error(error.message)
      this.$q.notify('ERROR: Retrieving data from server: ' + error.message + '.')
    } finally {
      this.loading = false
    }
    // add new messages to the message list
    messages.on('created', message => {
      console.log('message received')
      this.messages.push(message)
    })
  },
  watch: {
    lang (lang) {
      moment.locale(lang)
    }
  },
  components: { axLoader }
}
</script>
