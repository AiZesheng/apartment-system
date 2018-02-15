<template>
  <div id="app">
    <v-header v-if="!$store.state.isLogin"></v-header>
    <div id="content">
      <v-menu v-if="!$store.state.isLogin" class="main-menu"></v-menu>
      <router-view id="views"></router-view>
    </div>
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
    box-flex: 1;
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
  #views {
    background: #fafafa;
    padding: 15px;
    width: 100%;
  }
  #content {
    display: flex;
    height: 100%;
  }
</style>
