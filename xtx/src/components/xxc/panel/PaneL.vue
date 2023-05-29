<template>
  <div class="panel-contaier wrapper">
    <HeadBox :data="categoryBanners" :status="status">
      <template #default>新鲜好物</template>
      <template #small>新鲜出炉 品质靠谱</template>
      <!-- <template #lis>
        <LiS :data="categoryBanners[0].children" :status="status"></LiS>
      </template> -->
      <!-- <template #more>
        <MorE :data="data"></MorE>
      </template> -->
    </HeadBox>
    <BottomBox :data="freshGoods" :status="status"></BottomBox>
  </div>
</template>

<script>
import HeadBox from './Head/HeadBox.vue'
// import LiS from './Head/little/LiS.vue'
// import MorE from './Head/little/MorE.vue'
import BottomBox from './BottomBox.vue'
import bus from '../../../eventBus'
export default {
  components: {
    HeadBox,
    BottomBox
    // LiS,
    // MorE
  },
  props: [],
  data() {
    return {
      categoryBanners: [],
      freshGoods: [],
      status: false
    }
  },
  created() {
    //接收外部传递过来的总数据 存到data
    bus.on('getIndex', value => {
      // this.data = value.data.result
      // console.log(value)
      // comst [ id: n] = value.data.result.categoryBanners
      this.categoryBanners = value.data.result.categoryBanners
      this.freshGoods = value.data.result.freshGoods
      if (value.status === 200) {
        this.status = true
      }
    })
  }

  ///home/index
}
</script>

<style lang="less" scoped>
.panel-contaier {
  width: 1240px;
  height: 540px;
  p {
    font-size: 50px;
    color: red;
    margin-left: 66px;
    font-weight: 700;
  }
}
</style>
