<template>
  <div class="wrapper">
    <div class="picture-container" ref="Picture">
      <div class="head">
        <div>
          <a href="#/Home">首页</a>
        </div>
        <i class="iconfont icon-arrow-right"></i>
        <div>
          <a href="javascript:;">
            {{ this.data.categories[1].name }}
          </a>
        </div>
        <i class="iconfont icon-arrow-right"></i>
        <div>
          <a href="javascript:;">
            {{ this.data.categories[0].name }}
          </a>
        </div>
        <i class="iconfont icon-arrow-right"></i>
        <span>{{ this.data.name }}</span>
      </div>
      <div class="allBox">
        <div class="right">
          <div class="right-pic">
            <div
              class="smallPicture"
              ref="smallPicture"
              v-if="status"
              :style="`background-image:url(${this.data.mainPictures[0]})`"
              @pointermove="inPicture"
              @pointerleave="outPicture"
            >
              <div class="move"></div>
            </div>
            <ul class="lis" v-if="status">
              <li v-for="(item, index) in data.mainPictures" :key="item.id" :data-index="index" @pointerenter="inLis">
                <!-- :style="`background-image:url(${this.data.mainPictures[index]})`" -->
                <img :src="item" alt="" />
              </li>
            </ul>
            <div
              class="bigPicture"
              ref="bigPicture"
              v-if="status"
              :style="`background-image:url(${this.data.mainPictures[0]})`"
            ></div>
          </div>
          <ul class="right-bottom">
            <li>
              <p>销量人气</p>
              <p>200+</p>
              <p>
                <a href="javascript:;"><i class="iconfont icon-task"></i>销量人气</a>
              </p>
            </li>
            <li>
              <p>商品评价</p>
              <p>400+</p>
              <p>
                <a href="javascript:;"><i class="iconfont icon-task"></i>查看评论</a>
              </p>
            </li>
            <li>
              <p>销量人气</p>
              <p>600+</p>
              <p>
                <a href="javascript:;"><i class="iconfont icon-task"></i>收藏商品</a>
              </p>
            </li>
            <li>
              <p>品牌信息</p>
              <p>苏宁电器</p>
              <p>
                <a href="javascript:;"><i class="iconfont icon-task"></i>品牌主页</a>
              </p>
            </li>
          </ul>
        </div>
        <div class="left">
          <p class="l-name">{{ this.data.name }}</p>
          <p class="l-desc">{{ this.data.desc }}</p>
          <p class="l-price">
            <span>{{ this.data.price }}</span
            ><span>{{ this.data.oldPrice }}</span>
          </p>
          <div class="mes">
            <dl>
              <dt>促销</dt>
              <dd>12月好物放送，App领券购买直降120元</dd>
            </dl>
            <dl>
              <dt>配送</dt>
              <dd>
                <b>至</b>
                <div class="city">
                  <div class="select" @click="city">
                    <span>{{ this.ad }}</span
                    ><i class="iconfont icon-arrow-down"></i>
                  </div>
                  <div class="option" v-if="flag">
                    <span v-for="item in address" :key="item.code" @click="tag(item, address)">
                      {{ item.name }}
                    </span>
                  </div>
                </div>
              </dd>
            </dl>
            <dl>
              <dt>服务</dt>
              <dd>
                <span>无忧退货</span><span>快速退款</span><span>免费包邮</span>
                <a href="javascript:;">了解详情</a>
              </dd>
            </dl>
          </div>
          <div class="kind">
            <dl>
              <dt>{{ this.data.specs[0].name }}</dt>
              <dd>
                <img
                  :src="item.picture"
                  alt=""
                  v-for="(item, index) in data.specs[0].values"
                  :color="index"
                  :key="index"
                  @click="guiGe($event, item)"
                />
              </dd>
            </dl>
            <dl v-if="data.specs[1] !== undefined">
              <dt>{{ this.data.specs[1].name }}</dt>
              <dd>
                <span
                  alt=""
                  v-for="(item, index) in data.specs[1].values"
                  :size="index"
                  :key="index"
                  @click="chiCun($event, item)"
                  >{{ item.name }}
                </span>
              </dd>
            </dl>
          </div>
          <div class="numBox">
            <span>数量</span>
            <div class="n-box">
              <a href="javascript:;" class="jian" @click="jian">-</a>
              <input type="text" :value="num" />
              <a href="javascript:;" class="jia" @click="jia">+</a>
            </div>
          </div>
          <button class="btn" @click="car">加入购物车</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
