<template>
  <div class="s-index">
    <div class="main-title">房间信息管理</div>
    <div class="main select">
      <div class="sub-title clearfix">
        <span class="pull-left">房间信息查询</span>
        <el-button type="primary" class="pull-right relative t--7" @click="$router.push('/addStudents')">添加房间</el-button>
      </div>
      <el-row :gutter="10">
        <el-col :span="8">
          <div class="label">宿舍楼</div>
          <el-select v-model="sex" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <div class="label">房间号</div>
          <el-input v-model="sno" placeholder="房间号"></el-input>
        </el-col>
        <el-col :span="8">
          <div class="label">房间类型</div>
            <el-select v-model="sex" placeholder="请选择">
              <el-option label="全部" value=""></el-option>
              <el-option label="单人间" value="单人间"></el-option>
              <el-option label="2人间" value="2人间"></el-option>
              <el-option label="4人间" value="4人间"></el-option>
              <el-option label="6人间" value="6人间"></el-option>
              <el-option label="8人间" value="8人间"></el-option>
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
          prop="date"
          label="宿舍楼"
          width="180">
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="房间号"
          width="180">
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="房间类型"
          width="180">
          <template slot-scope="scope">
            <span>4人间</span>
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
        this.tableData = [{
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: 1,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          id: 1,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          id: 1,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          id: 1,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          id: 1,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          id: 1,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          id: 1,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          id: 1,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          id: 1,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          id: 1,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          id: 1,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          id: 1,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          id: 1,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          id: 1,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          id: 1,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }];
      }
    },
    created () {
      if (this.$route.params.select) {
        this.select();
      }
      this.$store.commit('changeActive', '2');
    }
  }
</script>
<style lang="scss">

</style>