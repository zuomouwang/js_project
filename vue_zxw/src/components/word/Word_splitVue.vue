<template>
  <div class="word_split">
    <ul class="item_all">
      <li v-for="(i, index) in data.word_list" :key="index" :class="['item', index <= data.index - 1 ? 'right' : '']">
        {{ i }}
      </li>
    </ul>
    <div class="translation">
      <p>v. 添加，掺入,（使）相加，加<br />abbr. 注意力缺陷障碍，多动症（ADD）</p>
    </div>
    <Teleport to="body">
      <audio src="/audio/right.wav" ref="Ref"></audio>
      <audio src="/audio/right2.wav" ref="Ref1"></audio>
      <el-dialog v-model="dialog_dip_flag" title="温馨提示" width="30%" center>
        <span> 已经是当前组最后一个单词了 </span>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialog_dip_flag = false">取消</el-button>
            <el-button type="primary" @click="dialog_cxks"> 重新开始 </el-button>
          </span>
        </template>
      </el-dialog>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, reactive, watch, onMounted, onUnmounted } from 'vue'
import { ElNotification } from 'element-plus'
import { useInputListener } from '../../hook/word_input.js'
import { wordStore } from '../../stores/counter.js'
import CryptoJS from 'crypto-js'
import MD5 from '../../hook/md5.js'
import axios from 'axios'

const store = wordStore()
const props = defineProps(['word'])

const data = reactive({
  index: 0
})

