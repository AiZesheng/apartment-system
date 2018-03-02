<template>
  <div id="header">
    <div class="title">宿舍管理系统</div>
    <div class="user">
      <span>当前用户：</span>
      <el-dropdown trigger="click" @command="handleCommand">
        <a href="javascript:;" class="fz-16">{{userName}}<span class="el-icon-caret-bottom"></span></a>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">退出登录&nbsp;<span class="el-icon-circle-close"></span></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
  export default {
    computed: {
      userName () {
        return JSON.parse(sessionStorage.loginUser).username;
      }
    },
    methods: {
      handleCommand (command) {
        sessionStorage.loginUser = '';
        this.$router.push('login');
      }
    }
  }
</script>
<style lang="scss">
  #header {
    height: 56px;
    line-height: 56px;
    background: #373b46;
    color: #fff;
    .title {
      font-weight: bold;
      font-size: 20px;
      float: left;
      margin-left: 20px;
    }
    .user {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 16px;
      margin-right: 20px;
      a {
        color: #fff;
      }
    }
  }
</style>