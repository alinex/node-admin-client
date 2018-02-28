
export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { path: 'info', component: () => import('pages/info') },
      { path: '', component: () => import('pages/index') }
    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
