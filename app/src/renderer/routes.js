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
    path: '/add',
    name: 'add-repository-page',
    component: require('components/AddRepositoryView')
  },
  {
    path: '/repository/:repositoryId',
    name: 'repository-page',
    component: require('components/RepositoryView')
  },
  {
    path: '*',
    redirect: '/'
  }
]
