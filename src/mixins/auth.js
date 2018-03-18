export const AuthMixin = {
  data () {
    return {
      id: ''
    }
  },

  methods: {
    logout () {
      // this.logout()
      this.$store.dispatch('auth/logout')
        .then(() => {
          this.$q.notify({
            color: 'positive',
            icon: 'check circle',
            message: 'Successfully logged out'
          })
          return Promise.resolve()
        })
    },
    isAuthenticated () {
      return this.$store.state.auth.user
    },
    authenticatedClass () {
      return this.isAuthenticated() ? '' : 'hidden'
    },
    notAuthenticatedClass () {
      return this.isAuthenticated() ? 'hidden' : ''
    }
  }
}
