<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar color="primary" glossy>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          title="Hide or display left side menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          Administration Portal
          <div slot="subtitle">{{ title }}</div>
        </q-toolbar-title>
        <q-btn flat round dense icon="lock" title="Login" @click="loginOpen = true" />
        <q-btn-dropdown flat round dense icon="account circle" title="Account">
          <q-list link>
            <q-item to="/user">
              <q-item-side icon="account box" />
              <q-item-main label="Account Settings" />
            </q-item>
            <q-item v-close-overlay @click.native="logout()">
              <q-item-side icon="exit to app" />
              <q-item-main label="Logout" />
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      content-class="bg-grey-2"
    >
      <q-list
        no-border
        link
        inset-delimiter
      >
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
      <q-modal v-model="loginOpen" @show="focusLogin">
        <q-modal-layout
          header-style="min-height: 100px"
          content-class="{'bg-primary': isPrimary, 'some-class': someBoolean}"
          footer-class="bg-primary some-class"
          footer-style="{fontSize: '24px', fontWeight: 'bold'}"
        >
          <q-toolbar slot="header">
            <q-btn
              flat
              round
              dense
              v-close-overlay
              icon="keyboard_arrow_left"
            />
            <q-toolbar-title>
              Login
            </q-toolbar-title>
          </q-toolbar>
          <div class="layout-padding">
            <q-field
              label="Email"
              :error="mailHasError"
              error-label="We need your registered email"
              label-width="4"
            >
              <q-input v-model.trim="login.email"
                type="email"
                placeholder="myname@gmail.com"
                autofocus
                ref="loginEmail"
              />
            </q-field>
            <q-field
              label="Password"
              :error="mailHasError"
              error-label="The password is mandatory"
              label-width="4"
            >
              <q-input v-model="login.password" type="password" />
            </q-field>
          </div>
          <div class="layout-padding">
            <q-btn
              color="primary"
              v-close-overlay
              label="Login"
            />
          </div>
        </q-modal-layout>
      </q-modal>
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL, Dialog } from 'quasar'

export default {
  name: 'LayoutDefault',
  data () {
    return {
      leftDrawerOpen: true,
      loginOpen: false,
      login: {
        email: '',
        password: null
      },
      title: ''
    }
  },
  methods: {
    openURL,
    focusLogin: function () {
      this.$refs.loginEmail.focus()
    },
    logout: () => {
      Dialog.create({
        title: 'Question',
        message: 'Do you really want to logout?',
        color: 'primary',
        ok: true,
        cancel: true
      })
        .then(() => false)
        .catch(() => false)
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
