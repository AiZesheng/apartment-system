<template>
  <div class="s-index">
    <div class="main-title">房间信息管理</div>
    <div class="main select">
      <div class="sub-title clearfix">
        <span class="pull-left">房间信息查询</span>
        <el-button type="primary" class="pull-right relative t--7" @click="$router.push('/addRooms')">添加房间</el-button>
      </div>
      <el-row :gutter="10">
        <el-col :span="8">
          <div class="label">宿舍楼</div>
          <el-select v-model="apartment" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="(x,index) in apartmentArr" :key="index" :label="x.apartment" :value="x.id"></el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <div class="label">房间号</div>
          <el-input v-model="sno" placeholder="房间号"></el-input>
        </el-col>
        <el-col :span="8">
          <div class="label">房间类型</div>
            <el-select v-model="roomType" placeholder="请选择">
              <el-option label="全部" value=""></el-option>
              <el-option label="单人间" value="1"></el-option>
              <el-option label="2人间" value="2"></el-option>
              <el-option label="4人间" value="4"></el-option>
              <el-option label="6人间" value="6"></el-option>
              <el-option label="8人间" value="8"></el-option>
            </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <div class="label">&nbsp;</div>
          <el-button type="primary" class="w-100" @click="select">查询</el-button>
        </el-col>
      </el-row>
      <div class="dash-line"></div>
      <div class="result-num">共查询到0条结果</div>
      <el-table
        :data="tableData"
        border
        stripe
        style="width: 100%">
        <el-table-column
          align="center"
          prop="apartment"
          label="宿舍楼"
          width="180">
        </el-table-column>
        <el-table-column
          align="center"
          prop="roomNo"
          label="房间号"
          width="180">
        </el-table-column>
        <el-table-column
          align="center"
          label="房间类型"
          width="180">
          <template slot-scope="scope">
            <span v-if="scope.row.roomType == 1">单人间</span>
            <span v-if="scope.row.roomType == 2">2人间</span>
            <span v-if="scope.row.roomType == 4">4人间</span>
            <span v-if="scope.row.roomType == 6">6人间</span>
            <span v-if="scope.row.roomType == 8">8人间</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="address"
          label="房间成员">
          <template slot-scope="scope">
            <span class="mr-20">张三</span>
            <span class="mr-20">李四</span>
            <span class="mr-20">王五</span>
            <span>赵六</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          width="100"
          label="操作">
          <template slot-scope="scope">
            <span class="click" @click="exitStudent(scope.row.id)">编辑</span>
            <span class="click">删除</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="oh mt-10">
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="10"
          layout="total, prev, pager, next"
          :total="40">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        sname: '',
        sno: '',
        sex: '',
        college: '',
        phone: '',
        apartment: '',
        apartmentArr: [],
        tableData: []
      };
    },
    methods: {
      handleCurrentChange (val) {
        console.log(val);
      },
      exitStudent (id) {
        this.$router.push('/editStudents/' + id);
      },
      select () {
        this.$post(host + 'getRooms').then(res => {
          this.tableData = res;
        });
      }
    },
    created () {
      if (this.$route.params.select) {
        this.select();
      }
      this.$store.commit('changeActive', '2');
      // 发请求，拿所有宿舍楼名称
      this.$post(host + 'getApartment').then(res => {
        this.apartmentArr = res;
      });
    }
  }
</script>
<style lang="scss">

</style>