export default {
  props: ['data', 'status'],
  data() {
    return {
      flag: undefined,
      color: undefined,
      size: undefined,
      address: undefined,
      adr_item: undefined,
      ad_item: '',
      id: undefined,
      price: undefined,
      ad: '北京市 市辖区 东城区',
      style: undefined,
      kind: undefined,
      chiMa: undefined,
      num: 1,
      acc: undefined,
      mes: {
        checked: true,
        window: false,
        id: undefined,
        goodsid: undefined,
        name: undefined,
        picture: undefined,
        price: undefined,
        address: undefined,
        kind: undefined,
        style: undefined,
        size: undefined,
        num: undefined
      }
      // data: {
      //   mainPictures: []
      // },
      // status: false
    }
  },
  methods: {
    inLis(e) {
      // console.log(e.target.getAttribute('data-index'))
      const lis = this.$el.querySelectorAll('.lis li')
      // console.log(lis)
      lis.forEach((li, i) => {
        if (i === parseInt(e.target.getAttribute('data-index'))) {
          li.classList.add('act')
          // console.log(li, li.classList)
        } else {
          li.classList.remove('act')
        }
      })
      const img = e.target.getElementsByTagName('img')[0]
      const backgroundImage = `url(${img.getAttribute('src')})`
      this.$refs.smallPicture.style.backgroundImage = backgroundImage
      this.$refs.bigPicture.style.backgroundImage = backgroundImage
    },
    inPicture(e) {
      const Picture = this.$el.querySelector('.right-pic')
      const move = this.$el.querySelector('.allBox .smallPicture .move')
      move.style.display = 'block'
      // console.log('big:' + Picture.offsetLeft, Picture.offsetTop)
      // console.log('small:' + move.offsetLeft, move.offsetTop)
      // console.log(e.clientX, e.clientY)
      // console.log(e.clientX - Picture.offsetLeft - move.offsetWidth / 2)
      // console.log(e.clientY - Picture.offsetTop - move.offsetHeight / 2)
      const bigPicture = this.$el.querySelector('.bigPicture')
      bigPicture.style.display = 'block'
      move.style.left = `${e.pageX - Picture.offsetLeft - move.offsetWidth / 2}px`
      move.style.top = `${e.pageY - Picture.offsetTop - move.offsetHeight / 2}px`
      if (e.pageX - Picture.offsetLeft - move.offsetWidth / 2 < 0) {
        move.style.left = `0px`
      } else if (e.pageX - Picture.offsetLeft - move.offsetWidth / 2 > 200) {
        move.style.left = `200px`
      }
      if (e.pageY - Picture.offsetTop - move.offsetHeight / 2 < 0) {
        move.style.top = `0px`
      } else if (e.pageY - Picture.offsetTop - move.offsetHeight / 2 > 200) {
        move.style.top = `200px`
      }
      // console.log(-2 * parseInt(move.style.left))
      bigPicture.style.backgroundPosition = `${-2 * parseInt(move.style.left)}px ${-2 * parseInt(move.style.top)}px`
      // bigPicture.style.backgroundPosition = `-${move.style.left} -${move.style.top}`
    },
    outPicture() {
      this.$el.querySelector('.allBox .smallPicture .move').style.display = 'none'

      this.$el.querySelector('.bigPicture').style.display = 'none'
    },
    city() {
      this.flag = true
    },
    tag(item, address) {
      // console.log(address)
      if (item.level === 0) {
        this.adr_item = address
        // console.log(this.adr_item)
        // console.log(adr)
      }
      // console.log(this.ad)
      if (item.level === 0 || item.level === 1 || item.level === 2) {
        this.ad_item += item.name + ' '
        this.address = item.areaList
        // console.log(this.address)
      }
      if (item.level === 2) {
        this.flag = false
        this.address = this.adr_item
        this.ad = this.ad_item
        this.ad_item = ''
        // console.log(this.ad)
        // console.log(this.flag)
      }
    },
    guiGe(e, item) {
      const imgs = this.$el.querySelectorAll('.kind img')
      const prices = this.$el.querySelectorAll('.left .l-price span')
      // console.log(item)
      imgs.forEach(function (currentValue) {
        currentValue.classList.remove('s_cor')
        // 执行操作
      })
      e.target.classList.add('s_cor')
      let id = this.id
      // console.log(item)
      this.data.skus.forEach(function (currentValue) {
        // console.log(currentValue.specs[0].valueName)
        if (currentValue.specs[0].valueName === item.name) {
          // console.log(currentValue)
          prices[0].textContent = currentValue.price
          prices[1].textContent = currentValue.oldPrice
          id = currentValue.id
        }
      })
      this.id = id
      this.price = prices[0].textContent
      // const color = e.target.getAttribute('color')
      // // console.log(e.target.src);
      this.style = `${this.data.specs[0].name}:${item.name}`
      // this.kind = `${this.data.specs[0].name}:${item.name}`
      // // console.log(color)
      // price[0].textContent = this.data.skus[color].price
      // price[1].textContent = this.data.skus[color].oldPrice
      // this.price = price[0].textContent
      // console.log(this.price)
    },
    chiCun(e, item) {
      const spans = this.$el.querySelectorAll('.kind span')
      spans.forEach(function (currentValue) {
        currentValue.classList.remove('s_cor')
        // 执行操作
      })
      e.target.classList.add('s_cor')
      // console.log(item)
      this.chiMa = `${this.data.specs[1].name}:${item.name}`
    },
    jian() {
      const input = this.$el.querySelector('.numBox input')
      // const jianA = this.$el.querySelector('.jian')
      if (this.num <= 1) {
        return
      }
      this.num = --input.value
      // console.log(input.value)
    },
    jia() {
      const input = this.$el.querySelector('.numBox input')
      this.num = ++input.value
      // console.log(input.value)
    },
    car() {
      // console.log(localStorage.getItem('token').length)
      console.log(this.data)
      const token = localStorage.getItem('token')
      const acc = JSON.parse(localStorage.getItem('account'))
      if (token.length <= 0) {
        ElMessage({
          showClose: true,
          message: '请先登录.',
          type: 'warning'
        })
        return
      }
      if (!acc.find(item => item.name === token)) {
        ElMessage({
          showClose: true,
          message: '登录失效',
          type: 'warning'
        })
        return
      }
      if (this.style === undefined) {
        alert('规格')
        return
      }
      if (this.data.specs[1] !== undefined && this.chiMa === undefined) {
        alert('尺码')
        return
      }
      this.mes.goodsid = this.data.id
      // console.log(this.mes.bigId)
      this.mes.id = this.id
      // console.log(this.mes.id)
      let id = this.mes.id
      this.mes.name = this.data.name
      this.mes.picture = this.data.mainPictures[0]
      this.mes.price = this.price
      // let price = this.price
      this.mes.address = this.ad
      let address = this.ad
      if (this.chiMa === undefined) {
        this.mes.kind = this.style
      } else {
        this.mes.kind = `${this.style} ${this.chiMa}`
      }
      this.mes.style = this.style
      // let style = this.style
      this.mes.size = this.chiMa
      // let size = this.chiMa
      this.mes.num = this.num
      let num = this.num
      // console.log(this.mes)
      // acc[acc.findIndex(item => item.name === token)].cart = []
      // acc[acc.findIndex(item => item.name === token)].cart.splice(0,1)
      let same = false
      let my = acc.find(item => item.name === token)
      my.cart.forEach(function (currentValue) {
        // if (currentValue.id === this.mes.id) {
        if (currentValue.id === id) {
          currentValue.address = address
          currentValue.num += num
          localStorage.setItem('account', JSON.stringify(acc))
          ElMessage({
            showClose: true,
            message: '加入购物车成功',
            type: 'success'
          })
          same = true
        }
        // }
      })
      // console.log(id)
      if (same) {
        return
      }
      my.cart.push(this.mes)
      // console.log(my === acc[1])
      ElMessage({
        showClose: true,
        message: '加入购物车成功',
        type: 'success'
      })
      localStorage.setItem('account', JSON.stringify(acc))
    }
  },
  async created() {
    const { data: adr } = await this.$http.get('https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json')
    this.address = adr
    // console.log(this.address)
    // })
    // console.log(this.data[0])
    // console.log(this.data)
    // console.log(this.flag)
  },
  mounted() {
    const lis = this.$el.querySelectorAll('.lis li')
    if (lis.length > 0) {
      lis[0].classList.add('act')
    }
  },
  updated() {
    // this.$refs.smallPicture.style.background = `url(${this.data.mainPictures[0]})`
    // this.$refs.lis.style.background = `url(${this.data.mainPictures[0]})`
    // console.log(this.flag === 'shen' || this.flag === 'shi' || this.flag === 'qu')
  }
}
</script>