//初始化单词
data.alphabet = ''
//单词练完对话框弹窗标志
let dialog_dip_flag = ref(false)
//按键输入事件是否开启标志
data.word_input_flage = true
//单词练完对话框弹窗重新开始点击事件
function dialog_cxks() {
  dialog_dip_flag.value = false
  store.word.settings.id = 0
}
//切割单词为字母
data.word_list = computed(() => {
  if (data.isempty) {
    return '待添加'.split('')
  } else {
    return props.word.split('')
  }
})
//检测传递单词是否为空
data.isempty = computed(() => {
  return props.word == ''
})
//是否切换下一个单词标志
data.nextFlag = computed(() => {
  if (data.index == data.word_list.length) {
    return true
  }
  if (data.index == 0) {
    return false
  }
  return false
})
//对多次输入同一字母进行处理
watch(
  () => data.alphabet,
  () => {
    let rule = /^[a-zA-Z]$/
    if (rule.exec(data.alphabet.split('')[0])) {
      if (data.alphabet.split('').length != 1) {
        if (data.alphabet.split('')[1] != '!') {
          data.audio_errorPlay()
          data.index = 0
          return
        }
      }
    }
    if (rule.exec(data.alphabet.split('')[0]) && data.alphabet.split('')[0] === data.word_list[data.index]) {
      data.audio_rightPlay()
      ElNotification({
        title: '',
        message: data.word_list[data.index],
        type: 'success',
        duration: 300
      })
      data.index = data.index + 1
    } else {
      ElNotification({
        title: '',
        message: data.alphabet.split('')[0],
        type: 'error',
        duration: 300
      })
      data.audio_errorPlay()
      data.index = 0
    }
  },
  {
    immediate: false
  }
)
//切换下一个单词
watch(
  () => data.nextFlag,
  val => {
    if (val) {
      data.index = 0
      //设置单词是否拼标志为真
      store.word.wordData[store.word.settings.group].wordList[store.word.settings.id].isWrite = true
      // console.log(store.word.wordData[store.word.settings.group].wordList.length, store.word.settings.id)
      // 单词索引加一(切换下一个单词)
      if (store.word.settings.id + 1 == store.word.wordData[store.word.settings.group].wordList.length) {
        dialog_dip_flag.value = true
      } else {
        store.word.settings.id = store.word.settings.id + 1
      }
    }
  }
)
//监听传递单词是否为空的标志如果为真这不接收按键返回值
watch(
  () => data.isempty,
  val => {
    if (!val) {
      data.alphabet = useInputListener()
    }
  },
  {
    immediate: true
  }
)
//监听props的变化
watch(
  () => props.word,
  () => {
    data.index = 0
  }
)
let Ref = ref()
let Ref1 = ref()
onMounted(() => {
  data.timer = setInterval(() => {
    localStorage.setItem('word', JSON.stringify(store.word))
  }, 500)

  data.audio_rightPlay = () => {
    Ref.value.currentTime = 0
    Ref1.value.currentTime = 0
    if (store.word.settings.mute) Ref.value.volume = 0
    else Ref.value.volume = 1
    Ref.value.play()
  }
  data.audio_errorPlay = () => {
    Ref1.value.currentTime = 0
    Ref.value.currentTime = 0
    if (store.word.settings.mute) Ref1.value.volume = 0
    else Ref1.value.volume = 1
    Ref1.value.play()
  }
})
onUnmounted(() => {
  clearInterval(data.timer)
})
//发起百度翻译请求
function ajax_entozh_bd(word) {
  var appid = '20230304001586140'
  var key = 'mSO32J2kvZnLYoUS9jZw'
  var salt = new Date().getTime()
  var query = word
  var from = 'en'
  var to = 'zh'
  var str1 = appid + query + salt + key
  var sign = MD5(str1)
  axios({
    url: 'https://api.fanyi.baidu.com/api/trans/vip/translate',
    type: 'get',
    dataType: 'jsonp',
    data: {
      q: query,
      appid: appid,
      salt: salt,
      from: from,
      to: to,
      sign: sign
    }
  })
    .then(({ data }) => {
      console.log(data)
    })
    .catch(err => {
      console.log(err)
    })
}
ajax_entozh_bd('apple')
// 发起网易云翻译请求
function truncate(q) {
  var len = q.length
  if (len <= 20) return q
  return q.substring(0, 10) + len + q.substring(len - 10, len)
}
function ajax_entozh_wyy(word) {
  var appKey = '7832b475af84bda1'
  var key = 'fKqEZcPHzXCGD6CfdSqVW29ByQzZzOLt' //注意：暴露appSecret，有被盗用造成损失的风险
  var salt = new Date().getTime()
  var curtime = Math.round(new Date().getTime() / 1000)
  var query = word
  // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
  var from = 'zh-CHS'
  var to = 'en'
  var str1 = appKey + truncate(query) + salt + curtime + key
  var vocabId = '23DF370EA91940878FB1C94711110C14'

  var sign = CryptoJS.SHA256(str1).toString(CryptoJS.enc.Hex)
  axios({
    url: 'https://openapi.youdao.com/api',
    type: 'post',
    dataType: 'jsonp',
    data: {
      q: query,
      appKey: appKey,
      salt: salt,
      from: from,
      to: to,
      sign: sign,
      signType: 'v3',
      curtime: curtime,
      vocabId: vocabId
    }
  })
    .then(data => {
      console.log(data)
      // if (data.errorCode == 0 && data.basic) {
      //   let adj, n, v
      //   let str
      //   adj = ''
      //   n = ''
      //   v = ''
      //   if (data.basic.explains.length < 2) {
      //     adj = data.basic.explains[0].split('；')
      //     adj.splice(2, adj.length - 2)
      //     str = adj.join()
      //   } else if (data.basic.explains.length < 3) {
      //     adj = data.basic.explains[0].split('；')
      //     adj.splice(2, adj.length - 2)
      //     n = data.basic.explains[1].split('；')
      //     n.splice(2, n.length - 2)
      //     str = adj.join() + '<br>' + n.join()
      //   } else if (data.basic.explains.length < 4) {
      //     adj = data.basic.explains[0].split('；')
      //     adj.splice(2, adj.length - 2)
      //     n = data.basic.explains[1].split('；')
      //     n.splice(2, n.length - 2)
      //     v = data.basic.explains[2].split('；')
      //     v.splice(2, v.length - 2)
      //     str = adj.join() + '<br>' + n.join() + '<br>' + v.join()
      //   } else {
      //     adj = data.basic.explains[0].split('；')
      //     adj.splice(2, adj.length - 2)
      //     n = data.basic.explains[1].split('；')
      //     n.splice(2, n.length - 2)
      //     v = data.basic.explains[2].split('；')
      //     v.splice(2, v.length - 2)
      //     str = adj.join() + '<br>' + n.join() + '<br>' + v.join()
      //   }
      //   $('.zh span').html(str)
      //   arr[index].wyy = str
      //   array[arr[0].group + 1] = arr
      //   set(array)
      // }
    })
    .catch(err => {
      console.log(err.message)
    })
}
</script>

<style lang="less" scoped>
.word_split {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 600px;
  // background-color: pink;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .item_all {
    border-radius: 50px;
    box-shadow: rgba(0, 0, 0, 0.1) 5px 5px 10px 6px;
    width: 100%;
    height: 200px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    .item {
      margin: 0 3px;
      font-size: 50px;
      color: #c6e2ff;
      text-shadow: 2px 2px 4px #71a7e3de;
    }
    .right {
      color: #79bbff;
    }
  }
  .translation {
    p {
      color: #00000091;
      padding: 20px;
      margin-top: 50px;
      background: #fff;
      border-radius: 5px;
      box-shadow: rgba(0, 0, 0, 0.1) 5px 5px 10px 3px;
      text-align: center;
    }
  }
}
</style>
