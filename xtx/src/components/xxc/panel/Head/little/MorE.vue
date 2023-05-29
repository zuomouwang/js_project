<template>
  <div class="more-container">
    <a href="javaScript:;">查看全部<el-icon><ArrowRight /></el-icon></a>
  </div>
</template>

<script>
export default {
  props:['data'],
  data() {
    return {
    }
  }
  // , mounted() {
  //   console.log(this.data);
  // },
}
</script>

<style lang="less" scoped>
.more-container {
  display: flex;
  // justify-content: center;
  // align-items: center;
  a {
    padding: 0 10px;
    border-radius: 5px;
    &:hover {
      background-color: #f3fcfa;
    }
    .el-icon {
      font-size: 16px;
      vertical-align: middle;
      position: relative;
      top: -1px;
      color: #afafaf;
    }
  }
}
</style>
