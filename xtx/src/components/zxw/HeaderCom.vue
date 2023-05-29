<template>
  <div class="head">
    <div class="wrapper">
      <div class="pic">
        <a href="#/"></a>
      </div>
      <div class="list">
        <li ref="li" v-for="(i, index) in data" :key="i.id" :index="index" v-load="flag">
          <a ref="a" href="javaScript:;" :class="[status_isbd[index] ? 'checked' : '', flag ? 'OK' : '']"
            >{{ i.name }}
          </a>
          <el-collapse-transition>
            <div class="options" v-show="status[index]">
              <ul class="center">
                <li v-for="c in i.children" :key="c.id">
                  <a href="javaScript:;">
                    <div class="img">
                      <img :src="c.picture" alt="" />
                    </div>
                    <p>{{ c.name }}</p>
                  </a>
                </li>
              </ul>
            </div>
          </el-collapse-transition>
        </li>
      </div>
      <div class="input">
        <el-icon><Search /></el-icon>
        <input type="text" placeholder="搜一搜" />
      </div>
      <div class="cart">
        <a href="#/cart">
          <el-icon class="big"><ShoppingCart /></el-icon>
          <em>{{ this.carNum }}</em>
        </a>
        <div class="car">
          <div class="carList">
            <div class="goods" v-for="item in myCar" :key="item.id">
              <a href="#/cart">
                <img :src="item.picture" alt="" />
                <div class="mes">
                  <p>{{ item.name }}</p>
                  <p>{{ item.kind }}</p>
                </div>
                <div class="numP">
                  <p>¥{{ item.price }}</p>
                  <p>x{{ item.num }}</p>
                </div>
              </a>
              <i class="iconfont icon-close" @click="del($event, item)"></i>
            </div>
          </div>
          <div class="carFoot">
            <div class="footLeft">
              <p>共 {{ this.carNum }} 件商品</p>
              <p>¥{{ this.carPrice }}</p>
            </div>
            <a href="#/cart">去购物车结算</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
