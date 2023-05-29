<template>
  <footer class="app-footer">
    <div class="contact">
      <div class="container">
        <dl>
          <dt>客户服务</dt>
          <dd><i class="iconfont icon-kefu"></i> 在线客服</dd>
          <dd><i class="iconfont icon-31wentifankui"></i> 问题反馈</dd>
        </dl>
        <dl>
          <dt>关注我们</dt>
          <dd><i class="iconfont icon-weixin"></i> 公众号</dd>
          <dd><i class="iconfont icon-weibo"></i> 微博</dd>
        </dl>
        <dl>
          <dt>下载APP</dt>
          <dd class="qrcode"><img src="../../../public/img/erweima.jpg" /></dd>
          <dd class="download"><span>扫描二维码</span><span>立马下载APP</span><a href="javascript:;">下载页面</a></dd>
        </dl>
        <dl>
          <dt>服务热线</dt>
          <dd class="hotline">400-0000-000 <small>周一至周日 8:00-18:00</small></dd>
        </dl>
      </div>
    </div>
    <div class="footer">
      <div class="wrapper">
        <div class="top">
          <ul>
            <li>
              <!-- 通过伪元素添加标签实现精灵图 -->
              <span>价格亲民</span>
            </li>
            <li>
              <span>物流快捷</span>
            </li>
            <li>
              <span>品质新鲜</span>
            </li>
          </ul>
        </div>
        <div class="bottom">
          <ul>
            <li><a href="javaScript:;">关于我们</a></li>
            <li><a href="javaScript:;">帮助中心</a></li>
            <li><a href="javaScript:;">售后服务</a></li>
            <li><a href="javaScript:;">配送与验收</a></li>
            <li><a href="javaScript:;">商务合作</a></li>
            <li><a href="javaScript:;">搜索推荐</a></li>
            <li><a href="javaScript:;">友情链接</a></li>
          </ul>
          <p>CopyRight @ 小兔鲜儿</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
.app-footer {
  overflow: hidden;
  background-color: #f5f5f5;      
  padding-top: 20px;        // GoodsIntr margin-bottom: 20px;
  // margin-top: 20px;
  .contact {
    background: #fff;
    .container {
      padding: 60px 0 40px 25px;
      display: flex;
      width: 1240px;
      margin: 0 auto;
      position: relative;
      dl {
        height: 190px;
        text-align: center;
        padding: 0 72px;
        border-right: 1px solid #f2f2f2;
        color: #999;
        dt {
          line-height: 1;
          font-size: 18px;
        }
        dd {
          cursor: pointer;
          margin: 36px 12px 0 0;
          float: left;
          width: 92px;
          height: 92px;
          padding-top: 10px;
          border: 1px solid #ededed;
          .iconfont {
            font-size: 36px;
            display: block;
            color: #666;
          }
        }
        .qrcode {
          width: 92px;
          height: 92px;
          padding: 7px;
          border: 1px solid #ededed;
          img {
            max-width: 100%;
            max-height: 100%;
            vertical-align: middle;
          }
        }
        .download {
          padding-top: 5px;
          font-size: 14px;
          width: auto;
          height: auto;
          border: none;
          span {
            display: block;
          }
          a {
            display: block;
            line-height: 1;
            padding: 10px 25px;
            margin-top: 5px;
            color: #fff;
            border-radius: 2px;
            background-color: #27ba9b;
          }
        }
        .hotline {
          padding-top: 20px;
          font-size: 22px;
          color: #666;
          width: auto;
          height: auto;
          border: none;
          small {
            display: block;
            font-size: 15px;
            color: #999;
          }
        }
        dd:hover .iconfont {
          color: #27ba9b;
        }
        dd:last-child {
          margin-right: 0;
        }
      }
      dl:first-child {
        padding-left: 0;
      }
      dl:last-child {
        border-right: none;
        padding-right: 0;
      }
    }
  }
  .footer {
    height: 342px;
    background-color: #333;
    .wrapper {
      .top {
        height: 175px;
        border-bottom: 3px solid #434343;
        ul {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-around;
          li {
            cursor: pointer;
            position: relative;
            float: left;
            width: 195px;
            height: 58px;
            line-height: 58px;
            span {
              margin-left: 77px;
              font-size: 28px;
              color: #fff;
            }
          }
          li::before {
            position: absolute;
            left: 0;
            top: 0;
            content: '';
            width: 58px;
            height: 58px;
            background-image: url(../../../public/img/sprites.png);
            vertical-align: middle;
          }
        }
      }
      .bottom {
        display: flex;
        flex-direction: column;
        align-items: center;
        ul {
          margin-top: 30px;
          width: 520px;
          height: 20px;
          display: flex;
          justify-content: space-around;
          li {
            a {
              font-size: 14px;
              color: #999;
              border-right: 1px solid #cccccca1;
              padding-right: 5px;
            }
          }
          li:last-child {
            a {
              border-right: 0px solid #cccccca1;
            }
          }
        }
        p {
          cursor: pointer;
          margin-top: 30px;
          font-size: 14px;
          color: #999;
        }
      }
    }
  }
}
</style>
