<template>
  <div class="wrapper">
    <div :class="['goods-relevant', flag ? 'OK' : '']">
      <div class="header">
        <el-icon><GoodsFilled /></el-icon>
        <p>同类商品推荐</p>
      </div>
      <div class="footer">
        <ul class="item_all">
          <li v-for="(i, index) in data" :key="i[0].id" :class="[index == num ? 'active' : '']">
            <div class="item" v-for="c in i" :key="c.id">
              <a :href="'#/Goods/' + c.id" @click="aclick">
                <img :src="c.picture" alt="" />
              </a>
              <p>{{ c.name }}</p>
              <p class="price">￥{{ c.price }}</p>
            </div>
          </li>
        </ul>
        <a href="javascript:;" class="left" @click="left">
          <el-icon><ArrowLeftBold /></el-icon>
        </a>
        <a href="javascript:;" class="right" @click="right">
          <el-icon><ArrowRightBold /></el-icon>
        </a>
        <ul class="circle">
          <li
            v-for="(i, index) in data"
            :key="i[0].id"
            :class="[index == num ? 'active' : '']"
            :index="index"
            @click="list"
          ></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: 0
    }
  },
  methods: {
    left() {
      this.num--
      if (this.num == -1) {
        this.num = 3
      }
    },
    right() {
      this.num++
      if (this.num == 4) {
        this.num = 0
      }
    },
    list(e) {
      this.num = e.target.getAttribute('index')
    },
    aclick() {
      this.$router.push(location.hash.replace('#/', ''))
    }
  },
  computed: {
    data() {
      let obj = {}
      for (let i = 0; i < 4; i++) {
        obj[i] = []
        for (let j = 0; j < 4; j++) {
          obj[i].push(this.relevant[i + j])
        }
      }
      return obj
    }
  },
  props: {
    flag: {
      default: false
    },
    relevant: {
      default: [
        { id: 1 },
        { id: 1 },
        { id: 1 },
        { id: 1 },
        { id: 1 },
        { id: 1 },
        { id: 1 },
        { id: 1 },
        { id: 1 },
        { id: 1 },
        { id: 1 },
        { id: 1 },
        { id: 1 },
        { id: 1 },
        { id: 1 },
        { id: 1 }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.goods-relevant {
  height: 460px;
  background-color: #fff;
  display: none;
  margin-bottom: 30px;
  .header {
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    i {
      margin-left: 20px;
      font-size: 30px;
      color: var(--lv);
      margin-right: 10px;
    }
    p {
      font-size: 20px;
    }
  }
  .footer {
    position: relative;
    height: 380px;
    ul.item_all {
      position: absolute;
      left: 66px;
      top: 0;
      width: 1100px;
      height: 300px;
      margin: 0 auto;
      li {
        position: absolute;
        left: 0;
        top: 0;
        transition: all 1s;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        // display: none;
        opacity: 0;
        .item {
          width: 260px;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          img {
            margin-top: 10px;
            width: 220px;
            height: 220px;
            // background-color: red;
            margin-bottom: 10px;
          }
          p {
            max-width: 200px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            font-size: 16px;
          }
          p.price {
            margin-top: 10px;
            color: #cf4444;
          }
        }
      }
      li.active {
        z-index: 999;
        display: flex;
        opacity: 1;
      }
    }
    a.left {
      position: absolute;
      left: 20px;
      top: 35%;
    }
    a {
      font-size: 20px;
    }
    a.right {
      position: absolute;
      right: 20px;
      top: 35%;
    }
    ul.circle {
      bottom: 36px;
      left: 50%;
      transform: translate(-50%);
      position: absolute;
      display: flex;
      li {
        cursor: pointer;
        width: 12px;
        height: 12px;
        background-color: #ccc;
        border-radius: 50%;
        margin-left: 5px;
      }
      li.active {
        background-color: var(--lv);
      }
    }
  }
}
.goods-relevant.OK {
  display: block;
}
</style>
