<template>
  <div :class="['cart', flag ? '' : 'load']" v-loading="!flag" @click="hide">
    <div class="wrapper">
      <div class="top">
        <a href="#/">首页</a>
        <el-icon><ArrowRight /></el-icon>
        <a href="JavaScript:;">购物车</a>
      </div>
      <div class="goods">
        <div class="nav">
          <div class="all"><input type="checkbox" v-model="allchecked" /><span>全选</span></div>
          <div class="goodsmsg"><p>商品信息</p></div>
          <div class="price"><p>单价</p></div>
          <div class="count"><p>数量</p></div>
          <div class="total"><p>总价</p></div>
          <div class="remove"><p>操作</p></div>
        </div>
        <div class="item" v-for="i in list" :key="i.id">
          <div class="all">
            <input type="checkbox" v-model="i.checked" ref="checked" @click="storage(i.index)" /><span> </span>
          </div>
          <div class="goodsmsg">
            <a :href="'#/Goods/' + i.goodsid" class="left">
              <img :src="i.picture" :alt="i.name" />
            </a>
            <div class="right">
              <p>{{ i.name }}</p>
              <div class="sku">
                <span class="description" @click="windowdisp($event, i.index)">
                  {{ i.kind }} <el-icon><ArrowDown /> </el-icon>
                </span>
                <div
                  v-if="windowdata"
                  :class="['selection', i.window ? 'selected' : '', !windowflag ? 'none' : '']"
                  :index="i.index"
                  v-loading="!windowflag"
                >
                  <div class="sku1" v-for="(i, index) in windowdata.specs" :key="index">
                    <div class="left">
                      <span>{{ i.name }}</span>
                    </div>
                    <div class="right" v-if="i.values[0].picture">
                      <img
                        :src="i.picture"
                        :alt="i.name"
                        v-for="(i, num) in i.values"
                        :key="num"
                        :class="[i.checked ? 'checked' : '']"
                        @click="sku(index, num)"
                      />
                    </div>
                    <div class="right" v-else>
                      <span
                        v-for="(i, num) in i.values"
                        :key="num"
                        :class="[i.checked ? 'checked' : '']"
                        @click="sku(index, num)"
                        >{{ i.name }}</span
                      >
                    </div>
                  </div>
                  <el-button size="small" text @click=";(i.window = false), (this.dispflag = false)">取消</el-button>
                  <el-button size="small" type="primary" @click="isOk(i)"> 确定 </el-button>
                </div>
              </div>
            </div>
          </div>
          <div class="price">
            <p>￥{{ i.price }}</p>
          </div>
          <div class="count">
            <a href="Javascript:;" @click="subtract(i.index)">-</a>
            <em>{{ i.num }}</em>
            <a href="JavaScript:;" @click="add(i.index)">+</a>
          </div>
          <div class="total">
            <p>￥{{ i.total }}</p>
          </div>
          <div class="remove"><a href="JavaScript:;" :index="i.index" @click="remove(i.index)">删除</a></div>
        </div>
        <div :class="[nogoods ? 'item_none' : 'item_have']">
          <img
            src="data:image/png;base64,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"
            alt=""
          />
          <span>购物车内没有商品</span>
          <a href="#/">继续逛逛</a>
        </div>
      </div>
      <div class="foot">
        <div class="all"><input type="checkbox" v-model="allchecked" /><span>全选</span></div>
        <a href="JavaScript:;" @click="removechecked">删除商品</a>
        <div class="emp"></div>
        <span>共 {{ allnum }} 件</span>
        <span>已选择 {{ checkednum }} 件</span>
        <span
          >合计：<em>￥{{ money }}</em></span
        >
        <button>下单结算</button>
      </div>
    </div>
    <GoodsRe :relevant="relevant" :flag="flag"></GoodsRe>
  </div>
</template>

