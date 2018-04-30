<template>
  <div class="s-index addVisitor">
    <div class="main-title clearfix">
      <div><span class="click" @click="toStudents">来访人员管理</span> > 添加来访信息</div>
      <div class="main">
        <div class="sub-title clearfix">
          <span class="pull-left">添加来访信息</span>
        </div>
        <el-form ref="mes" :model="mes" label-width="100px" class="form">
          <el-form-item label="宿舍楼" prop="apartment" :rules="{
            required: true, message: '请选择宿舍楼', trigger: 'change'
          }">
            <el-select v-model="mes.apartment" placeholder="请选择">
              <el-option v-for="(x,index) in apartmentArr" :key="index" :label="x.apartment" :value="x.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="来访人姓名" prop="visitorName" :rules="{
            required: true, message: '来访人姓名', trigger: 'blur'
          }"> 
            <el-input v-model="mes.visitorName" placeholder="来访人姓名" style="width: 600px;"></el-input>
          </el-form-item>
          <el-form-item label="来访人身份" prop="visitorType" :rules="{
            required: true, message: '来访人身份不能为空', trigger: 'change'
          }">
            <el-select v-model="mes.visitorType" placeholder="请选择来访人身份">
              <el-option label="学生家长" value="1"></el-option>
              <el-option label="导员" value="2"></el-option>
              <el-option label="学校主任" value="3"></el-option>
              <el-option label="维修人员" value="4"></el-option>
              <el-option label="其他" value="5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="来访事项" prop="matter" :rules="{
            required: true, message: '来访事项不能为空', trigger: 'blur'
          }">
            <el-input
              type="textarea"
              :rows="5"
              placeholder="请输入内容"
              v-model="mes.matter">
            </el-input>
          </el-form-item>
          <el-form-item label="来访日期" prop="visitorDate" :rules="{
            required: true, message: '请选择来访日期', trigger: 'change'
          }">
            <el-date-picker
              width="600px"
              v-model="mes.visitorDate"
              type="datetime"
              placeholder="选择日期时间">
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
        mes: {
          apartment: '',
          visitorName: '',
          visitorType: '',
          matter: '',
          visitorDate: ''
        },
        apartmentArr: []
      };
    },
    methods: {
      toStudents () {
        this.$router.push({name: 'visitor', params: {select: true}});
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
          apartmentId: this.mes.apartment,
          visitorName: this.mes.visitorName,
          visitorType: this.mes.visitorType,
          matter: this.mes.matter,
          visitorDate: this.mes.visitorDate == '' ? '' : this.mes.visitorDate.getTime()
        };
        this.$post(host + 'addVisitor', params).then(res => {
          if (res == 1) {
            this.$message.success('信息添加成功');
            this.toStudents();
          } else if (res == 0) {
            this.$message.error('信息添加失败');
          }
        });
      }
    },
    created () {
      // 发请求，拿所有宿舍楼名称
      this.$post(host + 'getApartment').then(res => {
        this.apartmentArr = res;
      });
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
