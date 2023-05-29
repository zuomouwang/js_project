<template>
  <div :class="['wrapper', flag ? 'OK' : '']">
    <div :class="['details']">
      <div class="head">
        <ul>
          <li index="1" @click="click_a">
            <a href="javascript:;" :class="[num == 1 ? 'click' : '']" index="1">商品详细</a>
          </li>
          <li index="2" @click="click_a">
            <a href="javascript:;" :class="[num == 2 ? 'click' : '']" index="2"> 商品评论</a>
          </li>
        </ul>
      </div>
      <div class="foot" v-if="flag">
        <ul>
          <li v-for="(i, index) in details.properties" :key="index">
            <span>{{ i.name }}</span>
            <span>{{ i.value }}</span>
          </li>
        </ul>
        <img v-for="(i, index) in details.pictures" :key="index" :src="i" alt="" />
      </div>
      <div class="goods-warn">
        <h3>注意事项</h3>
        <p class="tit">• 购买运费如何收取？</p>
        <p>
          单笔订单金额(不含运费)满88元免邮费；不满88元，每单收取10元运费。（港澳台地区需满500元免邮费；不满500元，每单收取30元运费)
        </p>
        <br />
        <p class="tit">• 使用什么快递发货?</p>
        <p>默认使用顺丰快递发货(个别商品使用其他快递)</p>
        <p>配送范围覆盖全国大部分地区(港澳台地区除外)</p>
        <br />
        <p class="tit">• 如何申请退货?</p>
        <p>
          1.自收到商品之日起30日内，顾客可申请无忧退货，退款将原路返还，不同的银行处理时间不同，预计1-5个工作日到账；
        </p>
        <p>2.内裤和食品等特殊商品无质量问题不支持退货；</p>
        <p>3.退货流程： 确认收货-申请退货-客服审核通过-用户寄回商品-仓库签收验货-退款审核-退款完成；</p>
        <p>
          4.因小兔鲜儿产生的退货，如质量问题，退货邮费由小兔鲜儿承担，退款完成后会以现金券的形式报销。因客户个人原因产生的退货，购买和寄回运费由客户个人承担。
        </p>
      </div>
    </div>
    <div class="hotday" v-if="flag">
      <ul class="item_all">
        <li><p>24小时热榜</p></li>
        <li class="item" v-for="c in details.hotByDay" :key="c.id">
          <a :href="'#/Goods/' + c.id" @click="aclick">
            <img :src="c.picture" alt="" />
          </a>
          <p>{{ c.name }}</p>
          <p class="price">￥{{ c.price }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: 1
    }
  },
  props: {
    details: {
      default: undefined
    },
    flag: {
      default: false
    }
  },
  methods: {
    click_a(e) {
      this.num = e.target.getAttribute('index')
    },
    aclick() {
      this.$router.push(location.hash.replace('#/', ''))
    }
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  display: none;
  .details {
    width: 940px;
    // margin-bottom: 20px;               //footer padding-top 20px
    // min-height: 30px;
    background-color: #fff;
    .head {
      width: 100%;
      height: 70px;
      ul {
        height: 100%;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #f5f5f5;
        li {
          display: block;
          height: 100%;
          line-height: 70px;
          padding: 0 30px;
          border-right: 1px solid #f5f5f5;
          a {
            display: block;
            height: 100%;
          }
        }
        .click {
          border-bottom: 1px solid var(--lv);
        }
      }
    }
    .foot {
      padding: 20px;
      ul {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 30px;
        li {
          display: block;
          width: 450px;
          min-height: 30px;
          display: flex;
          align-items: flex-start;
          span:first-child {
            margin-right: 30px;
            display: block;
            min-width: 100px;
            font-size: 12px;
            color: #999;
          }
          span {
            font-size: 12px;
            user-select: none;
          }
        }
      }
    }
    .goods-warn {
      user-select: none;
      padding: 30px 0;
      h3 {
        height: 70px;
        line-height: 70px;
        border-bottom: 1px solid #f5f5f5;
        padding-left: 50px;
        font-size: 18px;
        font-weight: 400;
        margin-bottom: 10px;
      }
      p {
        line-height: 40px;
        padding: 0 25px;
        color: #666;
      }
      p.tit {
        color: #333;
      }
    }
  }
  .hotday {
    width: 240px;
    margin-right: 30px;
    ul.item_all {
      li:first-child {
        background: #e26237;
        color: #fff;
      }
      li {
        background-color: #fff;
        margin-bottom: 20px;
        padding: 30px;
        a {
          display: block;
        }
        p {
          max-width: 200px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          font-size: 16px;
          text-align: center;
        }
        p.price {
          margin-top: 10px;
          color: #cf4444;
        }
      }
      li.active {
        z-index: 999;
        display: flex;
        opacity: 1;
      }
    }
  }
}
.OK {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
</style>
