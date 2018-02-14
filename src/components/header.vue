<template>
  <div id="header">
    <div class="title">宿舍管理系统</div>
    <div class="user">
      <span>当前用户：</span>
      <a href="javascript:;">admin<span class="el-icon-caret-bottom"></span></a>
    </div>
  </div>
</template>
<script>
  export default {

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
      float: right;
      margin-right: 20px;
      a {
        color: #fff;
      }
    }
  }
</style>