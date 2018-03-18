<template>
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
      <q-item to="/test/public">
        <q-item-side icon="lock open" />
        <q-item-main label="Public Page" />
      </q-item>
      <q-item to="/test/secure"
        :class="authenticatedClass()">
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
</template>

<script>
import { AuthMixin } from '../mixins/auth'

export default {
  mixins: [AuthMixin]
}
</script>

<style>
</style>
