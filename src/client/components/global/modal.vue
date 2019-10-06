<template>
  <v-overlay :value="overlay" transition="fade-transition">
    <slot></slot>
  </v-overlay>
</template>

<script lang="ts">
  export default {
    computed: {
      overlay() {
        return this.$store.state.app.overlay
      }
    }
  }
</script>
<style>

</style>