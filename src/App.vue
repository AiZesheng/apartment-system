<template>
  <div id="app">
    <v-menu></v-menu>
    <router-view></router-view>
  </div>
</template>

<script>
import menu from './components/menu.vue';
export default {
  name: 'app',
  components: {
    'v-menu': menu
  }
}
</script>

<style lang="scss">
  @import './scss/index.scss';
  #app {
  	height: 100%;
  }
</style>
