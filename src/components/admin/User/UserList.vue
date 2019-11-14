<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> {{$route.meta.title}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button type="primary"
                   icon="el-icon-delete"
                   class="handle-del mr10"
                   :disabled="isBtnDisable"
                   @click="delAllSelection">批量删除</el-button>

        <el-input v-model="query.search"
                  placeholder="请输入手机号或用户昵称"
                  style="width:200px"
                  class="handle-input mr10"></el-input>
        <el-button type="primary"
                   icon="el-icon-search"
                   @click="handleSearch">搜索</el-button>
        <el-input v-model="name"
                  style="margin-left:10px;width:200px"
                  placeholder="请输入需要添加的栏目名"
                  class="handle-input mr10"></el-input>
        <!-- icon="el-icon-search" -->
        <el-button type="primary"
                   @click="addColumn">点击添加栏目</el-button>

        <el-table :data="tableData"
                  v-loading="loading"
                  border
                  class="table"
                  ref="multipleTable"
                  header-cell-class-name="table-header"
                  @selection-change="handleSelectionChange">
          <el-table-column type="selection"
                           width="55"
                           align="center"></el-table-column>
          <el-table-column prop="id"
                           label="ID"
                           width="55"
                           align="center"></el-table-column>
          <el-table-column prop="user_nickname"
                           label="用户名"></el-table-column>

          </el-table-column>
          <el-table-column label="头像(查看大图)"
                           align="center">
            <template slot-scope="scope">
              <el-image class="table-td-thumb"
                        :src="'http://www.vuecli.com'+scope.row.user_img"
                        :preview-src-list="['http://www.vuecli.com'+scope.row.user_img]"></el-image>
            </template>
          </el-table-column>

          <el-table-column prop="user_mailbox"
                           label="邮箱"></el-table-column>
          <el-table-column prop="user_phone"
                           label="电话号码"></el-table-column>

          <el-table-column prop="user_reg_time"
                           label="用户注册"></el-table-column>

          <el-table-column prop="user_birthday"
                           label="用户生日"></el-table-column>
          <el-table-column prop="user_integral"
                           label="用户积分"></el-table-column>
          <el-table-column prop="user_vip"
                           label="用户等级"></el-table-column>
          <el-table-column prop="user_adress"
                           label="地址"></el-table-column>
          <el-table-column prop="user_sex"
                           label="用户性别"></el-table-column>

          <el-table-column prop="user_status"
                           label="状态"></el-table-column>
          <!-- <el-table-column label="状态"
                         align="user_status">
          <template slot-scope="scope">
            <el-tag :type="scope.row.state==='成功'?'success':(scope.row.state==='失败'?'danger':'')">{{scope.row.state}}</el-tag>
          </template>
        </el-table-column> -->
          <el-table-column label="操作"
                           width="180"
                           align="center">
            <template slot-scope="scope">

              <el-button type="text"
                         icon="el-icon-edit"
                         @click="userEdit(scope.row.id)">编辑</el-button>

              <!-- <el-button type="text"
                         icon="el-icon-edit"
                         @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
              <!-- <el-button type="text"
                       icon="el-icon-delete"
                       class="red"
                       @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->

              <el-button type="text"
                         icon="el-icon-delete"
                         class="red"
                         @click="delAllSelection([scope.row])">删除</el-button>

            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination background
                         layout="total, prev, pager, next"
                         :current-page="query.page"
                         :page-size="query.page_size"
                         :total="count"
                         @current-change="handlePageChange"></el-pagination>
        </div>
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑"
               :visible.sync="editVisible"
               width="30%">
      <el-form ref="form"
               :model="form"
               label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="form.user_nickname"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import interList from '@/common/mixins/list'

import { UserList, UserDel } from '../../../api/index';
import { ColumnSave, ColumnDel, ColumnList } from '../../../api/index';
export default {
  name: 'UserList',
  data () {
    return {
      name: '',  //栏目名
      tableData: [], //当前表数据
      editVisible: false, //弹框删除
      form: {  //存放修改的数据 
        user_nickname: '',
        id: ''
      },
    };
  },
  mixins: [interList],
  created () {
    this.getData();
  },
  methods: {
    //用户跳转
    userEdit (id) {
      this.$router.push({ //核心语句
        path: '/UserAdd', //跳转的路径
        query: { //路由传参时push和query搭配使用 ，作用时传递参数
          id: id,
        }
      })
    },
    addColumn () {
      ColumnSave({ name: this.name }).then(res => {
        console.log('res===', res)
        if (res == undefined) {
          this.getData()
        } else {
          this.$message.success('操作成功!')
          this.getData()
        }
      })
      this.name = ""
    },
    postColumnSave () {
      ColumnSave(this.form).then(res => {
        this.$message.success('操作成功!')
        //成功后，清除数据
        this.form = {
          user_nickname: '',
          id: ''
        }
      })
      this.getData()
    },
    getData () {
      let _this = this
      this.loading = true
      UserList(this.query).then(res => {
        console.log('res', res);
        this.tableData = res.list;
        res.list.forEach((item) => {
          item.user_sex = item.user_sex == 0 ? '男' : '女'
          item.user_status = item.user_status == 1 ? '正常' : '已禁用'
        })
        this.count = res.page_info.count
        this.loading = false

      }).catch(function (error) {
        console.log('发生错误！', error);
        _this.loading = false
      })
    },
    //单选多选都可删除
    delAllSelection (row) {
      //通过点击删除进来的 传入的参数必须为一个数组
      if (row) {
        this.DelId = [row[0].id]
      }
      // 二次确认删除
      this.$confirm(`确定要删除ID序号为[${this.DelId}]`, '提示', {
        type: 'warning'
      })
        .then(() => {
          this.loading = true
          UserDel({ id: this.DelId }).then(res => {
            this.$message.success('删除成功');
            this.getData()
          })
        })
        .catch(() => {
          this.loading = false
        });
      this.multipleSelection = [];

    },
  }
};
</script>

<style scoped>
/* @import "./../index.css"; */
/* @import '../../../assets/css/user_index.css'; */
@import '~@/assets/css/user_index.css';
</style>
