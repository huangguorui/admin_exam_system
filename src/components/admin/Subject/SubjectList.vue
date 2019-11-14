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
        <!-- <el-select v-model="query.address"
                   placeholder="地址"
                   class="handle-select mr10">
          <el-option key="1"
                     label="广东省"
                     value="广东省"></el-option>
          <el-option key="2"
                     label="湖南省"
                     value="湖南省"></el-option>
        </el-select> -->
        <el-input v-model="query.search"
                  placeholder="请输入栏目名"
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
        <el-table-column prop="name"
                         label="栏目名称"></el-table-column>

        </el-table-column>
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
import set from '@/common/mixins/set'

import { ColumnSave, ColumnDel, ColumnList } from '../../../api/index';
export default {
  name: 'Column',
  data () {
    return {
      name: '',
      tableData: [],
      delList: [],
      editVisible: false,
      form: {  //存放删除的数
        name: '',
        id: ''
      },
    };
  },
  mixins: [interList],

  created () {
    this.getData();
  },
  methods: {
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

      })
      this.getData()
    },
    // 获取 easy-mock 的模拟数据
    getData () {
      let _this = this
      this.loading = true
      ColumnList(this.query).then(res => {
        console.log('res', res);
        this.tableData = res.list;

        this.count = res.page_info.count
        this.loading = false

      }).catch(function (error) {
        console.log('发生错误！', error);
        _this.loading = false

      })
    },
    // 删除操作
    handleDelete (index, row) {
      // 二次确认删除
      this.$confirm(`确定要删除ID序号为[${row.id}]`, '提示', {
        type: 'warning'
      })
        .then(() => {
          //这里去删除
          this.loading = true
          ColumnDel({ 'id[0]': row.id }).then(res => {
            this.$message.success('删除成功')
            this.getData()
          })
        })
        .catch(() => {
          this.loading = false

        });
    },

    delAllSelection () {
      // 二次确认删除
      this.$confirm(`确定要删除ID序号为[${this.DelId}]`, '提示', {
        type: 'warning'
      })
        .then(() => {
          this.loading = true
          ColumnDel({ id: this.DelId }).then(res => {
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