<script>
import GoodsRe from '../components/zxw/GoodsRelevant.vue'
import { ElNotification, ElMessageBox } from 'element-plus'
export default {
  data() {
    return {
      relevant: undefined, // 获取数据
      flag: false, //加载标志
      windowflag: false, //小窗加载标志
      visible: false, //小窗显示的标志
      dispflag: true, //下窗显示的标志 (与关闭小窗有关)
      list: undefined, //用户购物车
      user: undefined, //当前用户
      windowdata: undefined
      // allchecked: false, //全选标志
      // checkednum: undefined, //已选择多少商品
      // allnum: undefined //所有商品数量
    }
  },
  components: {
    GoodsRe
  },
  computed: {
    allchecked: {
      get() {
        return this.list.every(i => i.checked == true)
      },
      set(newval) {
        this.list.forEach(i => {
          i.checked = newval
        })
        let cart = JSON.parse(localStorage.getItem('account'))
        let index = cart.findIndex(i => {
          return i.name == this.user
        })
        cart[index].cart = this.list
        localStorage.setItem('account', JSON.stringify(cart))
      }
    },
    checkednum() {
      let list = this.list.filter(i => i.checked == true)
      let num = 0
      list.forEach(i => {
        num = num + i.num
      })
      return num
    },
    allnum() {
      let num = 0
      this.list.forEach(i => {
        num = num + i.num
      })
      return num
    },
    money() {
      let list = this.list.filter(i => i.checked == true)
      let num = 0
      list.forEach(i => {
        num = num + Number.parseFloat(i.total)
      })
      return num.toFixed(2)
    },
    nogoods() {
      if (this.list.length == 0) return true
      else return false
    }
  },
  methods: {
    hide(e) {
      let target = document.querySelector('.cart .wrapper .goods .item .goodsmsg .right .sku .selected')
      if (!target) return

      let index = this.list.findIndex(i => {
        return i.index == target.getAttribute('index')
      })
      let arr = getAllDescendants(target)
      function getAllDescendants(element) {
        const descendants = []

        function traverse(node) {
          if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE) {
            descendants.push(node)
          }
          if (node.hasChildNodes()) {
            const children = node.childNodes
            for (let i = 0; i < children.length; i++) {
              traverse(children[i])
            }
          }
        }
        traverse(element)
        return descendants
      }

      if (arr.findIndex(i => i == e.target) == -1) {
        if (!this.dispflag) return (this.dispflag = !this.dispflag)
        this.list[index].window = false
        this.dispflag = false
        this.windowflag = false
        // this.windowdata = undefined
      }
    },
    add(id) {
      let index = this.list.findIndex(i => {
        return i.index == id
      })
      if (this.list[index].num == 99) return
      this.list[index].num++
      this.list[index].total = (this.list[index].num * this.list[index].price).toFixed(2)
      let cart = JSON.parse(localStorage.getItem('account'))
      index = cart.findIndex(i => {
        return i.name == this.user
      })
      cart[index].cart = this.list
      localStorage.setItem('account', JSON.stringify(cart))
    },
    subtract(id) {
      let index = this.list.findIndex(i => {
        return i.index == id
      })
      if (this.list[index].num == 1) return
      this.list[index].num--
      this.list[index].total = (this.list[index].num * this.list[index].price).toFixed(2)
      let cart = JSON.parse(localStorage.getItem('account'))
      index = cart.findIndex(i => {
        return i.name == this.user
      })
      cart[index].cart = this.list
      localStorage.setItem('account', JSON.stringify(cart))
    },
    removechecked() {
      ElMessageBox.confirm('您确定删除选中的商品么?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let arr = []
          this.list.forEach((i, index) => {
            if (i.checked == true) {
              arr.push(index)
            }
          })
          if (arr.length == 0) return
          arr.reverse()
          arr.forEach(i => {
            this.list.splice(i, 1)
          })
          let cart = JSON.parse(localStorage.getItem('account'))
          let index = cart.findIndex(i => {
            return i.name == this.user
          })
          cart[index].cart = this.list
          localStorage.setItem('account', JSON.stringify(cart))
          ElNotification({
            type: 'success',
            message: '已删除',
            duration: 800
          })
        })
        .catch(() => {
          ElNotification({
            type: 'success',
            message: '已取消',
            duration: 800
          })
        })
    },
    remove(id) {
      ElMessageBox.confirm('您确定删除该商品么?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let index = this.list.findIndex(i => {
            return i.index == id
          })
          this.list.splice(index, 1)
          let cart = JSON.parse(localStorage.getItem('account'))
          index = cart.findIndex(i => {
            return i.name == this.user
          })
          cart[index].cart = this.list
          localStorage.setItem('account', JSON.stringify(cart))
          ElNotification({
            type: 'success',
            message: '已删除',
            duration: 800
          })
        })
        .catch(() => {
          ElNotification({
            type: 'success',
            message: '已取消',
            duration: 800
          })
        })
    },
    storage() {
      this.$nextTick(() => {
        setTimeout(() => {
          let cart = JSON.parse(localStorage.getItem('account'))
          let index = cart.findIndex(i => {
            return i.name == this.user
          })
          cart[index].cart = this.list
          localStorage.setItem('account', JSON.stringify(cart))
        }, 0)
      })
    },
    async windowdisp(e, id) {
      let index = this.list.findIndex(i => {
        return i.index == id
      })
      this.list[index].window = true
      // this.dispflag = true
      this.hide(e)
      const { data: res } = await this.$http.get(`goods/sku/${this.list[index].id}`, {})
      res.result.specs.forEach(i => {
        i.values.forEach((i, index) => {
          if (index == 0) {
            i.checked = true
          } else {
            i.checked = false
          }
        })
      })
      this.windowdata = res.result
      this.windowflag = true
    },
    sku(index, num) {
      this.windowdata.specs[index].values.forEach(i => {
        i.checked = false
      })
      this.windowdata.specs[index].values[num].checked = true
    },
    isOk(i) {
      i.window = false
      this.dispflag = false
      let str = ''
      let kind = []
      let name = []
      this.windowdata.specs.forEach(i => {
        str = str + i.name + ':'
        let arr = i.values.filter(i => {
          return i.checked == true
        })
        kind.push(arr[0].name)
        name.push(i.name)
        str = str + arr[0].name + ' '
      })
      let index = kind.length
      let arr = this.windowdata.skus
      for (let i = 0; i < index; i++) {
        arr = arr.filter(e => {
          return e.specs[i].valueName == kind[i]
        })
      }
      // console.log(arr[0].id)
      // console.log(i.id)
      i.id = arr[0].id
      i.price = arr[0].price
      i.total = (i.num * arr[0].price).toFixed(2)
      i.kind = str
      let newid = arr[0].id
      let cart = JSON.parse(localStorage.getItem('account'))
      index = cart.findIndex(i => {
        return i.name == this.user
      })
      cart[index].cart = this.list
      localStorage.setItem('account', JSON.stringify(cart))
      cart = JSON.parse(localStorage.getItem('account'))
      // console.log(newid)

      let list = cart[index].cart.filter(i => {
        return i.id == newid
      })
      let sy = []
      if (list.length > 1) {
        let num = 0
        list.forEach(i => {
          num = num + i.num
          sy.push(i.index)
        })
        console.log(num)
        console.log(i.index)
        // console.log(sy)
        // console.log(cart[index].cart)
        sy.reverse()
        // console.log(sy)
        sy.forEach(n => {
          if (n == i.index) {
            this.list[n].num = num
            this.list[n].total = (cart[index].cart[n].price * num).toFixed(2)
            this.list[n].checked = true
            cart[index].cart[n].num = num
            cart[index].cart[n].total = (cart[index].cart[n].price * num).toFixed(2)
            cart[index].cart[n].checked = true
          } else {
            this.list.splice(n, 1)
            cart[index].cart.splice(n, 1)
          }
          this.list.forEach((i, mm) => {
            i.index = mm
            cart[index].cart[mm].index = mm
          })
          localStorage.setItem('account', JSON.stringify(cart))
        })
        ElNotification({
          type: 'success',
          message: '有相同规格商品,已合并',
          duration: 1000
        })
      }
    }
  },
  async created() {
    let cart = JSON.parse(localStorage.getItem('account'))
    cart.forEach(i => {
      i.cart.forEach((i, index) => {
        i.total = (i.num * i.price).toFixed(2)
        i.index = index
      })
    })
    this.list = cart[cart.findIndex(i => i.name == localStorage.getItem('token'))].cart
    // console.log(cart[cart.findIndex(i => i.name == localStorage.getItem('token'))].cart)
    this.user = localStorage.getItem('token')

    const { data: relevant } = await this.$http.get('goods/relevant', {
      params: {
        id: 4000635,
        limit: 16
      }
    })
    this.relevant = relevant.result
    setTimeout(() => {
      this.flag = true
    }, 500)
  },
  beforeUnmount() {}
}
</script>

