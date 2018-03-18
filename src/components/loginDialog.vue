<template>
  <q-modal v-model="opened" @show="focusLogin"
    :content-css="{minWidth: '400px', minHeight: '330px'}"
    >
    <q-modal-layout>
      <q-toolbar slot="header">
        <q-btn flat round dense v-close-overlay icon="keyboard_arrow_left"/>
        <q-toolbar-title>
          Login
        </q-toolbar-title>
      </q-toolbar>
      <div class="q-pa-md">
        <q-field class="q-pb-md"
          icon="email"
          label="Email"
          orientation="vertical"
          :error="$v.loginData.email.$error"
          error-label="We need your registered email"
          >
          <q-input v-model.trim="loginData.email"
            type="email"
            placeholder="myname@gmail.com"
            autofocus
            ref="loginEmail"
            @blur="$v.loginData.email.$touch"
            />
        </q-field>
        <q-field
          icon="lock"
          label="Password"
          orientation="vertical"
          :error="$v.loginData.password.$error"
          error-label="The password is mandatory"
          >
          <q-input v-model="loginData.password"
            type="password"
            @blur="$v.loginData.password.$touch"
            @keyup.enter="login"
            />
        </q-field>
        <div class="q-pt-md float-right">
          <q-btn color="primary" label="Login"
            @click="login" />
        </div>
      </div>
    </q-modal-layout>
  </q-modal>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
  props: ['value'],
  data () {
    return {
      loginData: {
        strategy: 'local',
        email: '',
        password: null
      }
    }
  },
  computed: {
    opened: {
      get: function () {
        return this.value
      },
      set: function (val) {
        this.$emit('input', val)
      }
    }
  },
  validations: {
    loginData: {
      email: { required, email },
      password: { required, minLength: minLength(6) }
    }
  },
  methods: {
    focusLogin: function () {
      this.$refs.loginEmail.select()
    },
    login () {
      this.$v.loginData.$touch()
      if (this.$v.loginData.$error) {
        console.log(this.$v.loginData.$error)
        this.$q.notify({
          icon: 'error outline',
          message: 'Could not send Form',
          detail: 'Please review fields again.'
        })
        return
      }
      this.$store.dispatch('auth/authenticate', this.loginData)
        .then(() => {
          this.opened = false
          this.$q.notify({
            color: 'positive',
            icon: 'check circle',
            message: 'Successfully authenticated'
          })
          return Promise.resolve()
        })
        .catch(() => {
          this.$q.notify({
            icon: 'error outline',
            message: 'Could not login',
            detail: this.$store.state.auth.errorOnAuthenticate.message
          })
        })
    }
  }
}
</script>

<style>
</style>
