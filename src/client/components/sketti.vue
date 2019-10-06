<template>
  <div>
    <v-app>
      <div id="sketti">
        <sidebar></sidebar>
        <div id="sketti__content">
          <router-view></router-view>
        </div>
      </div>
      <modal v-if="loading">
        <v-progress-circular indeterminate size="164"></v-progress-circular>
      </modal>
    </v-app>
  </div>
</template>

<script lang="ts">
  import Sidebar from './sidebar.vue'
  import Modal from './global/modal.vue'
  export default {
    components: {
      'sidebar': Sidebar,
      'modal': Modal
    },
    computed: {
      loading() {
        return this.$store.state.app.loading
      }
    },
    created() {
      this.$store.dispatch('me/get')
    }
  }
</script>

<style>
  #sketti {
    display :flex;
  }
  #sketti__content {
    width: calc(100% - 300px)
  }
</style>s