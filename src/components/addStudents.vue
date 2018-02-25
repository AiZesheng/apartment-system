<template>
  <div class="s-index">
    <div class="main-title clearfix">
      <div><span class="click" @click="toStudents">学生信息管理</span> > 添加学生</div>
      <div class="main">
        <div class="sub-title clearfix">
          <span class="pull-left">添加学生</span>
        </div>
        <el-form ref="mes" :model="mes" label-width="80px" class="form">
          <el-form-item label="学号">
            <el-input v-model="mes.sno" placeholder="请输入学号"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="mes.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="mes.sex" placeholder="请选择活动区域">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学院">
            <el-select v-model="mes.college" placeholder="请选择">
              <el-option label="软件学院" value="软件学院"></el-option>
              <el-option label="计算机科学与技术学院" value="计算机科学与技术学院"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="政治面貌">
            <el-select v-model="mes.political" placeholder="请选择">
              <el-option label="团员" value="团员"></el-option>
              <el-option label="党员" value="党员"></el-option>
              <el-option label="群众" value="群众"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="籍贯">
            <el-input v-model="mes.nativePlace" placeholder="请输入籍贯"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="mes.phone" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary">确 定</el-button>
            <el-button @click="toStudents">取 消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        mes: {
          sno: '',
          name: '',
          sex: '男',
          college: '',
          nativePlace: '',
          political: '',
          phone: ''
        }
      };
    },
    methods: {
      toStudents () {
        this.$router.push({name: 'students', params: {select: true}});
      }
    }
  }
</script>
<style lang="scss">
  .form {
    margin-top: 20px;
    .el-input {
      width: 90%;
    }
    .el-select {
      width: 600px;
      .el-input {
        width: 100%;
      }
    }
    .el-button {
      padding: 12px 40px;
    }
  }
</style>
