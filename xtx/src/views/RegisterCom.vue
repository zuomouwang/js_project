<template>
  <div class="login" v-loading="loading">
    <div class="wrapper">
      <div class="left">
        <router-link to="/"></router-link>
      </div>
      <div class="center">
        <h3 v-if="type == 1">欢迎登录</h3>
        <h3 v-else>欢迎注册</h3>
      </div>
      <div class="right">
        <router-link to="/">
          进入网站首页 <el-icon><ArrowRight /></el-icon><el-icon><ArrowRight /></el-icon>
        </router-link>
      </div>
    </div>
    <div class="middle">
      <div class="user">
        <h3 v-if="type == 1">账户登录</h3>
        <h3 v-else>账户注册</h3>
        <div class="username">
          <div class="left">
            <el-icon><UserFilled /></el-icon>
          </div>
          <input type="text" v-model="name" />
          <em v-if="!nameflag">
            <el-icon><WarningFilled /></el-icon>
            <p>英文字母开头且只能有3-12位</p>
          </em>
        </div>
        <div class="userpassword">
          <div class="left">
            <el-icon><MoreFilled /></el-icon>
          </div>
          <input type="password" ref="password" v-model="password" />
          <el-icon class="checked" v-if="checkedView" @click="iclick"><View /></el-icon>
          <el-icon class="checked" v-else @click="iclick"><Hide /></el-icon>
          <em v-if="!passwordflag">
            <el-icon><WarningFilled /></el-icon>
            <p>只能由7-16位英文字母和阿拉伯数字组成</p>
          </em>
        </div>
        <div class="agree">
          <input type="checkbox" v-model="checked" />
          <p>我已同意<a href="JavaScript:;">《隐私条款》</a>和 <a href="JavaScript:;">《服务条款》</a></p>
          <em v-if="!checked">
            <el-icon><WarningFilled /></el-icon>
            <p>只能由7-16位英文字母和阿拉伯数字组成</p>
          </em>
        </div>
        <div class="btn">
          <button class="elbtn" @click="login">
            <p href="JavaScript:;" v-if="type == 1">登录</p>
            <p href="JavaScript:;" v-if="type != 1">注册</p>
          </button>
          <router-link to="/login/2" v-if="type == 1">去注册</router-link>
          <router-link to="/login/1" v-if="type != 1">去登录</router-link>
        </div>
      </div>
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
</template>

<script>
function Account(name) {
  this.name = name
  this.cart = []
}
function User(name, password) {
  this.name = name
  this.password = password
}
import { ElMessage, ElMessageBox } from 'element-plus'

export default {
  data() {
    return {
      name: 'zxw',
      password: '1234567',
      checkedView: false, //显示密码标志
      checked: true, //单选框标志
      loading: false //点击登录或者注册按钮时的加载效果
    }
  },
  computed: {
    nameflag() {
      let regex = /^[A-Za-z][A-Za-z0-9]{2,11}$/
      if (regex.exec(this.name)) {
        return true
      } else {
        return false
      }
    },
    passwordflag() {
      let regex = /^[A-Za-z0-9]{7,16}$/
      if (regex.exec(this.password)) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    iclick() {
      this.checkedView = !this.checkedView
      if (this.checkedView) {
        this.$nextTick(() => {
          this.$refs.password.setAttribute('type', 'text')
        })
      } else {
        this.$nextTick(() => {
          this.$refs.password.setAttribute('type', 'password')
        })
      }
    },
    login() {
      if (!this.nameflag) {
        ElMessage({
          type: 'error',
          message: '用户名不符合规范',
          duration: 1000,
          showClose: true
        })
        return
      } else if (!this.passwordflag) {
        ElMessage({
          type: 'error',
          message: '密码不符合规范',
          duration: 1000,
          showClose: true
        })
        return
      } else if (!this.checked) {
        ElMessage({
          type: 'error',
          message: '请勾选同意协议',
          duration: 1000,
          showClose: true
        })
        return
      }
      if (this.type != 1) {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          let user = JSON.parse(localStorage.getItem('user'))
          let account = JSON.parse(localStorage.getItem('account'))
          let index = user.findIndex(e => {
            return e.name == this.name
          })
          if (index == -1) {
            let user1 = new User(this.name, this.password)
            user.push(user1)
            let account1 = new Account(this.name)
            account.push(account1)
            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('account', JSON.stringify(account))
            ElMessageBox.alert('注册成功', '提示', {
              autofocus: false,
              confirmButtonText: '去登录',
              callback: value => {
                this.name = ''
                this.password = ''
                if (value == 'confirm') {
                  this.$router.push('/login/1')
                }
              }
            })
          } else {
            ElMessageBox.alert('注册失败,已有相同用户名存在', '提示', {
              autofocus: false,
              confirmButtonText: '重新注册',
              callback: () => {
                this.name = ''
                this.password = ''
              }
            })
          }
        }, 500)
        return
      } else {
        this.loading = true
        setTimeout(() => {
          let user = JSON.parse(localStorage.getItem('user'))
          let index = user.findIndex(e => {
            return e.name == this.name
          })
          let flag = false
          if (index != -1) {
            if (user[index].password == this.password) flag = true
          }
          if (!flag) {
            this.loading = false
            ElMessage({
              type: 'error',
              message: '登录失败,用户名不存在或者密码错误',
              duration: 2000,
              showClose: true
            })
          } else {
            // this.loading = false
            ElMessage({
              type: 'success',
              message: '登录成功,即将跳转首页',
              duration: 1000,
              showClose: true
            })
            localStorage.setItem('token', this.name)
            setTimeout(() => {
              this.$router.push('/')
            }, 1000)
          }
        }, 500)
        return
      }
    }
  },
  props: {
    type: {
      default: 1
    }
  },
  created() {}
}
</script>

