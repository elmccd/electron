<template>
  <div id="#app" class="app">
    <repositories-list class="repositories-list"></repositories-list>
    <div class="router-view">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import RepositoriesList from './components/RepositoriesList'

  import store from 'renderer/vuex/store'
  export default {
    store,

    components: {
      RepositoriesList
    },

    created () {
      this.$store.dispatch('setRepositories');
      this.$store.dispatch('initRepositoriesDirs');
    }
  }
</script>

<style>
  body {
    margin: 0;
    font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
  }
  .router-view {
    float: left;
    width: calc(100% - 200px);
    overflow: hidden;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .repositories-list {
    float: left;
    width: 200px;
    overflow: hidden;
  }
</style>
