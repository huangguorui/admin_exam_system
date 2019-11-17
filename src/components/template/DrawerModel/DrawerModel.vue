<template>
  <div>
    <!-- {{forData}} -->
    <!-- :wrapperClosable="false" -->

    <el-drawer :title="drawerTitle"
               :visible.sync="isDrawer"
               :show-close='false'
               :before-close="handleClose">
      <slot name="header">from表单提交</slot>
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
    },
    drawerTitle: {
      type: String,
      default: '默认标题'
    }
  },
  data () {

    return {
      value: true
    };
  },
  methods: {
    cancel () {
      this.$emit('update:isDrawer', false)
      this.$emit('closeDraw');
    },
    submit () {
      //  this.$emit('update:isDrawer', false)
      //this.$emit('applySubmit', { a: 1 });
      this.$emit('applySubmit', this.forData, 'formData');

    },
    handleClose (done) {
      //告诉父组件我的值变了
      this.$emit('update:isDrawer', false)
    },

  }
};
</script>