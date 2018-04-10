<template>
  <div class="ax-form-group row q-mb-lg">
    <div class="col-md-4 col-lg-5 col-xl-4 q-pr-md">
      <h4 v-if="title" class="q-mt-none">{{ title }}</h4>
      <p v-if="subtitle">{{ subtitle }}</p>
    </div>

    <div class="col-xs-12 col-md-8 col-lg-6 col-xl-5">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    subtitle: String
  }
}
</script>
