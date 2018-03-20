<template>
  <q-page class="flex flex-center">
    <div class="container">
      <div class="page layout-padding">
        <img src="~assets/alinex.png" alt="Alinex Logo" />
        <h1 class="center-text">{{ $t('title') }}</h1>
      </div>
    </div>
  </q-page>
</template>

<style scoped>
  main {
    background: url(~assets/background.jpg) no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }
  .page {
    border: 3px solid #aaa;
    border-radius: 40px;
    background: #eee;
    opacity: 0.8;
    text-align: center;
  }
  img {
    width: 340px;
    margin-bottom: 8px;
  }
  h1 {
    margin: 0;
    color: #f0ad4e;
    font-size: 38px;
    font-weight: 900;
  }
</style>

<script>
export default {
  name: 'PageIndex'
}
</script>
