<template>
  <q-page padding>
    <div class="box row title">
      <div class="page layout-padding">
        <img src="~assets/alinex.png" alt="Alinex Logo" />
        <h1 class="center-text">{{ $t('title') }}</h1>
      </div>
    </div>
    <div class="icons row">
      <q-btn flat round wait-for-ripple
        @click="$router.push('/info')"
        size="48px" icon="info"
        :title="$t('core.info.title') + '\n' + $t('core.info.subtitle')" />
      <q-btn flat round wait-for-ripple
        @click="$router.push('/users')"
        size="48px" icon="account box"
        :title="$t('core.users.title') + '\n' + $t('core.users.subtitle')" />
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
  .box {
    display: table;
    margin: 0 auto;
    border: 3px solid #aaa;
    border-radius: 40px;
    background: #eee;
    opacity: 0.8;
    text-align: center;
  }
  .box.title {
    margin-bottom:40px;
  }
  .icons button {
    background: #eee;
    opacity: 0.6;
    margin: 10px;
    /* height: 2em;
    width: 2em; */
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
