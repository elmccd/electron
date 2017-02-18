<template>
  <form @submit="submitRepository">
    <label>
      <span>Repository name</span>
      <input type="text" v-model="repositoryName">
    </label>
    <label>
      <span>Repository url</span>
      <input type="text" v-model="repositoryUrl">
    </label>
    <button>Submit</button>
  </form>
</template>

<script>
  import {mapActions} from 'vuex'
  export default {
    data: function () {
      return {
        repositoryUrl: '',
        repositoryName: ''
      }
    },
    name: 'add-repository',
    methods: {
      submitRepository: function (e) {
        e.preventDefault()

        this.$store.dispatch('addRepository', {
          id: require('shortid')(),
          url: this.repositoryUrl,
          name: this.repositoryName
        })
      }
    }
  }
</script>

<style scoped>
  label, span, input {
    display: block;
  }
</style>
