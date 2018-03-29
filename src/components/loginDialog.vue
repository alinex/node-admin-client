<template>
  <q-modal v-model="$store.state.layout.login" @show="focusLogin"
    :content-css="{minWidth: '400px', minHeight: '330px'}"
    >
    <q-modal-layout>
      <q-toolbar slot="header">
        <q-btn flat round dense v-close-overlay
          icon="keyboard_arrow_left"
          :title="$t('goBack')" />
        <q-toolbar-title>{{ $t('layout.login.title') }}</q-toolbar-title>
      </q-toolbar>
      <div class="q-pa-md">
        <q-field class="q-pb-md"
          icon="email"
          :label="$t('layout.login.email')"
          orientation="vertical"
          :error="$v.loginData.email.$error"
          :error-label="$t('layout.login.emailError')"
          >
          <q-input v-model.trim="loginData.email"
            type="email"
            placeholder="demo@alinex.de"
            autofocus
            ref="loginEmail"
            @blur="$v.loginData.email.$touch"
            />
        </q-field>
        <q-field
          icon="vpn key"
          :label="$t('layout.login.password')"
          orientation="vertical"
          :error="$v.loginData.password.$error"
          :error-label="$t('layout.login.passwordError')"
          >
          <q-input v-model="loginData.password"
            type="password"
            placeholder="demo"
            @blur="$v.loginData.password.$touch"
            @keyup.enter="login"
            />
        </q-field>
        <div class="q-pt-md float-right">
          <q-btn color="primary" icon="lock"
            :label="$t('layout.login.submit')"
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
          message: this.$t('formError'),
          detail: this.$t('formErrorDetail')
        })
        return
      }
      this.$store.dispatch('auth/authenticate', this.loginData)
        .then(() => {
          this.$store.commit('layout/login')
          if (window.history.length && this.$route.path === '/login') {
            // go back after login on login page
            window.history.back()
          } else {
            this.$q.notify({
              color: 'positive',
              icon: 'check circle',
              message: this.$t('layout.login.success')
            })
          }
          return Promise.resolve()
        })
        .catch(() => {
          this.$q.notify({
            icon: 'error outline',
            message: this.$t('layout.login.fail'),
            detail: this.$store.state.auth.errorOnAuthenticate.message
          })
        })
    }
  }
}
</script>
