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
            message: this.$t('layout.logout.success')
          })
          return Promise.resolve()
        })
    },
    checkAuthentication () {
      if (!this.isAuthenticated() && !this.$route.meta.public) {
        this.$router.push('/login')
      }
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
