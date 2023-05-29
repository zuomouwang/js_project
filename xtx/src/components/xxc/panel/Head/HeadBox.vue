<template>
  <div class="headBox-container no-select">
    <!-- 数据到来前显示 -->
    <h3 ref="name" v-load="status" v-if="!status"></h3>
    <!-- 数据到来 -->
    <h3 ref="name" v-else>
      <slot name="default">{{ data[0].name }}</slot>
    </h3>
    <div class="small" v-if="status">
      <slot name="small"></slot>
    </div>
    <!-- 根据是否有标题决定是否存在,有则描述渲染 -->
    <small
      v-if="
        data !== undefined &&
        open === true &&
        data[0].name !== undefined &&
        this.$refs.name.textContent === this.data[0].name
      "
    >
      {{ data[0].name }}
    </small>
    <!-- LiS坑位 -->
    <div class="lis">
      <slot name="lis" v-if="status"></slot>
    </div>

    <!-- MorE坑位 -->
    <div class="more">
      <slot name="more" v-if="status"></slot>
    </div>
    <div class="swith">
      <slot name="swith" v-if="status"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data', 'status'],
  data() {
    return {
      open: undefined
    }
  },
  updated() {
    if (this.$refs.name.textContent.trim().length > 0) {
      this.open = true
    } else {
      this.open = false
    }
    // console.log(this.$refs.name.textContent === this.data[0].name)
    // console.log(this.data)
  }
  // mounted() {
  //   console.log(this.data)
  // }
}
</script>

<style lang="less" scoped>
.headBox-container {
  display: flex;
  align-items: center;
  // align-items: flex-end;
  width: 1240px;
  height: 115px;
  background-color: #fff;
  h3 {
    margin: 0 15px;
    min-width: 80px;
    height: 35px;
    line-height: 35px;
    font-size: 32px;
    color: #333;
    font-weight: 400;
  }

  small {
    max-width: 320px;
    font-size: 16px;
    color: #999;
    font-weight: 400;
    height: 35px;
    line-height: 46px;
    overflow: hidden; /* 将超出宽度的内容隐藏 */
    text-overflow: ellipsis; /* 将截断的文本以省略号表示 */
    white-space: nowrap; /* 防止文本换行 */
  }
  .lis {
    flex: 1;
    display: flex;
    justify-content: end;
    // max-width: 600px;
    // background-color: aqua;
    height: 35px;
    line-height: 35px;
    margin-left: 30px;
  }
  .more {
    margin-left: 20px;
    height: 35px;
    line-height: 35px;
  }
  .swith {
    margin-left: 20px;
    height: 35px;
    line-height: 35px;
  }
  .small {
    max-width: 320px;
    font-size: 16px;
    color: #999;
    font-weight: 400;
    height: 35px;
    line-height: 46px;
    overflow: hidden; /* 将超出宽度的内容隐藏 */
    text-overflow: ellipsis; /* 将截断的文本以省略号表示 */
    white-space: nowrap; /* 防止文本换行 */
  }
}
</style>
