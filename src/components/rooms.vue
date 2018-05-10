<template>
  <div class="s-index">
    <div class="main-title">房间信息管理</div>
    <div class="main select">
      <div class="sub-title clearfix">
        <span class="pull-left">房间信息查询</span>
        <el-button type="primary" class="pull-right relative t--7" @click="$router.push('/addRooms')">添加房间</el-button>
        <el-button type="primary" class="pull-right relative t--7 mr-10" @click="addApartmentDialog = true">添加宿舍楼</el-button>
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
          <el-input v-model="roomNo" placeholder="房间号"></el-input>
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
            <span class="mr-20" v-for="x in scope.row.name">{{x}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          width="100"
          label="操作">
          <template slot-scope="scope">
            <span class="click" v-if="scope.row.name.length != 0" @click="roomDetail(scope.row)">查看</span>
            <span class="click" v-if="scope.row.name.length == 0" @click="editRooms(scope.row)">编辑</span>
            <span class="click" v-if="scope.row.name.length == 0" @click="showDeleteDialog(scope.row.id)">删除</span>
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
      <el-dialog
        :visible.sync="addApartmentDialog"
        center
        width="30%">
        <div class="dialog-title">添加宿舍楼</div>
        <el-form :model="mes" ref="mes" class="mt-40">
          <el-form-item label="宿舍楼名称：">
            <el-input v-model="mes.apartmentName" placeholder="请输入宿舍楼名称"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="addApartment">确 定</el-button>
          <el-button @click="addApartmentDialog = false">取 消</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        mes: {
          apartmentName: ''
        },
        roomNo: '',
        roomType: '',
        apartment: '',
        apartmentArr: [],
        tableData: [],
        total: 0,
        deleteDialog: false,
        id: '',
        addApartmentDialog: false,
        nowPage: 1
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
      addApartment () {
        this.addApartmentDialog = false;
        this.$post(host + 'addApartment', {apartment: this.mes.apartmentName}).then(res => {
          console.log(res)
          if (res == 1) {
            this.$message.success('添加成功');
            // 发请求，拿所有宿舍楼名称
            this.$post(host + 'getApartment').then(res => {
              this.apartmentArr = res;
            });
          } else {
            this.$message.error('添加失败');
          }
        });
      },
      makeDelete () {
        this.deleteDialog = false;
        this.$post(host + 'deleteRoom', {id: this.id}).then(res => {
          if (res) {
            this.$message.success('删除成功');
            this.getResult(this.nowPage);
          }
        });
      },
      getResult (val) {
        const params = {
          apartment: this.apartment,
          roomType: this.roomType,
          roomNo: this.roomNo
        };
        this.$post(host + 'getRooms', params).then(res => {
          let arr = [];
          res.map(item => {
            let i = this.findObjVal(item.id, arr);
            if (i == -1) {
              let str = item.name;
              if (str) {
                item.name = [];
                item.name.push(str);
              } else {
                item.name = [];
              }
              arr.push(item);
            } else {
              if (!Array.isArray(arr[i].name)) {
                let str = arr[i].name;
                arr[i].name = [];
                arr[i].name.push(str);
              } else {
                arr[i].name.push(item.name);
              }
            }
          });
          val = (val - 1) * 10;
          this.tableData = arr.slice(val, val+10);
          this.total = arr.length;
        });
      },
      editRooms (obj) {
        this.$router.push({
          path: '/editRooms', 
          query: {
            roomId: obj.id,
            apartmentId: obj.apartment_id,
            roomNo: obj.roomNo,
            roomType: obj.roomType,
            name: obj.name
          }
        });
      },
      roomDetail (obj) {
        this.$router.push({
          path: '/roomDetail', 
          query: {
            roomId: obj.id,
            apartmentId: obj.apartment_id,
            roomNo: obj.roomNo,
            roomType: obj.roomType,
            name: obj.name
          }
        });
      },
      select () {
        this.getResult(1);
      },
      findObjVal (val, arr) {
        var i = 0;
        for (i = 0; i < arr.length; i++) {
          if (val == arr[i].id) {
            break;
          }
        }
        if (i == arr.length) { // 没找到
          return -1;
        } else {
          return i;
        }
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