<template>
  <div class="s-index">
    <div class="main-title clearfix">
      <div><span class="click" @click="toStudents">学生信息管理</span> > 添加学生</div>
      <div class="main">
        <div class="sub-title clearfix">
          <span class="pull-left">添加学生</span>
        </div>
        <el-form ref="mes" :model="mes" label-width="100px" class="form">
          <el-form-item label="学号" prop="sno" :rules="{
            validator: onlyOne, trigger: 'blur'
          }">
            <el-input v-model="mes.sno" placeholder="请输入学号"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name" :rules="{
            required: true, message: '姓名不能为空', trigger: 'blur'
          }">
            <el-input v-model="mes.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex" :rules="{
            required: true, message: '性别不能为空', trigger: 'change'
          }">
            <el-select v-model="mes.sex" placeholder="请选择性别">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学院" prop="college" :rules="{
            required: true, message: '学院不能为空', trigger: 'change'
          }">
            <el-select v-model="mes.college" placeholder="请选择">
              <el-option label="软件学院" value="软件学院"></el-option>
              <el-option label="计算机科学与技术学院" value="计算机科学与技术学院"></el-option>
              <el-option label="艺术学院" value="艺术学院"></el-option>
              <el-option label="电子工程学院" value="电子工程学院"></el-option>
              <el-option label="生命科学学院" value="生命科学学院"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="政治面貌" prop="political" :rules="{
            required: true, message: '政治面貌不能为空', trigger: 'change'
          }">
            <el-select v-model="mes.political" placeholder="请选择">
              <el-option label="团员" value="团员"></el-option>
              <el-option label="党员" value="党员"></el-option>
              <el-option label="群众" value="群众"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="籍贯"  prop="nativePlace" :rules="{
            required: true, message: '籍贯不能为空', trigger: 'blur'
          }">
            <el-input v-model="mes.nativePlace" placeholder="请输入籍贯"></el-input>
          </el-form-item>
          <el-form-item label="手机号"  prop="phone" :rules="{
            required: true, message: '手机号不能为空', trigger: 'blur'
          }">
            <el-input v-model="mes.phone" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="身份证号"  prop="idNumber" :rules="{
            required: true, message: '身份证号不能为空', trigger: 'blur'
          }">
            <el-input v-model="mes.idNumber" placeholder="请输入身份证号"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" @click="submitForm('mes')">确 定</el-button>
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
          phone: '',
          idNumber: ''
        }
      };
    },
    methods: {
      toStudents () {
        this.$router.push({name: 'students', params: {select: true}});
      },
      onlyOne (rule, value, callback) {
        if (value == '') {
          callback(new Error('学号不能为空'));
        }
        this.$post(host + 'get_by_sno', {sno: value}).then(res => {
          if (res == 1) {
            callback(new Error('该学号已存在!'));
          } else {
            callback();
          }
        });
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.makeAdd();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      makeAdd () {
        const params = {
          sno: this.mes.sno,
          name: this.mes.name,
          sex: this.mes.sex,
          college: this.mes.college,
          nativePlace: this.mes.nativePlace,
          political: this.mes.political,
          phone: this.mes.phone,
          idNumber: this.mes.idNumber
        };
        this.$post(host + 'addStudents', params).then(res => {
          if (res == 1) {
            this.$message.success('学生信息添加成功');
            this.toStudents();
          } else if (res == 0) {
            this.$message.error('学生信息添加失败');
          }
        });
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
