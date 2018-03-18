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
            <q-item v-close-overlay
              :class="notAuthenticatedClass()"
              @click.native="loginOpen = true">
              <q-item-side icon="lock" />
              <q-item-main label="Login" />
            </q-item>
            <q-item to="/user"
              :class="authenticatedClass()">
              <q-item-side icon="account circle" />
              <q-item-main label="Profile" />
            </q-item>
            <q-item v-close-overlay
              :class="authenticatedClass()"
              @click.native="logout">
              <q-item-side icon="exit to app" />
              <q-item-main label="Logout" />
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer v-model="leftDrawerOpen" content-class="bg-grey-2">
      <sidebar-menu />
    </q-layout-drawer>

    <q-page-container>
      <router-view />
      <login-dialog v-model="loginOpen" />
    </q-page-container>

  </q-layout>
</template>

<script>
import { AuthMixin } from '../mixins/auth'
import SidebarMenu from '../components/sidebarMenu'
import LoginDialog from '../components/loginDialog'

export default {
  name: 'LayoutDefault',
  data () {
    return {
      title: '',
      leftDrawerOpen: true,
      loginOpen: false
    }
  },
  mounted () {
    this.title = this.$route.meta.title
  },
  watch: {
    '$route' () {
      this.title = this.$route.meta.title
    }
  },
  components: { SidebarMenu, LoginDialog },
  mixins: [AuthMixin]
}
</script>

<style>
</style>
