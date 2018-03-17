<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar color="primary" glossy>
        <q-btn flat dense round
          @click="leftDrawerOpen = !leftDrawerOpen"
          title="Hide or display left side menu"
          >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          Administration Portal
          <div slot="subtitle">{{ title }}</div>
        </q-toolbar-title>
        <q-btn-dropdown flat round dense icon="settings" title="Settings">
          <q-list link>
            <q-item v-close-overlay @click.native="loginOpen = true">
              <q-item-side icon="lock" />
              <q-item-main label="Login" />
            </q-item>
            <q-item to="/user">
              <q-item-side icon="account circle" />
              <q-item-main label="Profile" />
            </q-item>
            <q-item v-close-overlay @click.native="logout">
              <q-item-side icon="exit to app" />
              <q-item-main label="Logout" />
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer v-model="leftDrawerOpen" content-class="bg-grey-2">
      <q-list no-border link inset-delimiter>
        <q-collapsible label="Core System">
          <q-item to="/info">
            <q-item-side icon="info" />
            <q-item-main label="Info" sublabel="systems information" />
          </q-item>
          <q-item to="/access">
            <q-item-side icon="vpn key" />
            <q-item-main label="Access Control" sublabel="User and Rights" />
          </q-item>
        </q-collapsible>

        <q-collapsible label="Test Pages">
          <q-item to="/test/secure">
            <q-item-side icon="lock" />
            <q-item-main label="Secure Page" />
          </q-item>
        </q-collapsible>

        <q-collapsible label="Colaborative Tools">
          <!-- chat -->
        </q-collapsible>

        <q-collapsible label="Server Management">
        </q-collapsible>

        <q-collapsible label="Data Analysis">
        </q-collapsible>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
      <q-modal v-model="loginOpen" @show="focusLogin"
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
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import { mapActions } from 'vuex'
import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'LayoutDefault',
  data () {
    return {
      title: '',
      leftDrawerOpen: true,
      loginOpen: false,
      loginData: {
        email: '',
        password: null
      },
      emailHasError: false,
      passwordHasError: false
    }
  },
  validations: {
    loginData: {
      email: { required, email },
      password: { required, minLength: minLength(6) }
    }
  },
  methods: {
    openURL,
    focusLogin: function () {
      this.$refs.loginEmail.select()
    },
    ...mapActions('auth', ['authenticate', 'logout']),
    login () {
      this.$v.loginData.$touch()
      if (this.$v.loginData.$error) {
        console.log(this.$v.loginData.$error)
        this.$q.notify({
          label: 'Could not send Form',
          icon: 'error outline',
          message: 'Could not send Form',
          detail: 'Please review fields again.'
        })
        return
      }
      this.authenticate(this.loginData)
        .then(() => {
          this.loginOpen = false
        })
    }
  },
  mounted () {
    this.title = this.$route.meta.title
  },
  watch: {
    '$route' () {
      this.title = this.$route.meta.title
    }
  }
}
</script>

<style>
</style>
