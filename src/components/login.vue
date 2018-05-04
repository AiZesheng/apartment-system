<template>
  <div class="login">
    <h1>高校公寓化宿舍管理系统</h1>
    <div class="form">
      <div class="title">管理员登录</div>
      <el-form :model="mes" ref="mes" :rules="rules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="mes.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="mes.password" type="password" placeholder="请输入密码" @keyup.native="ok"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="w-100p mt-20" @click="submit">登录</el-button>
        </el-form-item>
        <span class="pull-right fz-12 click">没有帐号？立即注册</span>
      </el-form>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        mes: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: '用户名不能为空', trigger: 'change' }
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'change' }
          ]
        }
      }
    },
    methods: {
      submit () {
        this.$refs.mes.validate((valid) => {
          if (valid) {
            const params = {
              username: this.mes.username,
              password: this.mes.password
            };
            this.$post(host + 'login', params).then(res => {
              if (res == 0) {
                this.$message.error('用户名或密码输入错误');
              } else {
                sessionStorage.loginUser = JSON.stringify(res[0]);
                this.$router.push('/students');
              }
            });
          } else {
            // console.log('error submit!!');
            return false;
          }
        });
      },
      ok (e) {
        if (e.keyCode == 13) {
          this.submit();
        }
      }
    },
    created () {
      this.$store.commit('changeLoginState', true);
    },
    destroyed () {
      this.$store.commit('changeLoginState', false);
    }
  }
</script>
<style lang="scss" scoped>
  @import '../scss/base.scss';
  .login {
    height: 100%;
    background: $baseColor!important;
    h1 {
      text-align: center;
      color: #fff;
      padding: 100px 0 50px 0;
    }
    .form {
      border-radius: 5px;
      box-shadow: 0 0 10px #666;
      background: #fff;
      margin: 0 auto;
      width: 320px;
      padding: 45px 90px 45px 90px;
      border: 1px solid #ddd;
      .title {
        color: $baseColor;
        font-weight: bold;
        font-size: 28px;
        text-align: center;
        margin-bottom: 20px;
      }
    }
  }
</style>
