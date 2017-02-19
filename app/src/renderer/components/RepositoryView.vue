<template>
  <div>
    <a href="#/">back</a>
    <h1>Repository page {{$route.params.repositoryId}}</h1>
    <a href="#/">{{$route.params.repositoryId}}</a>
    <pre>{{repository}}status={{status}}</pre>
    <a @click="removeRepository">removeRepository</a>
  </div>
</template>

<script>
  export default {
    name: 'repository-page',
    created () {
      // fetch the data when the view is created and the data is
      // already being observed
      this.init()
    },
    watch: {
      // call again the method if the route changes
      '$route': 'init'
    },
    computed: {
      repository () {
        return this.$store.state.repository
      },
      status () {
        console.log('this.$store.state', this.$store.state.repository.status);
        return this.$store.state.repository.status
      }
    },
    methods: {
      init() {
        this.$store.dispatch('updateRepository', this.$route.params.repositoryId);

      },
      removeRepository() {
        this.$store.dispatch('removeRepository', this.$route.params.repositoryId);
        this.$router.push('/')
      }
    }
  }
</script>
