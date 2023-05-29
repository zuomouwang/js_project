<template>
  <div class="tutu-container" v-load="status">
    <div class="block text-center">
      <el-carousel height="500px">
        <el-carousel-item v-for="item in tutu" :key="item.id">
          <a href="javaScript:;">
            <img :src="item.imgUrl" alt="推荐商品图" />
          </a>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tutu: [],
      status: false
    }
  },
  methods: {
    async initBookList() {
      const data = await this.$http.get('/home/banner')
      if (data.status === 200) {
        this.status = true
      }
      this.tutu = data.data.result
    }
  },
  created() {
    this.initBookList()
  }
}
</script>
<style lang="less" scoped>
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
