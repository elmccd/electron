<template>
  <div>
    <img src="./LandingPageView/assets/logo.png" alt="electron-vue">
    <h1>Welcome.</h1>
    <repositories-list></repositories-list>
    <versions></versions>
    <links></links>
    <form @submit="submitRepository">
      <label>
        Repository name
        <input type="text" v-model="repositoryName">
      </label>
      <label>
        Repository url
        <input type="text" v-model="repositoryUrl">
      </label>
      <button>Submit</button>
    </form>
    <pre>dd{{repositoryUrl}}</pre>
    <a href="#/login">Login here!</a>
    <div>{{state}}</div>
    <h2>Repositories</h2>
    <ul>
      <li v-for="item in state.repositories.items">
        {{item}}
        <a :href="'#/repository/' + item.id">{{item.name}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
  import RepositoriesList from './LandingPageView/RepositoriesList'
  import Links from './LandingPageView/Links'
  import Versions from './LandingPageView/Versions'
  import { mapActions } from 'vuex'
  export default {
    components: {
      RepositoriesList,
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
    created () {
      this.updateRepositories()
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
