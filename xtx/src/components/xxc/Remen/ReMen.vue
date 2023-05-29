<template>
  <div class="reMen-container">
    <div class="wrapper">
      <HeadBox :status="status" ref="head">
        <template #default>热门品牌</template>
        <template #small>国际经典 品质保证</template>
        <template #swith>
          <div class="swith">
            <a href="javaScript:;" @click="shang" class="col" ref="shang">&lt;</a>
            <a href="javaScript:;" @click="xia" ref="xia">&gt;</a>
          </div>
        </template>
      </HeadBox>
      <div class="box" v-load="status">
        <ul ref="ul">
          <li v-for="item in data" :key="item.id">
            <a href="JavaScript:;">
              <img :src="item.picture" alt="" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import HeadBox from '../panel/Head/HeadBox.vue'
import bus from '../../../eventBus'
export default {
  components: {
    HeadBox
  },
  data() {
    return {
      data: [],
      status: false
    }
  },
  methods: {
    shang() {
      this.$refs.xia.classList.remove('col')
      this.$refs.shang.classList.add('col')
      this.$refs.ul.style.transform = 'translateX(0px)'
    },
    xia() {
      this.$refs.shang.classList.remove('col')
      this.$refs.xia.classList.add('col')
      this.$refs.ul.style.transform = 'translateX(-1240px)'
      // console.log(ul.style.left)
    }
  },
  created() {
    //接收外部传递过来的总数据 存到data
    bus.on('getReMen', value => {
      this.data = value.data.result
      // console.log(this.data[0].picture)
      if (value.status === 200) {
        this.status = true
      }
    })
  },
  mounted() {
    this.$refs.head.$el.style.backgroundColor = 'var(--hui)'
  }
}
</script>

<style lang="less" scoped>
.reMen-container {
  // height: 460px;
  background-color: var(--hui);
  .swith {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 35px;
    // background-color: aqua;
    a {
      text-align: center;
      margin: 0 5px;
      width: 26px;
      height: 20px;
      color: #fff;
      line-height: 20px;
      border-radius: 3px;
      background-color: #27ba9b;
    }
    .col {
      background-color: #ccc;
      // pointer-events: none;
      cursor: not-allowed;
    }
  }

  .box {
    display: flex;
    width: 1240px;
    height: 345px;
    overflow: hidden;
    ul {
      display: flex;
      transition: all 1s;
      // background-color: aquamarine;

      // transform: translateX();
      li {
        width: 240px;
        margin-right: 10px;
        &:nth-child(5n) {
          margin-right: 0px;
        }
        a {
          img {
            width: 240px;
            height: 305px;
          }
        }
      }
    }
  }
}
</style>