<style lang="less" scoped>
.cart {
  background-color: #f5f5f5;
  .wrapper {
    .top {
      display: flex;
      align-items: center;
      height: 72px;
      a,
      i {
        font-size: 15px;
        margin-right: 5px;
      }
    }
    .goods {
      width: 100%;
      .nav,
      .item {
        height: 70px;
        width: 100%;
        display: flex;
        align-items: center;
        background-color: #fff;
        border-bottom: 1px solid #f5f5f5;
        .all,
        .remove,
        .goodsmsg,
        .price,
        .count,
        .total {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #666;
        }
        .all {
          input[type='checkbox'] {
            margin-right: 5px;
          }
          span {
            width: 32px;
          }
        }
        .goodsmsg {
          flex: 3.33;
          height: 100px;
          .left {
            height: 100%;
            width: 100px;
            margin-right: 8px;
          }
          .right {
            flex: 1;
            p {
              max-width: 270px;
              text-overflow: ellipsis;
              overflow: hidden;
            }
            .sku {
              cursor: pointer;
              margin-top: 10px;
              position: relative;
              .description {
                padding: 5px;
                max-width: 230px;
                font-size: 14px;
                color: #999;
                border: 1px solid #f5f5f5;
              }
              .selection {
                z-index: 2000;
                position: absolute;
                left: -1px;
                top: 40px;
                width: 440px;
                border: 1px solid #27ba9b;
                box-shadow: 2px 2px 4px #e6faf6;
                background: #fff;
                border-radius: 4px;
                font-size: 14px;
                padding: 20px;
                display: none;
                .sku1 {
                  display: flex;
                  align-items: center;
                  .left {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 10px;
                  }
                  .right {
                    display: flex;
                    flex-wrap: wrap;
                    max-width: 300px;
                    .checked {
                      border: 1px solid var(--lv);
                    }
                    img {
                      cursor: pointer;
                      border: 1px solid #e4e4e4;
                      width: 48px;
                      height: 48px;
                      margin-right: 10px;
                      margin-bottom: 5px;
                    }
                    span {
                      border: 1px solid #e4e4e4;
                      width: 130px;
                      margin-right: 10px;
                      margin-bottom: 5px;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      height: 30px;
                      cursor: pointer;
                    }
                  }
                }
              }
              .selection::before {
                content: '';
                width: 12px;
                height: 12px;
                border-left: 1px solid #27ba9b;
                border-top: 1px solid #27ba9b;
                position: absolute;
                left: 12px;
                top: -8px;
                background: #fff;
                transform: scaleX(0.8) rotate(45deg);
              }
              .selected {
                display: block;
                .el-button {
                  margin-top: 10px;
                }
                .el-button.is-text {
                  margin-left: 270px;
                }
              }
              .none .sku1,
              .none button {
                display: none;
              }
              .none {
                width: 440px;
                height: 200px;
              }
            }
          }
        }
        .price {
          flex: 1.833;
          font-size: 14px;
        }
        .count {
          flex: 1.5;

          a {
            display: block;
            width: 28px;
            height: 28px;
            text-align: center;
            line-height: 28px;
            background-color: #f5f5f5;
            border: 1px solid #e4e4e4;
          }
          em {
            width: 60px;
            height: 28px;
            text-align: center;
            border-top: 1px solid #e4e4e4;
            border-bottom: 1px solid #e4e4e4;
            line-height: 28px;
          }
        }
        .total {
          flex: 1.5;
          font-size: 16px;
        }
        .remove {
          flex: 1.166;
          a {
            color: var(--lv);
          }
        }
      }
      .item {
        height: 120px;
        .total {
          color: #cf4444;
        }
      }
    }
    .foot {
      margin: 20px 0;
      display: flex;
      height: 80px;
      align-items: center;
      background-color: #fff;
      padding-left: 30px;
      justify-content: space-between;
      color: #666;
      a {
        color: #666;
      }
      .emp {
        width: 300px;
      }
      .all {
        input[type='checkbox'] {
          margin-right: 5px;
        }
        span {
          width: 32px;
        }
      }
      span {
        min-width: 110px;
        em {
          font-size: 18px;
          margin-right: 20px;
          font-weight: 700;
          color: #cf4444;
        }
      }
      span :last-child {
        min-width: 200px;
      }
      button {
        border: 1px solid #27ba9b;
        background: #27ba9b;
        color: #fff;
        width: 180px;
        height: 50px;
        font-size: 16px;
        margin-right: 40px;
        border-radius: 5px;
        cursor: pointer;
      }
    }
  }
  .wrapper :deep(.goods-relevant) {
    margin-bottom: 0 !important;
  }
}
.cart.load {
  margin: 0 auto;
  width: 1240px;
  height: 500px;
  background-color: #fff;
  * {
    display: none;
  }
}
input[type='checkbox'] {
  cursor: pointer;
}
.item_none {
  width: 100%;
  height: 400px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  img {
    width: 180px;
    height: 120px;
  }
  span {
    color: #999;
    padding: 20px 0;
    font-size: 14px;
  }
  a {
    width: 180px;
    height: 50px;
    background-color: #27ba9b;
    color: #fff;
    border-radius: 5px;
    text-align: center;
    line-height: 50px;
    margin-bottom: 100px;
  }
}
.item_have {
  display: none;
  color: #fff;
}
</style>