<style lang="less" scoped>
.picture-container {
  width: 1240px;
  min-height: 600px;
  padding-bottom: 20px;
  left: 0;
  top: 0;
  font-size: 14px;
  background: #f5f5f5;
  // background:url(),no-repeat;
  .head {
    display: flex;
    padding: 25px 10px;
    // text-align: center;
    line-height: 14px;
    div {
      // line-height: 14px;
      a {
        color: #666;
        transition: all 0.4s;
        &:hover {
          color: #27ba9b;
        }
      }
    }
    i {
      color: #666;
      font-size: 14px;
      margin-left: 5px;
      margin-right: 5px;
      line-height: 14px;
    }
  }
  .allBox {
    display: flex;
    // overflow: hidden;
    background: #fff;
    // position: absolute;
    // left: 0;
    // top: 0;
    .right {
      width: 580px;
      height: 600px;
      padding: 30px 50px;
      .right-pic {
        display: flex;
        position: relative;
        .smallPicture {
          width: 400px;
          height: 400px;
          // background-color: pink;
          background: #f5f5f5;
          background-size: 400px 400px;
          cursor: move;
          .move {
            position: absolute;
            left: 0;
            top: 0;
            width: 200px;
            height: 200px;
            display: none;
            background: rgba(0, 0, 0, 0.2);
          }
        }
        .bigPicture {
          position: absolute;
          z-index: 999;
          top: 0;
          left: 412px;
          width: 400px;
          height: 400px;
          display: none;
          background-color: #27ba9b;
          background-position: 0 0;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          background-repeat: no-repeat;
          background-size: 800px 800px;
          background-color: #f8f8f8;
        }
        .lis {
          width: 80px;
          li {
            width: 68px;
            height: 68px;
            // background-color: pink;
            background-size: 68px 68px;
            margin-left: 12px;
            margin-bottom: 15px;
            cursor: pointer;
          }
        }
      }
      .right-bottom {
        display: flex;
        width: 400px;
        align-items: center;
        text-align: center;
        height: 140px;
        // background-color: aqua;
        li {
          flex: 1;
          position: relative;
          p {
            &:first-child {
              color: #999;
            }
            &:nth-child(2) {
              color: #cf4444;
              margin-top: 10px;
            }
            &:last-child {
              color: #666;
              margin-top: 10px;
            }
            a {
              &:hover {
                color: #27ba9b;
              }
            }
            i {
              color: #27ba9b;
            }
          }
          &:not(:first-child)::after {
            position: absolute;
            top: 10px;
            left: 0;
            height: 60px;
            border-left: 1px solid #e4e4e4;
            content: '';
          }
        }
      }
    }
    .left {
      flex: 1;
      padding: 30px 30px 30px 0;
      .l-name {
        font-size: 22px;
      }
      .l-desc {
        color: #999;
        margin-top: 10px;
      }
      .l-price {
        margin-top: 10px;
        span {
          color: #cf4444;
          margin-right: 10px;
          font-size: 22px;
          &:last-child {
            color: #999;
            text-decoration: line-through;
            font-size: 16px;
          }
          &::before {
            content: '¥';
            font-size: 14px;
          }
        }
      }
      .mes {
        background: #f5f5f5;
        width: 500px;
        padding: 20px 10px 0 10px;
        margin-top: 10px;
        dl {
          padding-bottom: 20px;
          display: flex;
          align-items: center;
          dt {
            width: 50px;
            color: #999;
          }
          dd {
            display: flex;
            justify-content: center;
            align-items: center;
            color: #666;
            > a {
              color: #27ba9b;
            }
            b {
              vertical-align: middle;
              padding-right: 5px;
              font-weight: normal;
            }
            > span {
              margin-right: 10px;
              &::before {
                content: '•';
                color: rgb(39, 186, 155);
                margin-right: 2px;
              }
            }
            .city {
              vertical-align: middle;
              position: relative;
              .select {
                border: 1px solid #e4e4e4;
                height: 30px;
                padding: 0 5px;
                line-height: 28px;
                cursor: pointer;
                overflow: hidden;
                span {
                  color: #666;
                  font-size: 12px;
                }
                i {
                  display: inline-block;
                  height: 15px;
                  width: 15px;
                  font-size: 12px;
                  margin-left: 5px;
                }
              }
              .option {
                width: 542px;
                border: 1px solid #e4e4e4;
                position: absolute;
                left: 0;
                top: 29px;
                background: #fff;
                min-height: 30px;
                line-height: 30px;
                display: flex;
                flex-wrap: wrap;
                padding: 10px;
                span {
                  width: 130px;
                  text-align: center;
                  cursor: pointer;
                  border-radius: 4px;
                  padding: 0 3px;
                  &:hover {
                    background: #f5f5f5;
                  }
                }
              }
            }
          }
        }
      }
      .kind {
        padding-left: 10px;
        padding-top: 20px;
        dl {
          display: flex;
          padding-bottom: 10px;
          align-items: center;
          dt {
            width: 50px;
            color: #999;
          }
          dd {
            flex: 1;
            color: #666;
            line-height: 40px;
            img {
              width: 50px;
              height: 50px;
              margin-bottom: 5px;
              border: 1px solid #e4e4e4;
              margin-right: 10px;
              cursor: pointer;
            }
            span {
              display: inline-block;
              height: 30px;
              line-height: 28px;
              padding: 0 20px;
              border: 1px solid #e4e4e4;
              margin-right: 10px;
              cursor: pointer;
            }
          }
        }
      }
      .numBox {
        display: flex;
        align-items: center;
        span {
          width: 60px;
          color: #999;
          padding-left: 10px;
        }
        .n-box {
          width: 120px;
          height: 30px;
          border: 1px solid #e4e4e4;
          display: flex;
          a {
            width: 29px;
            line-height: 28px;
            text-align: center;
            background: #f8f8f8;
            font-size: 16px;
            color: #666;
          }
          input {
            width: 60px;
            padding: 0 5px;
            text-align: center;
            color: #666;
            font-family: inherit;
            font-size: 100%;
            line-height: 1.15;
            margin: 0;
          }
        }
      }
      .btn {
        margin-top: 20px;
        display: block;
        width: 180px;
        height: 50px;
        font-size: 16px;
        background: #27ba9b;
        color: #fff;
        border: none;
        outline: none;
        text-align: center;
        border: 1px solid transparent;
        border-radius: 4px;
        cursor: pointer;
      }
    }
  }
}
.act {
  border: 2px solid #27ba9b;
}
.s_cor {
  border-color: #27ba9b !important;
}
</style>
