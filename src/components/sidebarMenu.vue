<template>
  <q-list no-border link inset-delimiter>
    <q-collapsible :label="$t('core.title')">
      <q-item to="/info">
        <q-item-side icon="info" />
        <q-item-main
          :label="$t('core.info.title')"
          :sublabel="$t('core.info.subtitle')" />
      </q-item>
      <q-item to="/users" :class="authenticatedClass()">
        <q-item-side icon="account box" />
        <q-item-main
          :label="$t('core.users.title')"
          :sublabel="$t('core.users.subtitle')" />
      </q-item>
    </q-collapsible>

    <q-collapsible label="Test">
      <q-item to="/test/public">
        <q-item-side icon="lock open" />
        <q-item-main label="Public Page" />
      </q-item>
      <q-item to="/test/secure">
<!--        :class="authenticatedClass()"-->
        <q-item-side icon="lock" />
        <q-item-main label="Secure Page" />
      </q-item>
    </q-collapsible>

    <q-collapsible label="Colaborative Tools" class="hidden">
      <!-- chat -->
    </q-collapsible>

    <q-collapsible label="Server Management" class="hidden">
    </q-collapsible>

    <q-collapsible label="Data Analysis" class="hidden">
    </q-collapsible>
  </q-list>
</template>

<script>
import { AuthMixin } from '../mixins/auth'

export default {
  mixins: [AuthMixin]
}
</script>
