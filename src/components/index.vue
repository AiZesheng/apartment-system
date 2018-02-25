<template>
  <div id="index">
    <v-header></v-header>
    <div id="content">
      <v-menu class="main-menu"></v-menu>
      <router-view id="views" ref="views"></router-view>
    </div>
  </div>
</template>
<script>
  import menu from './menu.vue';
  import header from './header.vue';
  export default {
    components: {
      'v-menu': menu,
      'v-header': header
    }
  }
</script>
<style lang="scss">
  #index {
    height: 100%;
  }
  .main-menu {
    box-flex: 1;
    width: 200px;
    background: #373b46;
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
    padding: 0 15px 15px 15px;
    width: 100%;
  }
  #content {
    display: flex;
    min-height: 100%;
  }
</style>