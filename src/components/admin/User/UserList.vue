<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 基础表格--测试
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button type="primary"
                   icon="el-icon-delete"
                   class="handle-del mr10"
                   @click="delAllSelection">批量删除</el-button>
        <el-select v-model="query.address"
                   placeholder="地址"
                   class="handle-select mr10">
          <el-option key="1"
                     label="广东省"
                     value="广东省"></el-option>
          <el-option key="2"
                     label="湖南省"
                     value="湖南省"></el-option>
        </el-select>
        <el-input v-model="query.NameOrPhone"
                  placeholder="用户请输入用户昵称或者电话号码"
                  class="handle-input mr10"></el-input>
        <el-button type="primary"
                   icon="el-icon-search"
                   @click="handleSearch">搜索</el-button>
      </div>
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
                       @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="text"
                       icon="el-icon-delete"
                       class="red"
                       @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑"
               :visible.sync="editVisible"
               width="30%">
      <el-form ref="form"
               :model="form"
               label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address"></el-input>
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
import { UserList, UserDel } from '../../../api/index';
export default {
  name: 'basetable',
  data () {
    return {
      loading: true,
      query: {
        address: '',
        name: '',
        page: 1,
        page_size: 10
        /*
        all_page: 14
count: 139
page: 1
page_size: 10
        */
      },
      tableData: [],
      multipleSelection: [],
      delList: [],
      editVisible: false,
      count: 0,
      form: {},
      idx: -1,
      id: -1
    };
  },
  created () {
    this.getData();
  },
  methods: {
    // 获取 easy-mock 的模拟数据
    getData () {
      this.loading = true
      UserList(this.query).then(res => {
        console.log(res);
        this.tableData = res.list;
        res.list.forEach((item) => {
          item.user_sex = item.user_sex == 0 ? '男' : '女'
          item.user_status = item.user_status == 1 ? '正常' : '女'
        })
        this.count = res.page_info.count
        this.loading = false

        //this.count = res.count || 50;
      });
    },
    // 触发搜索按钮
    handleSearch () {
      this.$set(this.query, 'page', 1);
      this.getData();
    },
    // 删除操作
    handleDelete (index, row) {
      // 二次确认删除
      this.$confirm(`确定要删除ID序号为[${row.id}]的用户吗？`, '提示', {

        type: 'warning'
      })
        .then(() => {
          //这里去删除
          this.loading = true
          UserDel({ 'id[0]': row.id }).then(res => {
            this.$message.success('删除成功');
            this.getData()

          })
          //  UserDel(this)

        })
        .catch(() => {
          this.loading = false

        });
    },
    // 多选操作
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    delAllSelection () {

      const length = this.multipleSelection.length;
      let str = '';
      this.delList = this.delList.concat(this.multipleSelection);
      let id = {}
      let DelIdView = []
      for (let i = 0; i < length; i++) {
        //获取用户名
        id[`id[${i}]`] = this.multipleSelection[i].id   //难点，这里可以发一篇wenzhang
        DelIdView.push(this.multipleSelection[i].id)
      }

      // 二次确认删除
      this.$confirm(`确定要删除ID序号为[${DelIdView}]的用户吗？`, '提示', {
        type: 'warning'
      })
        .then(() => {
          //这里去删除
          this.loading = true
          UserDel(id).then(res => {
            this.$message.success('删除成功');
            this.getData()
          })
          //  UserDel(this)

        })
        .catch(() => {
          this.loading = false

        });
      this.multipleSelection = [];



    },
    // 编辑操作
    handleEdit (index, row) {
      this.idx = index;
      this.form = row;
      this.editVisible = true;
    },
    // 保存编辑
    saveEdit () {
      this.editVisible = false;
      this.$message.success(`修改第 ${this.idx + 1} 行成功`);
      this.$set(this.tableData, this.idx, this.form);
    },
    // 分页导航
    handlePageChange (val) {
      this.$set(this.query, 'page', val);
      this.getData();
    }
  }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
