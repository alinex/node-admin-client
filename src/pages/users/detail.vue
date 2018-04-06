<template>
  <q-page class="q-pa-lg">

    <q-breadcrumbs class="q-mb-lg">
      <q-breadcrumbs-el :label="$t('goHome')" icon="home" to="/" replace />
      <q-breadcrumbs-el :label="$t(`${$route.meta.module}.title`)" icon="account box" to="/users" />
      <q-breadcrumbs-el label="Detail" icon="edit" />
    </q-breadcrumbs>

    <div v-if="!loading">

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
      <div class="col-md-4 col-lg-5 col-xl-4">
        <h4 class="q-mt-none">Access Control</h4>
      </div>

      <div class="col-xs-12 col-md-8 col-lg-6 col-xl-5">
        <q-field class="q-pb-md"
          icon="mdi-sync-off"
          label="Disabled">
          <q-checkbox v-model="user.disabled" label="user is no longer able to login" />
        </q-field>
      </div>
    </div>

    <div class="row q-mb-lg">
      <div class="offset-md-4 offset-lg-5 offset-xl-4 col-xs-12 col-md-8 col-lg-6 col-xl-5">
        <div style="text-align: center">
          <q-btn icon="delete" label="Delete"
            color="secondary" style="width:200px" />
          <q-btn icon="check circle" label="Save"
            color="primary" style="width:200px"
            @click="send" />
        </div>
      </div>
    </div>

    </div>
    <spinner :visible="loading" />

  </q-page>
</template>

<script>
import { required, email, sameAs, minLength } from 'vuelidate/lib/validators'
import Spinner from '../../components/spinner'

export default {
  // name: 'PageName',
  data: () => ({
    user: null,
    loading: true
  }),
  validations: {
    user: {
      email: { required, email },
      password: { minLength: minLength(6) },
      passwordRepeat: { sameAsPassword: sameAs('password') },
      nickname: { minLength: minLength(4) },
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
      const user = {}
      user.email = this.user.email
      if (this.user.password) {
        user.password = this.user.password
      }
      user.nickname = this.user.nickname
      user.name = this.user.name
      user.position = this.user.position
      // send to server
      try {
        this.user = await this.$feathers.service('users').patch(this.user._id, user)
        this.$q.notify({
          color: 'positive',
          icon: 'check circle',
          message: 'Data stored successfully'
        })
      } catch (error) {
        console.error(error.message)
        this.$q.notify('ERROR: ' + error.message + '. Check server connection.')
      }
    }
  },
  async created () {
    try {
      this.user = await this.$feathers.service('users').get(this.$route.params.id)
    } catch (error) {
      console.error(error.message)
      this.$q.notify('ERROR: ' + error.message + '. Check server connection.')
    } finally {
      this.loading = false
    }
  },
  components: { Spinner }
}
</script>
