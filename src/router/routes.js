
export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { path: '',
        component: () => import('pages/index'),
        meta: { public: true } },
      { path: 'login',
        component: () => import('pages/index'),
        meta: { public: true } },

      { path: 'info',
        component: () => import('pages/info'),
        meta: { module: 'core.info', public: true } },
      { path: 'users',
        component: () => import('pages/users/index'),
        meta: { module: 'core.users' } },
      { path: 'users/new',
        component: () => import('pages/users/create'),
        meta: { module: 'core.users' } },
      { path: 'users/:id',
        component: () => import('pages/users/detail'),
        meta: { module: 'core.users' } },

      { path: 'test/public',
        component: () => import('pages/test/public'),
        meta: { title: 'Public Test Page', public: true } },
      { path: 'test/secure',
        component: () => import('pages/test/secure'),
        meta: { title: 'Secure Test Page' } }
    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
