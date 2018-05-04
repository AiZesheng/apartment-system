<template>
  <div class="s-index">
    <div class="main-title">宿舍管理员信息管理</div>
    <div class="main select">
      <div class="sub-title clearfix">
        <span class="pull-left">宿舍管理员信息查询</span>
        <el-button type="primary" class="pull-right relative t--7" @click="$router.push('/addVisitor')">添加来访信息</el-button>
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
          <div class="label">来访人姓名</div>
          <el-input v-model="visitorName" placeholder="来访人姓名"></el-input>
        </el-col>
        <el-col :span="8">
          <div class="label">来访者身份</div>
            <el-select v-model="visitorType" placeholder="请选择">
              <el-option label="全部" value=""></el-option>
              <el-option label="学生家长" value="1"></el-option>
              <el-option label="导员" value="2"></el-option>
              <el-option label="学校主任" value="3"></el-option>
              <el-option label="维修人员" value="4"></el-option>
              <el-option label="其他" value="5"></el-option>
            </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <div class="label">来访日期</div>
          <el-date-picker
            v-model="visitorDate"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
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
          prop="apartment"
          label="宿舍楼"
          width="180">
        </el-table-column>
        <el-table-column
          align="center"
          prop="visitorName"
          label="来访人姓名"
          width="180">
        </el-table-column>
        <el-table-column
          align="center"
          label="来访人身份"
          width="180">
          <template slot-scope="scope">
            <span v-if="scope.row.visitorType == 1">学生家长</span>
            <span v-if="scope.row.visitorType == 2">导员</span>
            <span v-if="scope.row.visitorType == 3">学校主任</span>
            <span v-if="scope.row.visitorType == 4">维修人员</span>
            <span v-if="scope.row.visitorType == 5">其他</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="matter"
          label="来访事项">
        </el-table-column>
        <el-table-column
          align="center"
          label="来访日期"
          width="200">
          <template slot-scope="scope">
            <span>{{getLocalTime(scope.row.visitorTime)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          width="100"
          label="操作">
          <template slot-scope="scope">
            <span class="click" @click="edit(scope.row)">编辑</span>
            <span class="click" @click="showDeleteDialog(scope.row.id)">删除</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="oh mt-10">
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="10"
          layout="total, prev, pager, next"
          :total="total">
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
        apartment: '',
        apartmentArr: [],
        visitorName: '',
        visitorType: '',
        visitorDate: '',
        id: '',
        nowPage: 1,
        total: 0,
        deleteDialog: false,
        tableData: []
      };
    },
    methods: {
      handleCurrentChange (val) {
        this.nowPage = val;
        this.getResult(val);
      },
      showDeleteDialog (id) {
        this.id = id;
        this.deleteDialog = true;
      },
      select () {
        this.getResult(1);
      },
      makeDelete () {
        this.deleteDialog = false;
        this.$post(host + 'deleteVisitor', {id: this.id}).then(res => {
          if (res) {
            this.$message.success('删除成功');
            this.getResult(this.nowPage);
          }
        });
      },
      getResult (val) {
        const params = {
          apartmentId: this.apartment,
          visitorName: this.visitorName,
          visitorType: this.visitorType,
          visitorDate: !this.visitorDate ? '' : this.visitorDate.getTime(),
          pageNo: val,
          pageSize: 10
        };
        this.$post(host + 'getVisitor', params).then(res => {
          if (res == '啥也没有') {
            this.$message.error('啥也没有');
            this.tableData = [];
          } else {
            this.tableData = res.data;
            this.total = res.total;
          }
        });
      },
      edit (obj) {
        this.$router.push({
          path: '/editVisitor', 
          query: {
            visitorId: obj.id,
            apartmentId: obj.apartment_id,
            visitorName: obj.visitorName,
            visitorType: obj.visitorType,
            matter: obj.matter,
            visitorTime: obj.visitorTime
          }
        });
      },
      getLocalTime: function(nS,type){
        nS = parseInt(nS);
        var type = type || 'seconds';
        if (!nS || nS == 0) {
            return '----';
        }
        var date = new Date(nS);
        var seperator1 = "-";
        var seperator2 = ":";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate;
        if (type === 'seconds'){
            currentdate = year + seperator1 + month + seperator1 + strDate
                    + " " + (date.getHours() <= 9 ? '0'+date.getHours() : date.getHours()) + seperator2 + (date.getMinutes() <= 9 ? '0' + date.getMinutes() : date.getMinutes()) + seperator2 + (date.getSeconds() <= 9 ? '0' + date.getSeconds() : date.getSeconds())
        }
        if (type === 'day'){
            currentdate = year + seperator1 + month + seperator1 + strDate
        }
        return currentdate;
      },
    },
    created () {
      if (this.$route.params.select) {
        this.select();
      }
      this.$store.commit('changeActive', '4');
      // 发请求，拿所有宿舍楼名称
      this.$post(host + 'getApartment').then(res => {
        this.apartmentArr = res;
      });
    }
  }
</script>
<style lang="scss">

</style>