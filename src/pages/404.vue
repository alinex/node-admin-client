<template>
  <div class="fixed-center text-center">
    <p>
      <img
        src="~assets/404.jpg"
        style="width:30vw;max-width:150px;"
      >
    </p>
    <p class="text-faded">{{ $t('layout.notFound') }}<strong>(404)</strong></p>
    <q-btn
      color="primary"
      style="width:200px;"
      @click="$router.push('/')" replace>
      {{$t('layout.goBack')}}
    </q-btn>
  </div>
</template>
