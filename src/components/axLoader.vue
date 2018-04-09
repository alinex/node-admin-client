<template>
  <div class="ax-loader">
    <div v-if="!loading" class="animate-fade">
      <slot></slot>
    </div>
    <q-inner-loading :visible="loading || sending">
      <q-spinner-gears size="20%" color="primary"></q-spinner-gears>
      <h4 v-if="loading">{{ $t('layout.loader.loading') }}</h4>
      <h4 v-if="sending">{{ $t('layout.loader.sending') }}</h4>
    </q-inner-loading>
  </div>
</template>

<script>
export default {
  props: {
    loading: Boolean,
    sending: Boolean
  }
}
</script>
