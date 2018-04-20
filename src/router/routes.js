
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

      { path: 'chat',
        component: () => import('pages/chat/index'),
        meta: { module: 'colab.chat' } }
    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
