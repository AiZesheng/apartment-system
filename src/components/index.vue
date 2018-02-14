<template>
  <div id="index">
    <span>index</span>
    <ul>
      <li>1111</li>
      <li>1111</li>
      <li>1111</li>
      <li><a href="">aaa</a></li>
    </ul>
  </div>
</template>
<script>
  export default {
    created () {
      // console.log(this.$store.state.loginUser);
      // if (!this.$store.state.loginUser) {
      //   this.$router.push('/login');
      // }
    }
  }
</script>
<style lang="scss">
  #index {
    span {
      color: #f00;
    }
  }
</style>