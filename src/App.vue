<template>
  <div id="app">
    <v-header v-if="!$store.state.isLogin"></v-header>
    <v-menu v-if="!$store.state.isLogin" class="main-menu"></v-menu>
    <router-view></router-view>
  </div>
</template>

<script>
import menu from './components/menu.vue';
import header from './components/header.vue';
export default {
  name: 'app',
  components: {
    'v-menu': menu,
    'v-header': header
  }
}
</script>

<style lang="scss">
  @import './scss/index.scss';
  #app {
  	height: 100%;
  }
  .main-menu {
    float: left;
    width: 200px;
    background: #373b46;
    height: 100%;
    .el-menu-item, .el-submenu__title {
      width: 200px;
      font-size: 17px;
    }
    .is-active {
      background-color: rgb(44,47,56)!important;;
    }
  }
</style>
