<template>
  <div>
    <a href="#/">back</a>
    <h1>Repository page {{$route.params.repositoryId}}</h1>
    <a href="#/">{{$route.params.repositoryId}}</a>
  </div>
</template>

<script>
  export default {
    name: 'repository-page',
    created () {
      console.log(this)
    }
  }
</script>
