
export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { path: 'login',
        component: () => import('pages/index') },
      { path: 'test/public',
        component: () => import('pages/test/public'),
        meta: { title: 'Public Test Page', public: true } },
      { path: 'test/secure',
        component: () => import('pages/test/secure'),
        meta: { title: 'Secure Test Page' } },
      { path: 'info',
        component: () => import('pages/info'),
        meta: { title: 'Server Information', public: true } },
      { path: '', component: () => import('pages/index') }
    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
