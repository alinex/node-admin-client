<template>
  <q-page class="q-pa-lg">

    <q-breadcrumbs class="q-mb-lg relative-position">
      <q-breadcrumbs-el :label="$t('home.title')" icon="home" to="/" replace />
      <q-breadcrumbs-el :label="$t(`${$route.meta.module}.title`)" icon="account box" to="/users" />
      <q-breadcrumbs-el :label="$t('core.users.detail')" icon="edit" />
    </q-breadcrumbs>

    <ax-loader :loading="loading" :sending="sending">
      <ax-form-group :title="$t('core.users.formLogin')" :subtitle="$t('core.users.formLoginDesc')">
        <q-field class="q-pb-md"
          icon="email"
          :label="$t('core.users.email.title')"
          :error="$v.user.email.$error"
          :error-label="$t('core.users.email.error')">
          <q-input v-model.trim="user.email"
            type="email"
            placeholder="myname@gmail.com"
            autofocus
            ref="email"
            @blur="$v.user.email.$touch" />
        </q-field>

        <q-field class="q-pb-md"
          icon="vpn key"
          :label="$t('core.users.password.titleNew')"
          :error="$v.user.password.$error || $v.user.passwordRepeat.$error"
          :error-label="$t('core.users.password.error')">
          <q-input v-model.trim="user.password" type="password" clearable
            @blur="$v.user.password.$touch(); $v.user.passwordRepeat.$touch()" /><br />
          <q-input v-model.trim="user.passwordRepeat" type="password"
            @blur="$v.user.password.$touch(); $v.user.passwordRepeat.$touch()"
            :placeholder="$t('core.users.password.retype')" />
        </q-field>
      </ax-form-group>

      <ax-form-group :title="$t('core.users.formPersonal')">
        <q-field class="q-pb-md"
          icon="mdi-account-outline"
          :label="$t('core.users.nickname.title')"
          :error="$v.user.nickname.$error"
          :error-label="$t('core.users.nickname.error')">
          <q-input v-model.trim="user.nickname" type="text"
            @blur="$v.user.nickname.$touch" />
        </q-field>

        <q-field class="q-pb-md"
          icon="mdi-account"
          :label="$t('core.users.name.title')">
          <q-input v-model.trim="user.name" type="text" />
        </q-field>

        <q-field class="q-pb-md"
          icon="mdi-domain"
          :label="$t('core.users.position.title')"
          :error="$v.user.position.$error"
          :error-label="$t('core.users.position.error')">
          <q-input v-model.trim="user.position" type="text"
            @blur="$v.user.position.$touch" />
        </q-field>
      </ax-form-group>

      <ax-form-group :title="$t('core.users.formAccess')">
        <q-field class="q-pb-md"
          icon="mdi-sync-off"
          :label="$t('core.users.disabled.title')">
          <q-checkbox v-model="user.disabled" :label="$t('core.users.disabled.desc')" />
        </q-field>
      </ax-form-group>

      <ax-form-group>
        <div style="text-align: center">
          <q-btn class="submit" color="secondary" icon="delete"
            :label="$t('layout.form.delete')" @click="remove" />
          <q-btn class="submit" color="primary" icon="check circle"
            :label="$t('layout.form.save')" @click="store" />
        </div>
      </ax-form-group>
    </ax-loader>
  </q-page>
</template>

<script>
import { required, email, sameAs, minLength } from 'vuelidate/lib/validators'
import axLoader from 'components/axLoader'
import axFormGroup from 'components/axFormGroup'

export default {
  // name: 'PageName',
  data: () => ({
    user: {},
    loading: true,
    sending: false
  }),
  validations: {
    user: {
      email: { required, email },
      password: { minLength: minLength(6) },
      passwordRepeat: { sameAsPassword: sameAs('password') },
      nickname: { required, minLength: minLength(4) },
      position: { minLength: minLength(3) }
    }
  },
  methods: {
    async store () {
      // validate
      this.$v.user.$touch()
      if (this.$v.user.$error) {
        console.error(this.$v.user.$error)
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
        this.sending = true
        this.user = await this.$feathers.service('users').patch(this.user._id, user)
        this.$q.notify({
          color: 'positive',
          icon: 'check circle',
          message: this.$t('layout.form.saveSuccess', { type: this.$t('core.users.type') })
        })
      } catch (error) {
        console.error(error.message)
        this.$q.notify('ERROR: Saving data to server:' + error.message)
      }
      this.sending = false
    },
    async remove () {
      try {
        this.sending = true
        this.user = await this.$feathers.service('users').remove(this.user._id)
        this.$q.notify({
          color: 'positive',
          icon: 'check circle',
          message: this.$t('layout.form.deleteSuccess', { type: this.$t('core.users.type') })
        })
        this.$router.push('/users')
      } catch (error) {
        console.error(error.message)
        this.$q.notify('ERROR: Retrieving response from server: ' + error.message)
      }
      this.sending = false
    }
  },
  async created () {
    try {
      this.user = await this.$feathers.service('users').get(this.$route.params.id)
      this.user.password = ''
      this.user.passwordRepeat = ''
    } catch (error) {
      console.error(error.message)
      this.$q.notify('ERROR: Retrieving data from server: ' + error.message)
      this.$router.push('/users')
    }
    this.loading = false
  },
  components: { axLoader, axFormGroup }
}
</script>
