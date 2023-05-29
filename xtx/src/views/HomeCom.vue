<template>
  <div class="home">
    <LunBoTu></LunBoTu>
    <PaneL></PaneL>
    <HoT></HoT>
    <ReMen></ReMen>
    <ProductCom v-for="i in productdata" :key="i.id" :data="i"></ProductCom>
    <LatestTopic></LatestTopic>
  </div>
</template>

<script>
import LunBoTu from '../components/xxc/LBT/LunBoTu.vue'
import PaneL from '../components/xxc/panel/PaneL.vue'
import HoT from '../components/xxc/Hot/HoT.vue'
import ReMen from '../components/xxc/Remen/ReMen.vue'
import LatestTopic from '../components/zxw/LatestTopic.vue'
import ProductCom from '../components/zxw/ProductCom.vue'
import bus from '../eventBus'

export default {
  data() {
    return {}
  },
  components: {
    LunBoTu,
    PaneL,
    HoT,
    ReMen,
    LatestTopic,
    ProductCom
  },
  props: {
    productdata: {},
    PaneLValue: {},
    name: {}
  },
  created() {
    this.$http.get('/home/index').then(value => {
      // console.log(value)
      bus.emit('getIndex', value)
    })
    this.$http.get('/home/hot').then(value => {
      // console.log(value)
      bus.emit('getHot', value)
    })
    this.$http.get('/home/brand').then(value => {
      bus.emit('getReMen', value)
      // console.log(value.data.result)
    })
  }
}
</script>

<style lang="scss" scoped></style>
