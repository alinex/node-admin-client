<template>
  <q-page class="q-pa-lg">

    <q-breadcrumbs class="q-mb-lg">
      <q-breadcrumbs-el :label="$t('home.title')" icon="home" to="/" replace />
      <q-breadcrumbs-el :label="$t(`${$route.meta.module}.title`)" icon="account box" to="/users" />
      <q-breadcrumbs-el :label="$t('layout.form.create')" icon="person add" />
    </q-breadcrumbs>

    <ax-form-group :title="$t('core.users.formLogin')" :subtitle="$t('core.users.formLoginDesc')">
      <!-- blank fields to prevent auto fill -->
      <input type="text" style="display:none">
      <input type="password" style="display:none">

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
        :label="$t('core.users.password.title')"
        :error="$v.user.password.$error || $v.user.passwordRepeat.$error"
        :error-label="$t('core.users.password.error')">
        <q-input v-model.trim="user.password" type="password"
          @blur="$v.user.password.$touch(); $v.user.passwordRepeat.$touch()" /><br />
        <q-input v-model.trim="user.passwordRepeat" type="password"
          @blur="$v.user.password.$touch(); $v.user.passwordRepeat.$touch()"
          :placeholder="$t('core.users.password.retype')" />
      </q-field>
    </ax-form-group>

    <ax-form-group :title="$t('core.users.formPersonal')" :subtitle="$t('core.users.formPersonalDesc')">
      <q-field class="q-pb-md"
        icon="photo camera"
        :label="$t('core.users.avatar.title')">
        <a href="https://wordpress.com/log-in?client_id=1854&redirect_to=https%3A%2F%2Fpublic-api.wordpress.com%2Foauth2%2Fauthorize%3Fclient_id%3D1854%26response_type%3Dcode%26blog_id%3D0%26state%3Dc3db1375b43998734d23a67ad8fd13b43867f1c4689ffb78004e1591086dc7e7%26redirect_uri%3Dhttps%253A%252F%252Fen.gravatar.com%252Fconnect%252F%253Faction%253Drequest_access_token" target="_blank"><img :src="user.avatar" :title="$t('core.users.avatar.link')" /></a>
      </q-field>

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

    <ax-form-group>
      <div style="text-align: center">
        <q-btn class="submit" color="primary" icon="check circle"
          :label="$t('layout.form.save')" @click="send" />
      </div>
    </ax-form-group>
  </q-page>
</template>

<script>
import { required, email, sameAs, minLength } from 'vuelidate/lib/validators'
import axFormGroup from 'components/axFormGroup'
import crypto from 'crypto'

const users = this.$feathers.service('users')

export default {
  // name: 'PageName',
  data: () => ({
    user: {
      avatar: 'https://www.gravatar.com/avatar/dc23461c186acbggacd8eg637543fdec?s=60&d=mm'
    }
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
  watch: {
    'user.email' () {
      this.gravatar()
    },
    '$q.appVisible' (val) {
      if (val) {
        this.gravatar()
      }
    }
  },
  methods: {
    gravatar () {
      // update gravatar url
      if (this.$v.user.email.$error) {
        return
      }
      const gravatarUrl = 'https://www.gravatar.com/avatar'
      const query = 's=60&d=mm&' + Date.now()
      const hash = crypto.createHash('md5').update(this.user.email.toLowerCase()).digest('hex')
      this.user.avatar = `${gravatarUrl}/${hash}?${query}`
    },
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
        this.user = await users.create(user)
        this.$q.notify({
          color: 'positive',
          icon: 'check circle',
          message: this.$t('layout.form.createSuccess', { type: this.$t('core.users.type') })
        })
        this.$router.push('/users')
      } catch (error) {
        console.error(error.message)
        this.$q.notify('ERROR: Saving data to server ' + error.message)
      }
    }
  },
  components: { axFormGroup }
}
</script>
