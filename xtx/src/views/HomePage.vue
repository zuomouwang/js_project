<template>
  <div>
    <Topcom :userName="name"></Topcom>
    <HeadeCom :prodata="headdata"></HeadeCom>
    <router-view :productdata="productdata"></router-view>
    <footer-com></footer-com>
  </div>
</template>

<script>
import Topcom from '../components/zxw/TopCom.vue'
import HeadeCom from '../components/zxw/HeaderCom.vue'
import FooterCom from '../components/zxw/FooterCom.vue'

export default {
  data() {
    return {
      name: undefined,
      headdata: [],
      productdata: [
        { id: 666, goods: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }] },
        { id: 666, goods: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }] },
        { id: 666, goods: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }] },
        { id: 666, goods: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }] }
      ],
      PaneLValue: []
    }
  },
  components: {
    Topcom,
    HeadeCom,
    FooterCom
  },
  async created() {
    this.$http.get('/home/category/head', {}).then(value => {
      const { data: res } = value
      this.headdata = res.result
      return res.result
    })
    const { data: res } = await this.$http.get('/home/goods')
    this.productdata = res.result
    // console.log(res)
  },
  mounted() {
    if (localStorage.getItem('token')) {
      this.name = localStorage.getItem('token')
    }
  }
}
</script>

<style lang="less" scoped></style>