let timer = 0
export default {
  data() {
    return {
      localStorage_time: undefined,
      token: '',
      account: undefined,
      user: undefined,
      myCar: undefined,
      now: undefined,

      carNum: 0,
      carPrice: 0,

      status: [false, false, false, false, false, false, false, false, false],
      defdata: [
        { id: '1', name: '' },
        { id: '2', name: '' },
        { id: '3', name: '' },
        { id: '4', name: '' },
        { id: '5', name: '' },
        { id: '6', name: '' },
        { id: '7', name: '' },
        { id: '8', name: '' },
        { id: '9', name: '' },
        { id: '10', name: '' }
      ]
    }
  },
  props: {
    prodata: {}
  },
  computed: {
    data() {
      if (this.prodata.length !== 0) {
        let value = [{ id: 999, name: '首页' }].concat(this.prodata)
        return value
      }
      return this.defdata
    },
    flag() {
      if (this.prodata.length !== 0) {
        return true
      }
      return false
    },
    status_isbd: {
      get() {
        if (this.prodata.length !== 0) {
          return [true, false, false, false, false, false, false, false, false]
        }
        return [false, false, false, false, false, false, false, false, false]
      },
      set(value) {
        return value
      }
    }
  },
  watch: {
    flag: {
      handler() {
        this.$nextTick(() => {
          // console.log(this.$refs)
          this.$refs.a.forEach(i => {
            i.addEventListener('click', this.click_bdb)
          })
          // @mouseenter="enter"
          // @mouseleave="leave"
          this.$refs.li.forEach(i => {
            i.addEventListener('mouseenter', this.enter)
            i.addEventListener('mouseleave', this.leave)
          })
        })
      }
    }
  },
  methods: {
    // pointer_enter() {
    //   this.car = true
    //   console.log(this.car)
    // },
    // pointer_leave() {
    //   this.car = false
    //   console.log(this.car)
    // },
    click_bdb(e) {
      if (!this.flag) return
      let checked = document.querySelector('.head .wrapper .list li .checked')
      checked.classList.remove('checked')
      e.target.classList.add('checked')
    },
    enter(e) {
      if (e.target.children[0].innerText === '首页') return
      clearTimeout(timer)
      e.target.children[1].style.cssText = ` box-shadow: 0px -1px 4px -1px #ccc;`
      this.status.splice(e.target.getAttribute('index'), 1, true)
    },
    leave() {
      timer = setTimeout(() => {
        this.status = [false, false, false, false, false, false, false, false, false]
      }, 10)
    },
    del(e, item) {
      let myCar = this.myCar
      let token = this.token
      if (this.account.find(item => item.name === this.token)) {
        this.myCar.forEach(function (i, index) {
          if (i.id === item.id) {
            myCar.splice(index, 1)
            // ElMessage({
            //   showClose: true,
            //   message: '删除成功',
            //   type: 'success'
            // })
          }
        })
        this.myCar = myCar
        localStorage.setItem('account', JSON.stringify(this.account))
      } else if (token.length <= 0) {
        ElMessage({
          showClose: true,
          message: '请先登录.',
          type: 'warning'
        })
      } else if (!this.account.find(item => item.name === this.token)) {
        ElMessage({
          showClose: true,
          message: '登录失效',
          type: 'warning'
        })
      }
    }
  },
  created() {},
  mounted() {
    // console.log(location.hash)
    this.localStorage_time = setInterval(() => {
      if (
        localStorage.getItem('token') === null ||
        !JSON.parse(localStorage.getItem('account')) ||
        !localStorage.getItem('user')
      ) {
        localStorage.setItem('token', this.token)
        localStorage.setItem('account', JSON.stringify(this.account))
        localStorage.setItem('user', JSON.stringify(this.user))
      }
      // this.token = localStorage.getItem('token')
      let token = localStorage.getItem('token')
      this.account = JSON.parse(localStorage.getItem('account'))
      this.user = JSON.parse(localStorage.getItem('user'))
      if (!this.account.find(item => item.name === token)) {
        if (location.hash !== '#/login/1' && location.hash !== '#/login/2') {
          const car = document.querySelector('.car')
          car.style.opacity = 0
        }
        if (token === '') {
          token = this.token
        } else {
          token = this.token
          localStorage.setItem('token', this.token)
        }
      } else {
        this.token = token
        // console.log(this.token)
        this.myCar = this.account.find(item => item.name === this.token).cart
        let num = 0
        let price = 0
        this.myCar.forEach(function (currentValue) {
          num += currentValue.num
          price += currentValue.price * currentValue.num
        })
        this.carNum = num
        if (this.carNum === 0 || location.hash === '#/cart') {
          const car = document.querySelector('.car')
          car.style.opacity = 0
        } else {
          const car = document.querySelector('.car')
          car.style.opacity = 1
        }
        this.carPrice = price.toFixed(2)
      }
    }, 10)
  },
  updated() {}
}
</script>

