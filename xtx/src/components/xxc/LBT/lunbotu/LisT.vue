<template>
  <div class="List-container" @pointerleave="pointer_out">
    <div class="List">
      <ul class="ul-list" v-load="status">
        <!-- indexLs 给li绑定一个元素下标 -->
        <li class="li-list" v-for="(item, index) in data" :key="item.id" :indexLs="index" @pointerenter="pointer_in">
          <a href="javaScript:;">{{ item.name }}</a>
          <a href="javaScript:;">{{ item.children[0].name }}</a>
          <a v-if="item.children[1] !== undefined" href="javaScript:;">{{ item.children[1].name }}</a>
        </li>
      </ul>
    </div>
    <div class="ListAll" ref="show">
      <div class="h">
        <h4>分类推荐</h4>
        <a href="javaScript:;" v-for="(item, index) in children" :key="item.id">{{ children[index].name }}</a>
      </div>
      <ul class="ul-goods">
        <li class="li-goods" v-for="item in goods.slice(0, 9)" :key="item.id">
          <a :href="'#/Goods/' + item.id">
            <img :src="item.picture" alt="" />
            <div class="li-r">
              <h4>{{ item.name }}</h4>
              <p>{{ item.desc }}</p>
              <div class="bobox">
                <i>¥</i><span class="v">{{ item.price }}</span>
              </div>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import bus from '../../../../eventBus'
export default {
  props: ['indexLs'],
  data() {
    return {
      status: false,
      data: [], //总数据
      indexls: 0, //pointer进入小li下标
      children: [], //indexls下标 小li中的children商品分类
      goods: [] //indexls下标 小li中的goods商品 (热门推荐所需数据 (动态))
    }
  },
  methods: {
    pointer_in(e) {
      //鼠标进入li列表显示对应内容 分类推荐
      this.$refs.show.style.display = 'block'
      // indexLs 获取当前处于哪个li元素
      this.indexls = e.target.getAttribute('indexLs')
      //pointer小li的children商品分类
      this.children = this.data[this.indexls].children
      //pointer小li中的具体商品,根据元素变换动态绑定数据
      this.goods = this.data[e.target.getAttribute('indexLs')].goods
    },
    pointer_out() {
      //鼠标移出lunbotu区域隐藏 热门推荐
      this.$refs.show.style.display = 'none'
    }
  },
  created() {
    //接收外部传递过来的总数据 存到data
    bus.on('getIndex', value => {
      this.data = value.data.result.categoryBanners
      // console.log(this.data)
      if (value.status === 200) {
        this.status = true
      }
    })
  }
}
</script>

<style lang="less" scoped>
.List-container {
  position: absolute;
  top: 0;
  // width: 1240px;
  // height: 500px;
  .List {
    position: absolute;
    top: 0;
    // left: 0;
    display: flex;
    width: 250px;
    height: 500px;
    background-color: rgba(#141516, 0.8);
    .ul-list {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 250px;
      height: 500px;
      .li-list {
        padding: 0px 15px;
        width: 250px;
        height: 50px;
        line-height: 50px;
        transition: all 0.5s;
        &:hover {
          background-color: #27ba9b;
          padding: 0px 20px;
        }
        a {
          padding-left: 8px;
          color: #d8d5d5;
          font-size: 14px;
          &:first-child {
            font-size: 16px;
            color: #ffffff;
          }
        }
      }
    }
  }
  .ListAll {
    position: absolute;
    top: 0px;
    left: 250px;
    width: 990px;
    height: 500px;
    padding: 0 15px;
    background-color: hsla(0, 0%, 100%, 0.8);
    display: none;
    .h {
      display: flex;
      // justify-content: center;
      align-items: center;
      height: 80px;
      h4 {
        margin-left: 10px;
        font-size: 20px;
        font-weight: 700;
        line-height: 80px;
        color: rgb(0, 0, 0);
      }
      a {
        margin: 30px;
        padding: 10px;
        color: rgb(46, 46, 46);
        border-radius: 10%;
        transition: all 0.5s;
        &:hover {
          background-color: #f0f0f0;
          color: #151515;
        }
      }
    }
    .ul-goods {
      display: flex;
      flex-wrap: wrap;
      .li-goods {
        width: 310px;
        height: 120px;
        margin-right: 10px;
        margin-bottom: 15px;
        border: 1px solid #eee;
        border-radius: 6px;
        background: #fff;
        transition: background-color 0.5s;
        &:hover {
          background-color: #e3f9f4;
        }
        a {
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          padding: 10px;
          img {
            width: 95px;
            height: 95px;
            border-radius: 4px;
          }
          .li-r {
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 195px;
            height: 120px;
            padding: 10px;
            overflow: hidden;
            h4 {
              font-size: 16px;
              width: 175px;
              font-weight: normal;
              color: #666;
            }
            p {
              font-size: 12px;
              margin: 2px 0;
              color: #999;
              width: 166px; /* 设置p标签的宽度为300像素 */
              overflow: hidden; /* 将超出宽度的内容隐藏 */
              text-overflow: ellipsis; /* 将截断的文本以省略号表示 */
              white-space: nowrap; /* 防止文本换行 */
            }
            .bobox {
              i {
                color: #da4444;
              }
              span.v {
                margin-left: 3px;
                font-size: 22px;
                color: #da4444;
              }
            }
          }
        }
      }
    }
  }
}
</style>
