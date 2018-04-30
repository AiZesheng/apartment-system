<template>
	<div id="menu">
    <el-menu
      :default-active="$store.state.active + ''"
      class="el-menu-vertical-demo"
      background-color="#373b46"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1" @click="$router.push('/students')">
        <span slot="title">学生信息管理</span>
      </el-menu-item>
      <el-menu-item index="2" @click="$router.push('/rooms')">
        <span slot="title">房间管理</span>
      </el-menu-item>
      <el-menu-item index="3" @click="$router.push('/apartment')">
        <span slot="title">宿舍楼管理</span>
      </el-menu-item>
      <el-menu-item index="4" @click="$router.push('/visitor')">
        <span slot="title">来访人员管理</span>
      </el-menu-item>
      <el-menu-item index="5">
        <span slot="title">宿舍管理员信息管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
  export default {

  }
</script>
<style lang="scss">

</style>