<style lang="less" scoped>
.head {
  position: sticky;
  z-index: 2002;
  top: 0;
  left: 0;
  width: 100%;
  height: 130px;
  background-color: #fff;
  .wrapper {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: space-between;
    .pic {
      width: 200px;
      height: 100%;
      a {
        display: block;
        width: 100%;
        height: 100%;
        text-align: center;
        background-image: url(../../../public/img/logo.png);
        background-size: contain;
        background-repeat: no-repeat;
        background-position: 0 18px;
      }
    }
    .list {
      display: flex;
      position: relative;
      li {
        list-style: none;
        margin: 0 20px;
        a {
          display: block;
          min-width: 35px;
          height: 20px;
          padding-bottom: 6px;
          text-align: center;
        }
        a.OK:hover {
          border-bottom: 1px solid #27ba9b;
        }
        .checked {
          border-bottom: 1px solid #27ba9b;
        }
        .options {
          position: absolute;
          z-index: 999;
          left: -213px;
          top: 45px;
          .center {
            margin: 0 auto;
            width: 1240px;
            height: 120px;
            display: flex;
            align-items: center;
            background-color: #fff;
            box-shadow: 0px -1px 4px -1px #ccc;
            padding-left: 100px;
            li {
              a {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 100%;
                height: 100%;
                .img {
                  width: 60px;
                  height: 60px;
                  border-radius: 50%;
                  overflow: hidden;
                  img {
                    width: 100%;
                    height: 100%;
                  }
                }
              }
              a:hover {
                color: #27ba9b;
                border: 0 solid #000;
              }
            }
          }
        }
      }
    }
    .input {
      width: 170px;
      height: 30px;
      display: flex;
      align-items: center;
      box-shadow: #ccc 1px 1px 4px 0px;
      i {
        margin-left: 3px;
      }
      input {
        color: #ccc;
        margin-left: 5px;
        width: 140px;
        height: 20px;
      }
    }
    .cart {
      position: relative;
      width: 30px;
      height: 30px;
      a {
        display: block;
        width: 100%;
        height: 100%;
        .big {
          font-size: 30px;
        }
        em {
          // width: 15px;
          position: absolute;
          height: 14px;
          padding: 0 6px;
          left: 19px;
          top: -4px;
          background-color: red;
          color: #fff;
          font-size: 12px;
          text-align: center;
          line-height: 14px;
          border-radius: 6px;
        }
      }
      .car {
        position: absolute;
        opacity: 0;
        left: -360px;
        top: 50px;
        width: 400px;
        height: 400px;
        background-color: #27ba9b;
        opacity: 0;
        transition: all 0.4s 0.2s;
        transform: translateY(-200px) scaleY(0);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        background: #fff;
        border-radius: 8px;
        padding-top: 10px;
        &::before {
          content: '';
          position: absolute;
          right: 10px;
          top: -10px;
          width: 20px;
          height: 20px;
          background: #fff;
          transform: scaleX(0.6) rotate(45deg);
          box-shadow: -3px -3px 5px rgba(0, 0, 0, 0.1);
        }
        .carList {
          height: 310px;
          overflow: auto;
          padding: 0 10px;
          .goods {
            border-bottom: 1px solid #f5f5f5;
            padding: 15px 0;
            position: relative;
            &:hover {
              i {
                opacity: 1;
                cursor: pointer;
              }
            }
            a {
              display: flex;
              align-items: center;
              img {
                height: 80px;
                width: 80px;
                vertical-align: middle;
              }
              .mes {
                padding: 0 10px;
                width: 200px;
                // background-color: cornflowerblue;
                p:first-child {
                  font-size: 16px;
                  // white-space: nowrap; /* 文本不允许换行 */
                  overflow: hidden; /* 超出部分隐藏 */
                  text-overflow: ellipsis; /* 超出部分显示为省略号 */
                  display: -webkit-box; /* 将元素作为弹性伸缩盒子模型显示 */
                  -webkit-line-clamp: 2; /* 限制元素最多显示两行 */
                  -webkit-box-orient: vertical; /* 设置元素内文本垂直方向排列 */
                }
                p:last-child {
                  color: #999;
                  font-size: 14px;
                  padding-top: 5px;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  white-space: nowrap; /* 文本不允许换行 */
                }
              }
              .numP {
                width: 100px;
                padding-right: 20px;
                text-align: center;
                p:first-child {
                  font-size: 16px;
                  color: #cf4444;
                }
                p:last-child {
                  color: #999;
                  margin-top: 5px;
                  font-size: 16px;
                }
              }
              &:hover {
                i {
                  opacity: 1;
                }
              }
            }
            i {
              position: absolute;
              // z-index: 99;
              bottom: 38px;
              right: 0;
              // width:20px;
              // height: 20px;
              opacity: 0;
              color: #666;
              transition: all 0.5s;
            }
          }
        }
        .carFoot {
          position: absolute;
          left: 0;
          bottom: 0;
          height: 70px;
          width: 100%;
          padding: 10px;
          display: flex;
          justify-content: space-between;
          background: #f8f8f8;
          align-items: center;
          .footLeft {
            padding-left: 10px;
            color: #999;
            p {
              &:first-child {
                font-size: 14px;
              }
              &:last-child {
                font-size: 18px;
                color: #cf4444;
              }
            }
            // background-color: pink;
          }
          a {
            width: 180px;
            height: 50px;
            line-height: 50px;
            font-size: 16px;
            text-align: center;
            color: #27ba9b;
            background: #e6faf6;
            border: 1px solid #27ba9b;
            border-radius: 4px;
          }
        }
      }
      &:hover {
        .car {
          opacity: 1;
          transform: none;
        }
      }
      // background-color: red;
    }
  }
  .fixed {
    padding: 10px;
    height: 80px;

    background-color: #fff;
    left: 17.5%;
    top: 0;
    .pic {
      width: 200px;
      height: 100%;
      background-image: url(../../../public/img/logo.png);
      background-size: contain;
      background-repeat: no-repeat;
      background-position: 0 18px;
    }
  }
}
.opne {
  display: block;
}
.close {
  display: none;
}
</style>
