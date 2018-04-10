<template>
  <div class="s-index">
    <div class="main-title clearfix">
      <div><span class="click" @click="toRooms">房间信息管理</span> > 添加房间</div>
      <div class="main">
        <div class="sub-title clearfix">
          <span class="pull-left">添加房间</span>
        </div>
        <el-form ref="mes" :model="mes" label-width="100px" class="form">
          <el-form-item label="宿舍楼" prop="apartment" :rules="{
            required: true, message: '请选择宿舍楼', trigger: 'change'
          }">
            <el-select v-model="mes.apartment" placeholder="请选择">
              <el-option v-for="(x,index) in apartmentArr" :key="index" :label="x.apartment" :value="x.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="房间号" prop="roomNo" :rules="{
            required: true, message: '请输入房间号', trigger: 'change'
          }"> 
            <el-input v-model="mes.roomNo" placeholder="请输入房间号" style="width: 600px;"></el-input>
          </el-form-item>
          <el-form-item label="房间类型" prop="roomType" :rules="{
            required: true, message: '请选择房间类型', trigger: 'change'
          }">
            <el-select v-model="mes.roomType" placeholder="请选择">
              <el-option label="单人间" value="1"></el-option>
              <el-option label="2人间" value="2"></el-option>
              <el-option label="4人间" value="4"></el-option>
              <el-option label="6人间" value="6"></el-option>
              <el-option label="8人间" value="8"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" @click="submitForm('mes')">确 定</el-button>
            <el-button @click="toRooms">取 消</el-button>
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
          roomNo: '',
          roomType: ''
        },
        apartmentArr: []
      };
    },
    methods: {
      toRooms () {
        this.$router.push({name: 'rooms', params: {select: true}});
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
          roomNo: this.mes.roomNo,
          roomType: this.mes.roomType
        };
        this.$post(host + 'get_by_apartmentId_roomNo', params).then(res => {
          if (res == 1) {
            this.$message.error('该房间已存在');
            return false;
          } else {
            this.addRoom();
          }
        });
      },
      addRoom () {
        const params = {
          apartmentId: this.mes.apartment,
          roomNo: this.mes.roomNo,
          roomType: this.mes.roomType
        };
        // 发请求 添加房间
        this.$post(host + 'addRoom', params).then(res => {
          if (res) {
            this.$message.success('添加成功');
            this.toRooms();
          }
        });
      }
    },
    created () {
      this.$store.commit('changeActive', '2');
      // 发请求，拿所有宿舍楼名称
      this.$post(host + 'getApartment').then(res => {
        this.apartmentArr = res;
      });
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
