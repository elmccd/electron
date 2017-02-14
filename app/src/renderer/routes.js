export default [
  {
    path: '/',
    name: 'landing-page',
    component: require('components/LandingPageView')
  },
  {
    path: '/login',
    name: 'login-page',
    component: require('components/LoginPageView')
  },
  {
    path: '/repository/:id',
    name: 'repository-page',
    component: require('components/RepositoryView')
  },
  {
    path: '*',
    redirect: '/'
  }
]
