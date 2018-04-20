<template>
  <q-list no-border link inset-delimiter>
    <q-item to="/?h">
      <q-item-side icon="home" />
      <q-item-main
        :label="$t('home.title')"
        :sublabel="$t('home.subtitle')" />
    </q-item>

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

    <q-collapsible :label="$t('colab.title')" :class="authenticatedClass()">
      <q-item to="/chat">
        <q-item-side icon="chat" />
        <q-item-main
          :label="$t('colab.chat.title')"
          :sublabel="$t('colab.chat.subtitle')" />
      </q-item>
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
