<template>
  <div>
    <a class="item"
       :href="'#/repository/' + item.id"
       v-bind:class="{ active: item.id === selected }" v-for="item in repositories.items">
      {{item.name}}
    </a>
    <a class="add-new-one" href="#/add">+ Add new one</a>
  </div>
</template>

<script>
  export default {
    computed: {
      repositories () {
        return this.$store.state.repositories
      },
      selected () {
        return this.$route.params.repositoryId
      }
    }
  }
</script>

<style scoped>
  .item {
    display: block;
    background: #5ac0e8;
    color: #fff;
    padding: 10px;
    border: 0;
    font-weight: bold;
    text-transform: uppercase;
    text-decoration: none;
  }
  .item:hover:not(.active) {
    background: #55afcd;
  }
  .active {
    background: #3989d1;
  }
  .add-new-one {
    display: block;
    padding: 10px;
    cursor: pointer;
  }
</style>
