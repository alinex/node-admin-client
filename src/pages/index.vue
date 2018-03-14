<template>
  <q-page class="flex flex-center welcome">
    <div class="container">
      <div class="page">
        <img src="~assets/alinex.svg" alt="Alinex Logo" />
        <h1 class="center-text">Administration Panel</h1>
      </div>
    </div>
  </q-page>
</template>

<style>
  main.welcome {
    background: url(~assets/background.jpg) no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }
  main.welcome .page {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    border: 3px solid #aaa;
    border-radius: 40px;
    background: #eee;
    opacity: 0.8;
    text-align: center;
  }
  main.welcome img {
    margin: 0 auto;
    width: 370px;
    margin-bottom: 8px;
  }
  main.welcome h1 {
    margin: 0;
    color: #f0ad4e;
    font-size: 40px;
    font-weight: bold;
  }
</style>

<script>
export default {
  name: 'PageIndex'
}
</script>
