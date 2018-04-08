<template>
  <div class="ax-loader">
    <div v-if="!loading" class="animate-fade">
      <slot></slot>
    </div>
    <q-inner-loading :visible="loading || sending">
      <q-spinner-gears size="20%" color="primary"></q-spinner-gears>
      <h4 v-if="loading">Loading data...</h4>
      <h4 v-if="sending">Waiting for server response...</h4>
    </q-inner-loading>
  </div>
</template>

<script>
export default {
  props: ['loading', 'sending']
}
</script>
