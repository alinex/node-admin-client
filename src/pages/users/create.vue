<template>
  <q-page class="q-pa-lg">

    <q-breadcrumbs class="q-mb-lg">
      <q-breadcrumbs-el :label="$t('goHome')" icon="home" to="/" replace />
      <q-breadcrumbs-el :label="$t(`${$route.meta.module}.title`)" icon="account box" to="/users" />
      <q-breadcrumbs-el label="New" icon="person add" />
    </q-breadcrumbs>

    <div class="row q-mb-lg">
      <div class="col-md-4 col-lg-5 col-xl-4">
        <h4 class="q-mt-none">Login Data</h4>
      </div>

      <div class="col-xs-12 col-md-8 col-lg-6 col-xl-5">
        <q-field class="q-pb-md"
          icon="email"
          label="Email"
          :error="$v.user.email.$error"
          error-label="A valid email address is needed to login">
          <q-input v-model.trim="user.email"
            type="email"
            placeholder="myname@gmail.com"
            autofocus
            ref="email"
            @blur="$v.user.email.$touch" />
        </q-field>

        <q-field class="q-pb-md"
          icon="vpn key"
          label="New Password"
          :error="$v.user.password.$error || $v.user.passwordRepeat.$error"
          error-label="The new password should be two times exactly same with at least 6 characters">
          <q-input v-model.trim="user.password" type="password"
            @blur="$v.user.password.$touch(); $v.user.passwordRepeat.$touch()" /><br />
          <q-input v-model.trim="user.passwordRepeat" type="password"
            @blur="$v.user.password.$touch(); $v.user.passwordRepeat.$touch()"
            placeholder="retype password to confirm" />
        </q-field>
      </div>
    </div>

    <div class="row q-mb-lg">
      <div class="col-md-4 col-lg-5 col-xl-4">
        <h4 class="q-mt-none">Personal Information</h4>
      </div>

      <div class="col-xs-12 col-md-8 col-lg-6 col-xl-5">
        <q-field class="q-pb-md"
          icon="mdi-account-outline"
          label="Nickname"
          :error="$v.user.nickname.$error"
          error-label="The nickname should have at least 4 characters">
          <q-input v-model.trim="user.nickname" type="text"
            @blur="$v.user.nickname.$touch" />
        </q-field>

        <q-field class="q-pb-md"
          icon="mdi-account"
          label="Full Name">
          <q-input v-model.trim="user.name" type="text" />
        </q-field>

        <q-field class="q-pb-md"
          icon="mdi-domain"
          label="Position"
          :error="$v.user.position.$error"
          error-label="The position should have at least 3 characters">
          <q-input v-model.trim="user.position" type="text"
            @blur="$v.user.position.$touch" />
        </q-field>
      </div>
    </div>

    <div class="row q-mb-lg">
      <div class="offset-md-4 offset-lg-5 offset-xl-4 col-xs-12 col-md-8 col-lg-6 col-xl-5">
        <div style="text-align: center">
          <q-btn class="submit" color="secondary" icon="delete" label="Delete" />
          <q-btn class="submit" color="primary" icon="check circle" label="Save" @click="send" />
        </div>
      </div>
    </div>

  </q-page>
</template>

<script>
import { required, email, sameAs, minLength } from 'vuelidate/lib/validators'

export default {
  // name: 'PageName',
  data: () => ({
    user: {}
  }),
  validations: {
    user: {
      email: { required, email },
      password: { required, minLength: minLength(6) },
      passwordRepeat: { sameAsPassword: sameAs('password') },
      nickname: { required, minLength: minLength(4) },
      position: { minLength: minLength(3) }
    }
  },
  methods: {
    async send () {
      // validate
      this.$v.user.$touch()
      if (this.$v.user.$error) {
        console.log(this.$v.user.$error)
        this.$q.notify({
          icon: 'error outline',
          message: this.$t('formError'),
          detail: this.$t('formErrorDetail')
        })
        return
      }
      // collect data to store
      const user = {
        email: this.user.email,
        password: this.user.password,
        nickname: this.user.nickname,
        name: this.user.name,
        position: this.user.position
      }
      // send to server
      try {
        this.user = await this.$feathers.service('users').create(user)
        this.$q.notify({
          color: 'positive',
          icon: 'check circle',
          message: 'New user created successfully'
        })
        this.$router.push('/users')
      } catch (error) {
        console.error(error.message)
        this.$q.notify('ERROR: ' + error.message + '. Check server connection.')
      }
    }
  }
}
</script>
