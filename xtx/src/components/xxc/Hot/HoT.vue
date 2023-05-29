<template>
  <div class="hot-container wrapper">
    <HeadBox :data="categoryBanners" :status="status">
      <template #default>人气推荐</template>
      <template #small>人气爆款 不容错过</template>
      <!-- <template #lis>
        <LiS :data="categoryBanners[0].children" :status="status"></LiS>
      </template>
      <template #more>
        <MorE :data="data"></MorE>
      </template> -->
    </HeadBox>
    <BottomBox :data="data" :status="status"></BottomBox>
  </div>
</template>

<script>
import HeadBox from '../panel/Head/HeadBox.vue'
// import LiS from '../panel/Head/little/LiS.vue'
// import MorE from '../panel/Head/little/MorE.vue'
import BottomBox from '../panel/BottomBox.vue'
import bus from '../../../eventBus'
export default {
  components: {
    HeadBox,
    BottomBox
    // LiS,
    // MorE
  },
  data() {
    return {
      categoryBanners: [],
      data: [],
      status: false,
      obj: {
        arr: []
      }
    }
  },
  created() {
    //接收外部传递过来的总数据 存到data
    bus.on('getIndex', value => {
      this.categoryBanners = value.data.result.categoryBanners
      // console.log(this.categoryBanners)
      if (value.status === 200) {
        value.data.result.categoryBanners.forEach(i => {
          this.obj.arr.push(i.name)
        })
        // console.log(value.data.result)
        this.status = true
      }
    })
    bus.on('getHot', value => {
      // console.log(value)
      this.data = value.data.result
      // console.log(this.data[0].picture)
      // if (value.status === 200) {
      //   this.status = true
      // }
    })
  }
}
</script>

<style lang="less" scoped>
.hot-container {
  width: 1240px;
  height: 540px;
}
</style>
