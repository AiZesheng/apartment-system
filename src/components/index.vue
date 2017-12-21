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
  import {getAll} from '../services/index.js';
  import axios from 'axios'
  export default {
  	async mounted () {
      let res = await getAll();
      console.log(res.data);
      this.$store.commit('change', '哈哈');
      console.log(this.$store.state.name);
  	},
    async created () {
      let res = await axios.get('http://localhost/aaa/aaa.php');
      console.log(res)
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