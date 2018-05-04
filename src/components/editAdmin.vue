<template>
  <div class="s-index addVisitor">
    <div class="main-title clearfix">
      <div><span class="click" @click="toStudents">宿舍管理员信息管理</span> > 编辑宿舍管理员信息</div>
      <div class="main">
        <div class="sub-title clearfix">
          <span class="pull-left">编辑宿舍管理员信息</span>
        </div>
        <el-form ref="mes" :model="mes" label-width="100px" class="form">
          <el-form-item label="宿舍楼" prop="apartment" :rules="{
            required: true, message: '请选择宿舍楼', trigger: 'change'
          }">
            <el-select v-model="mes.apartment" placeholder="请选择">
              <el-option v-for="(x,index) in apartmentArr" :key="index" :label="x.apartment" :value="x.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="宿管姓名" prop="name" :rules="{
            required: true, message: '宿舍管理员姓名不能为空', trigger: 'blur'
          }"> 
            <el-input v-model="mes.name" placeholder="宿管姓名" style="width: 600px;"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex" :rules="{
            required: true, message: '性别不能为空', trigger: 'change'
          }">
            <el-select v-model="mes.sex" placeholder="请选择性别">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="职务" prop="job" :rules="{
            required: true, message: '职务不能为空', trigger: 'blur'
          }">
            <el-select v-model="mes.job" placeholder="请选择">
              <el-option label="宿舍楼长" value="宿舍楼长"></el-option>
              <el-option label="宿舍阿姨" value="宿舍阿姨"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="身份证号" prop="idNumber" :rules="{
            required: true, message: '身份证号不能为空', trigger: 'blur'
          }">
            <el-input v-model="mes.idNumber" placeholder="身份证号" style="width: 600px;"></el-input>
          </el-form-item>
          <el-form-item label="入职日期" prop="time" :rules="{
            required: true, message: '请输入职日期', trigger: 'blur'
          }">
            <el-date-picker
              width="600px"
              v-model="mes.time"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
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
        id: '',
        mes: {
          apartment: '',
          name: '',
          sex: '',
          job: '',
          time: '',
          idNumber: ''
        },
        apartmentArr: []
      };
    },
    methods: {
      toStudents () {
        this.$router.push({name: 'admin', params: {select: true}});
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
          id: this.id,
          apartmentId: this.mes.apartment,
          name: this.mes.name,
          sex: this.mes.sex,
          job: this.mes.job,
          idNumber: this.mes.idNumber,
          time: !this.mes.time ? '' : this.mes.time.getTime()
        };
        this.$post(host + 'editAdmin', params).then(res => {
          if (res == 1) {
            this.$message.success('信息修改成功');
            this.toStudents();
          } else if (res == 0) {
            this.$message.error('信息修改失败');
          }
        });
      }
    },
    created () {
      // 发请求，拿所有宿舍楼名称
      this.$post(host + 'getApartment').then(res => {
        this.apartmentArr = res;
      });
      const obj = this.$route.query;
      this.id = obj.id;
      this.mes.apartment = obj.apartmentId;
      this.mes.job = obj.job;
      this.mes.name = obj.name;
      this.mes.time = new Date(parseInt(obj.time));
      this.mes.sex = obj.sex;
      this.mes.idNumber = obj.idNumber;
    }
  }
</script>
<style lang="scss">
  .addVisitor {
    .el-textarea {
      width: 600px;
    }
    .el-date-editor {
      width: 600px!important;
    }
  }
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
