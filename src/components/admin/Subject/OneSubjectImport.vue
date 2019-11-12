<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i>试题添加
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-upload class="upload-demo"
                   drag
                   action="https://jsonplaceholder.typicode.com/posts/"
                   multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip"
               slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <p>下面显示的就是试题的内容</p>
        <el-table :data="tableData"
                  stripe
                  style="width: 100%;margin-top:30px">
          <el-table-column prop="date"
                           label="试题类型"
                           width="180">
          </el-table-column>
          <el-table-column prop="name"
                           label="试题标题"
                           width="180">
          </el-table-column>
          <el-table-column prop="address"
                           label="答案A">
          </el-table-column>
          <el-table-column prop="address"
                           label="答案A">
          </el-table-column>
          <el-table-column prop="address"
                           label="答案A">
          </el-table-column>
          <el-table-column prop="address"
                           label="答案A">
          </el-table-column>
        </el-table>

        <el-button>点击生成试卷</el-button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'basetable',
  data () {
    return {
      tableData: [{
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
      }]
    }

  },
  created () {
  },
  methods: {
    // 获取 easy-mock 的模拟数据
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
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
