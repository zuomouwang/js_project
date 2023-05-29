<template>
  <div class="latest-topic">
    <div class="wrapper">
      <div class="top">
        <h2>{{ title }}</h2>
        <a href="javascript:;">
          <span>查看全部</span><el-icon><ArrowRight /></el-icon>
        </a>
      </div>
      <div class="bottom" v-if="flag">
        <div class="item" v-for="i in res" :key="i.id">
          <div class="head">
            <img :src="i.cover" :alt="i.title" />
            <div class="cover"></div>
            <div class="content">
              <div class="left">
                <h1>{{ i.title }}</h1>
                <p>{{ i.summary }}</p>
              </div>
              <div class="right">
                <span>￥{{ i.lowestPrice }}</span>
              </div>
            </div>
          </div>
          <div class="body">
            <div class="left">
              <div class="like">
                <el-icon><Star /></el-icon>
                <span>{{ i.collectNum }}</span>
              </div>
              <div class="views">
                <el-icon><View /></el-icon>
                <span>{{ i.viewNum }}</span>
              </div>
            </div>
            <div class="comment">
              <el-icon><ChatDotSquare /></el-icon>
              <span>{{ i.replyNum }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom" v-if="!flag">
        <div class="item" v-for="i in res" :key="i.id">
          <div class="head" v-load="flag"></div>
          <div class="body">
            <div class="left">
              <div class="like" v-load="flag"></div>
              <div class="views" v-load="flag"></div>
            </div>
            <div class="comment" v-load="flag"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      res: [{ id: 1 }, { id: 2 }, { id: 3 }],
      title: '最新专题',
      flag: false
    }
  },
  async created() {
    const { data: res } = await this.$http('/home/special')
    if (res.msg === '操作成功') {
      this.res = res.result
      this.flag = true
    }
  }
}
</script>

<style lang="less" scoped>
.latest-topic {
  height: 500px;
  width: 100%;
  background-color: var(--hui);
  .wrapper {
    .top {
      margin-bottom: 10px;
      width: 100%;
      height: 80px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      h2 {
        font-weight: normal;
        font-size: 30px;
        cursor: default;
      }
      a {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #33333387;
      }
      a:hover {
        color: var(--lv);
      }
    }
    .bottom {
      width: 100%;
      height: 400px;
      display: flex;
      justify-content: space-between;
      .item {
        width: 400px;
        height: 360px;
        // background-color: red;
        transition: all 0.3s;
        .head {
          cursor: pointer;
          width: 100%;
          height: 290px;
          position: relative;
          img {
            object-fit: cover;
          }
          .cover {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 145px;
            background-image: linear-gradient(to bottom, transparent, #333);
          }
          .content {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100px;

            color: #fff;
            padding: 10px;
            display: flex;
            align-items: center;
            justify-content: space-around;
            .left {
              max-width: 260px;
              height: 100%;
              h1,
              p {
                font-weight: normal;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              p {
                color: #ccc;
              }
            }
            .right {
              span {
                border-radius: 5px;
                padding: 5px;
                color: #cf4444;
                background-color: #fff;
              }
            }
          }
        }
        .body {
          width: 100%;
          height: 70px;
          background-color: #fff;
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .left {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .like {
              margin-right: 10px;
            }
            .like,
            .views {
              cursor: pointer;
              display: flex;
              justify-content: space-between;
              align-items: center;
              min-width: 50px;
              min-height: 20px;
              i {
                font-size: 20px;
              }
              span {
                margin-left: 5px;
              }
            }
          }
          .comment {
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            min-width: 50px;
            min-height: 20px;
            i {
              font-size: 20px;
            }
            span {
              margin-left: 5px;

              // font-size: 14px;
            }
          }
        }
      }
      .item:hover {
        transform: translate3d(-2px, -2px, 0);
        box-shadow: #ccc 2px 4px 6px 3px;
      }
    }
  }
}
</style>
