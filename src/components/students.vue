<template>
  <div class="s-index">
    <div class="main-title clearfix">
      <div class="pull-left">学生信息管理</div>
      <el-button type="primary" size="small" class="pull-right relative t-4">添加学生</el-button>
    </div>
    <div class="main">
      <div class="sub-title">学生信息查询</div>
      <el-row :gutter="10">
        <el-col :span="8">
          <div class="label">学生姓名</div>
          <el-input v-model="sname" placeholder="请输入学生姓名"></el-input>
        </el-col>
        <el-col :span="8">
          <div class="label">学号</div>
          <el-input v-model="sno" placeholder="请输入学号"></el-input>
        </el-col>
        <el-col :span="8">
          <div class="label">性别</div>
          <el-select v-model="sex" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <div class="label">学院</div>
          <el-select v-model="college" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="软件学院" value="软件学院"></el-option>
            <el-option label="计算机科学与技术学院" value="计算机科学与技术学院"></el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <div class="label">手机号</div>
          <el-input v-model="phone" placeholder="请输入手机号"></el-input>
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
          prop="date"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="性别"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="学号">
        </el-table-column>
        <el-table-column
          prop="address"
          label="学院">
        </el-table-column>
        <el-table-column
          prop="address"
          label="手机号">
        </el-table-column>
        <el-table-column
          width="100"
          label="操作">
          <template slot-scope="scope">
            <span class="click">编辑</span>
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
        tableData: []
      };
    },
    methods: {
      handleCurrentChange (val) {
        console.log(val);
      },
      select () {
        this.tableData = [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }];
      }
    },
    created () {
      this.$store.commit('changeActive', '1');
    }
  }
</script>
<style lang="scss">

</style>