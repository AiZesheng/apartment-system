<template>
  <div class="s-index">
    <div class="main-title">学生信息管理</div>
    <div class="main select">
      <div class="sub-title clearfix">
        <span class="pull-left">学生信息查询</span>
        <el-button type="primary" class="pull-right relative t--7" @click="$router.push('/addStudents')">添加学生</el-button>
      </div>
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
      <div class="result-num">共查询到{{total}}条结果</div>
      <el-table
        :data="tableData"
        border
        stripe
        style="width: 100%">
        <el-table-column
          align="center"
          prop="name"
          label="姓名"
          width="100">
        </el-table-column>
        <el-table-column
          align="center"
          prop="sex"
          label="性别"
          width="80">
        </el-table-column>
        <el-table-column
          align="center"
          prop="sno"
          width="120"
          label="学号">
        </el-table-column>
        <el-table-column
          align="center"
          prop="college"
          label="学院">
        </el-table-column>
        <el-table-column
          align="center"
          prop="nativePlace"
          label="籍贯">
        </el-table-column>
        <el-table-column
          align="center"
          prop="phone"
          width="200"
          label="手机号">
        </el-table-column>
        <el-table-column
          align="center"
          label="所在寝室">
        </el-table-column>
        <el-table-column
          align="center"
          width="100"
          label="操作">
          <template slot-scope="scope">
            <span class="click" @click="exitStudent(scope.row.id)">编辑</span>
            <span class="click" @click="showDeleteDialog(scope.row.id)">删除</span>
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
      <el-dialog
        :visible.sync="deleteDialog"
        center
        width="30%">
        <div class="dialog-title">确认删除本条数据？</div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="makeDelete">确 定</el-button>
          <el-button @click="deleteDialog = false">取 消</el-button>
        </span>
      </el-dialog>
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
        tableData: [],
        total: 0,
        id: '',
        deleteDialog: false
      };
    },
    methods: {
      handleCurrentChange (val) {
        this.getResult(val);
      },
      exitStudent (id) {
        this.$router.push('/editStudents/' + id);
      },
      showDeleteDialog (id) {
        this.id = id;
        this.deleteDialog = true;
      },
      makeDelete () {
        this.deleteDialog = false;
        this.$post(host + 'deleteStudent', {id: this.id}).then(res => {
          if (res) {
            this.$message.success('删除成功');
            this.getResult(1);
          }
        });
      },
      getResult (val) {
        const params = {
          sname: this.sname,
          sno: this.sno,
          sex: this.sex,
          college: this.college,
          phone: this.phone
        };
        this.$post(host + 'getStudents', params).then(res => {
          if (res == '啥也没有') {
            this.$message.error('啥也没有');
          } else {
            this.tableData = res.data;
            this.total = res.total;
          }
        });
      },
      select () {
        this.getResult(1);
      }
    },
    created () {
      if (this.$route.params.select) {
        this.select();
      }
      this.$store.commit('changeActive', '1');
    }
  }
</script>
<style lang="scss">

</style>