<style lang="less" scoped>
.login {
  user-select: none;
  .wrapper {
    display: flex;
    align-items: flex-end;
    .left {
      width: 200px;
      height: 132px;
      background-image: url('../../public/img/logo.png');
      background-repeat: no-repeat;
      background-size: contain;
      background-position: 0 50px;
      margin-right: 30px;
      a {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .center {
      flex: 1;
      cursor: default;
      h3 {
        color: #666;
        font-weight: 400;
        font-size: 23px;
      }
    }
    .right {
      a {
        display: flex;
        font-size: 15px;
        align-items: center;
        i {
          font-size: 15px;
        }
      }
    }
  }
  .middle {
    position: relative;
    margin-top: 30px;
    width: 100%;
    height: 488px;
    background-image: url('../../public/img/login-bg.png');
    background-repeat: no-repeat;
    background-size: cover;
    .user {
      padding: 20px;
      position: absolute;
      width: 340px;
      min-height: 400px;
      background-color: #fff;
      left: 56%;
      top: 10%;
      h3 {
        width: 100%;
        text-align: center;
        height: 50px;
        line-height: 50px;
        color: var(--lv);
        cursor: pointer;
        user-select: none;
        border-bottom: 1px solid #f5f5f5;
      }
      .username,
      .userpassword {
        margin-top: 30px;
        width: 300px;
        height: 38px;
        border: 1px solid #f5f5f5;
        display: flex;
        position: relative;
        .left {
          width: 38px;
          height: 38px;
          background-color: #ccc;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 10px;
          i {
            font-size: 20px;
            color: #fff;
          }
        }
        input[type='password'],
        input[type='text'] {
          flex: 1;
          height: 100%;
          max-width: 180px;
        }
        input[type='password']::-ms-reveal {
          display: none;
        }
        .checked {
          position: absolute;
          right: 10%;
          top: 50%;
          transform: translate(0, -50%);
          font-size: 20px;
          cursor: pointer;
        }
        em {
          user-select: none;
          bottom: -70%;
          position: absolute;
          display: flex;
          min-width: 250px;
          color: #cf4444;
          i {
            margin-right: 5px;
          }
          p {
            font-size: 10px;
          }
        }
      }
      .agree {
        position: relative;
        margin-top: 50px;
        display: flex;
        align-items: center;
        input[type='checkbox'] {
          width: 13px;
        }
        p {
          margin-left: 10px;
          font-size: 10px;
          a {
            color: #069;
          }
        }
        em {
          user-select: none;
          bottom: -137%;
          position: absolute;
          display: flex;
          min-width: 250px;
          color: #cf4444;
          i {
            margin-right: 5px;
          }
          p {
            font-size: 10px;
          }
        }
      }
      .btn {
        height: 100px;
        .elbtn {
          cursor: pointer;
          margin-top: 30px;
          text-align: center;
          line-height: 40px;
          display: block;
          width: 100%;
          height: 40px;
          background-color: var(--lv);
          margin-bottom: 10px;
          border: 0px solid #000;
          p {
            display: block !important;
            width: 100% !important;
            height: 100% !important;
            color: #fff;
          }
        }
        a {
          margin: 0 auto;
          color: #ccc;
        }
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
</style>
