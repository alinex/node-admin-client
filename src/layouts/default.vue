<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar color="primary" glossy>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          Administration Portal
          <div slot="subtitle">{{ title }}</div>
        </q-toolbar-title>
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
        <q-collapsible label="Server Management">
        </q-collapsible>
        <q-collapsible label="Data Analysis">
        </q-collapsible>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'LayoutDefault',
  data () {
    return {
      leftDrawerOpen: true,
      title: ''
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
  methods: {
    openURL
  }
}
</script>

<style>
</style>
