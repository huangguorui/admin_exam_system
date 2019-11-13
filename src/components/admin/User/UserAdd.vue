<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i>用户添加
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-form :model="ruleForm"
                 :rules="rules"
                 ref="ruleForm"
                 label-width="100px"
                 class="demo-ruleForm">

          <!-- <el-form-item label="本题分值"
                        prop="desc">
            <el-input v-model="ruleForm.desc"></el-input>
          </el-form-item> -->

          <el-form-item label="用户电话"
                        prop="user_phone">
            <el-input v-model="ruleForm.user_phone"></el-input>
          </el-form-item>

          <el-form-item label="用户头像"
                        prop="user_img">
            <el-input v-model="ruleForm.user_img"></el-input>
          </el-form-item>
          <el-form-item label="用户邮箱"
                        prop="user_mailbox">
            <el-input v-model="ruleForm.user_mailbox"></el-input>
          </el-form-item>

          <el-form-item label="用户昵称"
                        prop="user_nickname">
            <el-input v-model="ruleForm.user_nickname"></el-input>
          </el-form-item>
          <el-form-item label="用户真实姓名"
                        prop="user_username">
            <el-input v-model="ruleForm.user_username"></el-input>
          </el-form-item>

          <el-form-item label="用户密码"
                        prop="user_pwd">
            <el-input v-model="ruleForm.user_pwd"></el-input>
          </el-form-item>
          <!-- <el-form-item label="用户vip等级"
                        prop="user_vip">
            <el-input v-model="ruleForm.user_vip"></el-input> -->
          </el-form-item>
          <el-form-item label="用户积分"
                        prop="user_integral">
            <el-input v-model="ruleForm.user_integral"></el-input>
          </el-form-item>

          <el-form-item label="用户性别"
                        prop="user_sex">
            <el-select v-model="ruleForm.user_sex"
                       placeholder="请选择性别">
              <el-option label="男"
                         value="0"></el-option>
              <el-option label="女"
                         value="1"></el-option>
            </el-select>
          </el-form-item>

          <el-button type="primary"
                     @click="submitForm('ruleForm')">立即创建用户</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

  </div>
</template>

<script>
import { UserSave } from '../../../api/index';
export default {
  name: 'basetable',
  data () {
    return {
      ruleForm: {
        user_phone: '',//用户电话
        user_img: '',//用户头像
        user_mailbox: '',//用户邮箱
        user_nickname: '',//用户昵称
        user_username: '',//用户真实姓名
        user_birthday: '',//用户生日
        user_pwd: '',//用户密码
        user_vip: '',//用户vip等级
        user_integral: '',//用户积分
        user_sex: '',//用户性别
        name: '',
        region: 'x',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        /*
          user_phone: '',//用户电话
                user_img: '',//用户头像
                user_nickname: '',//用户昵称
                user_username: '',//用户真实姓名
                user_birthday: '',//用户生日
                user_pwd: '',//用户密码
                user_vip: '',//用户vip等级
                user_integral: '',//用户积分
                user_sex: '',//用户性别
        
        */

        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    };
  },
  created () {
  },
  methods: {
    // 获取 easy-mock 的模拟数据
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {

          UserSave(this.ruleForm).then(res => {
            console.log('res', res);
            this.$message.success('操作成功');

          });

          //重置操作
          this.ruleForm = {
            user_phone: '',//用户电话
            user_img: '',//用户头像
            user_nickname: '',//用户昵称
            user_username: '',//用户真实姓名
            user_birthday: '',//用户生日
            user_pwd: '',//用户密码
            user_vip: '',//用户vip等级
            user_integral: '',//用户积分
            user_sex: '',//用户性别
          }

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
