<i18n>
{
  "en": {
    "hello": "hello world!",
    "goBack": "GoGo"
  },
  "de": {
    "hello": "Hallo zusammen！"
  }
}
</i18n>

<template>
  <q-page class="layout-padding">
    <h4 row>Public Page</h4>
    <p row>User ID: {{ user ? user._id : 'not logged in' }}</p>
    <p row>Counter: {{ count }}</p>
    <q-btn label="Increment" @click="increment()" />
    <q-btn label="Test" @click="test()" />
    <p>{{ $t('hello') }}</p>
    <p>{{ $t('goBack') }}</p>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'PageIndex',
  computed: {
    ...mapState('auth', ['user'])
  },
  methods: {
    ...mapActions('auth', ['authenticate']),
    test () {
      console.log(this.$store.state.auth.user)
    }
  }
}
</script>
