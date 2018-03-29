<template>
  <q-layout view="lHh Lpr lFf" ref="layout">
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
        <q-btn-dropdown flat round dense icon="language" :title="$t('layout.menu.language')">
          <q-list link>
            <q-item v-close-overlay @click.native="lang = 'en-us'"
              :disabled="this.$i18n.locale === 'en'">
              English
            </q-item>
            <q-item v-close-overlay @click.native="lang = 'de'"
              :disabled="this.$i18n.locale === 'de'">
              Deutsch
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-btn-dropdown flat round dense icon="account circle" :title="$t('layout.menu.settings')">
          <q-list link>
            <q-item v-close-overlay
              :class="notAuthenticatedClass()"
              @click.native="loginOpen = true">
              <q-item-side icon="vpn key" />
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
      leftDrawerOpen: true,
      loginOpen: false,
      lang: this.$q.i18n.lang
    }
  },
  computed: {
    subtitle () {
      return this.$route.meta.module
        ? this.$i18n.t(`${this.$route.meta.module}.title`) + ': ' + this.$i18n.t(`${this.$route.meta.module}.subtitle`)
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
