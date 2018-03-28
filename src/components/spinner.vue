<template>
  <q-inner-loading :visible="visible">
    <q-spinner-gears size="50px" color="primary"></q-spinner-gears>
  </q-inner-loading>
</template>

<script>
export default {
  props: ['visible']
}
</script>
