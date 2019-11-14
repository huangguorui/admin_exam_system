<template>
  <div>
    <el-radio-group v-model="direction">
      <el-radio label="ltr">从左往右开</el-radio>
      <el-radio label="rtl">从右往左开</el-radio>
      <el-radio label="ttb">从上往下开</el-radio>
      <el-radio label="btt">从下往上开</el-radio>
    </el-radio-group>

    {{forData}}
    <!-- :wrapperClosable="false" -->

    <el-drawer title="我是标题"
               :visible.sync="isDrawer"
               :direction="direction"
               :show-close='false'
               :before-close="handleClose">
      <span>我来啦!</span>
      <slot name="header">这里是头部</slot>
      <el-button @click="cancel">取消</el-button>
      <el-button @click="submit">确定</el-button>
    </el-drawer>

  </div>
</template>


<script>
export default {
  name: 'DrawerModel',
  props: {
    isDrawer: {
      type: Boolean,
      default: false
    },
    forData: {
      type: Object,
      default: 'default'
    }
  },
  data () {

    return {
      direction: 'rtl',
      value: true
    };
  },
  methods: {
    cancel () {
      this.$emit('update:isDrawer', false)
      this.$emit('closeDraw', { a: 1 });
    },
    submit () {
      this.$emit('update:isDrawer', false)
      this.$emit('applySubmit', this.forData);

    },
    handleClose (done) {
      //告诉父组件我的值变了
      this.$emit('update:isDrawer', false)
    },

  }
};
</script>