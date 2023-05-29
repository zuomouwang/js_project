<template>
  <div class="LBT-container">
    <div class="wrapper">
      <TuTu></TuTu>
      <LisT></LisT>
    </div>
  </div>
</template>

<script>
import TuTu from './lunbotu/TuTu.vue'
import LisT from './lunbotu/LisT.vue'
export default {
  components: { TuTu, LisT },
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
.LBT-container {
  height: 500px;
  background-color: #f5f5f5;
  .wrapper {
    position: relative;
  }
}
</style>
