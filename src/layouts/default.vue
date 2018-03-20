<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar color="primary" glossy>
        <q-btn flat dense round
          @click="leftDrawerOpen = !leftDrawerOpen"
          :title="$t('layout.sidebarHide')"
          >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          {{ $t('title') }}
          <div slot="subtitle">{{ subtitle }}</div>
        </q-toolbar-title>
        <q-btn-dropdown flat round dense icon="settings" :title="$t('layout.menu.settings')">
          <q-list link>
            <q-item v-close-overlay
              @click.native="lang = 'en-us'">
              <q-item-side icon="language" />
              <q-item-main label="English" />
            </q-item>
            <q-item v-close-overlay
              @click.native="lang = 'de'">
              <q-item-side icon="language" />
              <q-item-main label="Deutsch" />
            </q-item>
            <q-item v-close-overlay
              :class="notAuthenticatedClass()"
              @click.native="loginOpen = true">
              <q-item-side icon="lock" />
              <q-item-main :label="$t('layout.menu.login')" />
            </q-item>
            <q-item to="/user"
              class="hidden" :rclass="authenticatedClass()">
              <q-item-side icon="account circle" />
              <q-item-main :label="$t('layout.menu.profile')" />
            </q-item>
            <q-item v-close-overlay
              :class="authenticatedClass()"
              @click.native="logout">
              <q-item-side icon="exit to app" />
              <q-item-main :label="$t('layout.menu.logout')" />
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
      label: '',
      public: false,
      leftDrawerOpen: true,
      loginOpen: false,
      lang: this.$q.i18n.lang
    }
  },
  computed: {
    subtitle () {
      return this.$route.meta.label
        ? this.$i18n.t(this.$route.meta.label)
        : this.$route.meta.title
    }
  },
  mounted () {
    this.checkAuthentication()
    this.loginOpen = this.$route.path === '/login'
  },
  watch: {
    '$route' () {
      this.checkAuthentication()
      this.loginOpen = this.$route.path === '/login'
    },
    lang (lang) {
      // Update application specific i18n (only use major language part)
      this.$i18n.locale = lang.split('-')[0]
      // Update quasar components i18n
      // (dynamic import, so loading on demand only)
      import(`quasar-framework/i18n/${lang}`).then(lang => {
        this.$q.i18n.set(lang.default)
      })
    }
  },
  components: { SidebarMenu, LoginDialog },
  mixins: [AuthMixin]
}
</script>

<style>
</style>
