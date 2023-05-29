<template>
  <div class="all">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  components: {},
  mounted() {
    if (!localStorage.getItem('user')) {
      localStorage.setItem('user', JSON.stringify([{ 'name': 'zxw', 'password': '1234567' }]))
    }
    if (!localStorage.getItem('account')) {
      localStorage.setItem('account', JSON.stringify([{ 'name': 'zxw', 'cart': [] }]))
    }
    if (!localStorage.getItem('token')) {
      localStorage.setItem('token', '')
    }
    // console.log(localStorage.getItem('token') == '')
  }
}
</script>

<style lang="less">
:root {
  --lv: #27ba9b;
  --hui: #f5f5f5;
}
body {
  user-select: none;
}
.wrapper {
  margin: 0 auto;
  width: 1240px;
  font: 1em/1.4 Microsoft Yahei, PingFang SC, Avenir, Segoe UI, Hiragino Sans GB, STHeiti, 'Microsoft Sans Serif',
    WenQuanYi Micro Hei, sans-serif;
}
// .all {
//   background-color: #f5f5f5;
// }
body {
  user-select: none;
}
</style>
