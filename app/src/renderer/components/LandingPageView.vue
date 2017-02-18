<template>
  <div>
    <img src="./LandingPageView/assets/logo.png" alt="electron-vue">
    <h1>Welcome.</h1>
    <versions></versions>
    <links></links>
    <pre>dd{{repositoryUrl}}</pre>
    <a href="#/login">Login here!</a>
    <div>{{state}}</div>

  </div>
</template>

<script>
  import Links from './LandingPageView/Links'
  import Versions from './LandingPageView/Versions'
  import { mapActions } from 'vuex'
  export default {
    components: {
      Links,
      Versions
    },
    data: function () {
      return {
        repositoryUrl: '',
        repositoryName: ''
      }
    },
    name: 'landing-page',
    computed: {
      state () {
        console.log('this', this)
        console.log('state', this.$store.state)
        return this.$store.state
      }
    },
    methods: {
      ...mapActions([
        'updateRepositories',
        'addRepository'
      ]),
      submitRepository: function (e) {
        e.preventDefault()

        this.addRepository({
          id: require('shortid')(),
          url: this.repositoryUrl,
          name: this.repositoryName
        })
      }
    }
  }
</script>

<style scoped>
  img {
    width: 450px;
  }
</style>
