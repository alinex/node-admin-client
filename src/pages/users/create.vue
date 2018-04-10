<template>
  <q-page class="q-pa-lg">

    <q-breadcrumbs class="q-mb-lg">
      <q-breadcrumbs-el :label="$t('home.title')" icon="home" to="/" replace />
      <q-breadcrumbs-el :label="$t(`${$route.meta.module}.title`)" icon="account box" to="/users" />
      <q-breadcrumbs-el :label="$t('layout.form.create')" icon="person add" />
    </q-breadcrumbs>

    <ax-form-group :title="$t('core.users.formLogin')">
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
