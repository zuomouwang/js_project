<template>
  <div class="mes-container">
    <a href="javascript:;" v-for="item in data" :key="item.id">{{ item.name }}</a>
  </div>
</template>

<script>
export default {
  props: ['data'],
  data() {
    return {
    }
  },
  created() {},
  beforeMount() {},
  mounted() {
  },
  updated() {
    // console.log(this.data)
    // console.log(this.status)
    // console.log(this.status)
  }
}
</script>

<style lang="less" scoped>
.mes-container {
  display: flex;
  a {
    margin: 0 5px;
    padding: 0 10px;
    border-radius: 6px;
    &:hover {
      color: #fff;
      background-color: #27ba9b;
    }
  }
}
</style>
