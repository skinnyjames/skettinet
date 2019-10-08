<template>
  <div id="forum">
    <div id="forum__posts">
      <post v-for="(post, index) in posts" v-bind:key="index" :post="post"></post>
    </div>
  </div>
</template>

<script lang="ts">
  import { mapState } from 'vuex'
  import Post from './posts/post.vue'
  export default {
    components: {
      'post': Post,
    },
    computed: {
      ...mapState('app', ['username', 'password', 'registering']),
      posts() {

        let p =  this.$store.state.forum.posts
        console.log(p)
        return p
      }
    }
  }
</script>

<style scoped>
  #forum__menu {
    width: 300px;
    height: 100vh;
    position: fixed;
    border-right: 1px solid #ccc;
  }
</style>