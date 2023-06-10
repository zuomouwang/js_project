<template>
  <div class="app_word">
    <div class="left">
      <el-menu class="el-menu-vertical-demo" :collapse="isCollapse">
        <el-sub-menu index="1--">
          <template #title>
            <el-icon><Memo /></el-icon>
            <span>{{ store.word.wordData[store.word.settings.group].groupName }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              v-for="i in store.word.wordData"
              :key="i.id"
              :index="i.groupName"
              :data-group="i.groupName"
              @contextmenu.prevent="rclick_group"
              @click="click_group"
            >
              <el-icon><Paperclip /></el-icon>
              <span>{{ i.groupName }}</span>
            </el-menu-item>
          </el-menu-item-group>
          <!-- <el-icon><CirclePlus /></el-icon> -->
          <el-menu-item @click="addGroup($event)" index="10230aa" v-if="isshow">
            <el-icon><CirclePlus /></el-icon>
            <span>添加分组</span>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2--">
          <template #title>
            <el-icon v-if="store.word.settings.mute == true"><MuteNotification /></el-icon>
            <el-icon v-else><Bell /></el-icon>
            {{ store.word.settings.mute == true ? '静音' : '非静音' }}
          </template>
          <!-- store.word.settings.mute -->
          <el-menu-item-group>
            <el-menu-item index="2-1" :disabled="store.word.settings.mute" @click="muteChenge">
              <el-icon><MuteNotification /></el-icon>
              <span>静音</span>
            </el-menu-item>
            <el-menu-item index="2-2" :disabled="!store.word.settings.mute" @click="muteChenge">
              <el-icon><Bell /></el-icon>
              <span>不静音</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-sub-menu index="3--">
          <template #title>
            <el-icon><Connection /></el-icon>
            {{ store.word.settings.translate == 'wyy' ? '网易云翻译' : '百度翻译' }}
          </template>
          <el-menu-item-group>
            <el-menu-item
              @click="transkateChange"
              index="3-1"
              :disabled="store.word.settings.translate == 'wyy' ? true : false"
            >
              <el-icon><Paperclip /></el-icon>
              <span> 网易云翻译</span>
            </el-menu-item>
            <el-menu-item
              @click="transkateChange"
              index="3-2"
              :disabled="store.word.settings.translate == 'wyy' ? false : true"
            >
              <el-icon><Paperclip /></el-icon>
              <span> 百度翻译</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-menu-item index="4--" @click="clickWordlist">
          <el-icon><document /></el-icon>
          <template #title>单词列表</template>
        </el-menu-item>
      </el-menu>
    </div>
    <WordSplit :word="store.word.wordData[store.word.settings.group].wordList[store.word.settings.id].word"></WordSplit>
  </div>

  <teleport to="body">
    <el-dialog
      v-model="wordListflage"
      :title="store.word.wordData[store.word.settings.group].groupName"
      :lock-scroll="false"
      @close="close_dialog_wordList"
    >
      <div class="wordListnav">
        <div class="text_wrodlist">已完成的---<span class="spelled_wordlist"></span></div>
        <div class="text_wrodlist">当前的---<span class="active_wordlist"></span></div>
        <div class="text_wrodlist">右键单词编辑</div>
      </div>
      <ul class="wordListdip">
        <li
          v-for="(i, index) in store.word.wordData[store.word.settings.group].wordList"
          :key="i.word"
          :data-index="index"
          :class="[
            store.word.wordData[store.word.settings.group].wordList[index].isWrite ? 'spelled_wordlist' : '',
            index == store.word.settings.id ? 'active_wordlist' : '',
            index == rclick_active ? 'animate__headShake' : '',
            'animate__animated'
          ]"
          @contextmenu.prevent="rclick_wordlist"
        >
          {{ i.word }}
        </li>
        <li data-index="add_word" @click="add_word">
          <el-icon><CirclePlus /></el-icon>
          <span>添加单词</span>
        </li>
      </ul>
    </el-dialog>
    <Rclick v-show="rclick_flag" :y="rclick_xy.y" :x="rclick_xy.x">
      <div class="delete rclick_item" @click="rclick_delete">
        <el-icon><Delete /></el-icon> <span>删除</span>
      </div>
      <div class="current rclick_item" @click="rclick_current">
        <el-icon><Notification /></el-icon> <span>从当前开始</span>
      </div>
      <div class="alter rclick_item" @click="rclick_alter">
        <el-icon><EditPen /></el-icon> <span>修改单词</span>
      </div>
    </Rclick>
    <Rclick v-show="rclick_group_flag" :y="rclick_xy.y" :x="rclick_xy.x" class="rclick_group">
      <div class="group rclick_item" @click="rclick_changegroup">
        <el-icon><EditPen /></el-icon> <span>修改分组名</span>
      </div>
      <div class="delete rclick_item" @click="rclick_deletegroup" v-if="store.word.wordData.length > 1">
        <el-icon><EditPen /></el-icon> <span>删除分组</span>
      </div>
    </Rclick>
  </teleport>
</template>

<script setup>
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'
import WordSplit from './Word_splitVue.vue'
import { wordStore } from '../../stores/counter.js'
import { ElNotification, ElMessageBox } from 'element-plus'
import { getAlphabet } from '../../hook/word_input'
import Rclick from './Word_rclickVue.vue'
//是否展开
let isCollapse = ref(false)
//是否显示单词列表右键编辑选项
let rclick_flag = ref(false)
//获取右击鼠标的坐标
let rclick_xy = reactive({
  x: 0,
  y: 0
})
//隐藏添加分组的标志
let isshow = computed(() => {
  return store.word.wordData.length < 7
})
//单词列表弹出框标志
let wordListflage = ref(false)
//pinia仓库
const store = wordStore()
//选择是否静音点击事件
function muteChenge() {
  store.word.settings.mute = !store.word.settings.mute
}
//切换翻译选项点击事件
function transkateChange() {
  if (store.word.settings.translate == 'wyy') return (store.word.settings.translate = 'bd')
  if (store.word.settings.translate == 'bd') return (store.word.settings.translate = 'wyy')
}
//分组右键弹窗标志
let rclick_group_flag = ref(false)
//获取右击分组名
let rclick_group_name = ref('')
//分组的右键点击事件
function rclick_group(e) {
  if (e.target.localName == 'li') {
    rclick_group_name.value = e.target.getAttribute('data-group')
  } else if (e.target.localName == 'span') {
    rclick_group_name.value = e.target.innerHTML
  } else if (e.target.localName == 'svg') {
    rclick_group_name.value = e.target.parentNode.parentNode.getAttribute('data-group')
  } else {
    rclick_group_name.value = e.target.parentNode.parentNode.parentNode.getAttribute('data-group')
  }
  if (rclick_group_name.value == null) return (rclick_group_flag.value = false)
  // if(e.target)
  rclick_group_flag.value = false
  window.removeEventListener('click', close_rclick_group)
  window.removeEventListener('contextmenu', close_rclick_group)
  window.removeEventListener('mousewheel', whell)
  setTimeout(() => {
    rclick_group_flag.value = true
    rclick_xy.x = e.pageX
    rclick_xy.y = e.pageY
    window.addEventListener('click', close_rclick_group)
    window.addEventListener('contextmenu', close_rclick_group)
    window.addEventListener('mousewheel', whell)
  })
}
//分组的点击事件
function click_group(e) {
  ElMessageBox.confirm('确定选择该分组', '温馨提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  })
    .then(() => {
      store.word.settings.group = store.word.wordData.findIndex(i => i.groupName == e.index)
      store.word.settings.id = 0
      //开启键盘输入事件
      window.addEventListener('keydown', getAlphabet)
      ElNotification({
        type: 'success',
        message: `操作成功`,
        duration: 1000
      })
    })
    .catch(({ message }) => {
      if (message == undefined) {
        message = '已取消'
      }
      //开启键盘输入事件
      window.addEventListener('keydown', getAlphabet)
      ElNotification({
        type: 'error',
        message: message,
        duration: 2000
      })
    })
}
// 添加分组点击事件
function addGroup() {
  //关闭键盘输入事件
  window.removeEventListener('keydown', getAlphabet)
  //弹窗采集用户输入的分组名
  ElMessageBox.prompt('请输入新的分组名', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputPattern: /^([\u4E00-\u9FFF]{1,8}|[\u4E00-\u9FFFA-Za-z]{1,8}|[a-zA-Z]{1,12})$/,
    inputErrorMessage: '输入不符合规则'
  })
    .then(({ value }) => {
      if (store.word.wordData.find(i => i.groupName == value)) {
        throw new Error('有相同的分组名')
      }
      function Word(word) {
        ;(this.word = word), (this.wyy = ''), (this.bd = ''), (this.isWrite = false)
      }
      let obj = {
        groupName: value,
        id: store.word.wordData[store.word.wordData.length - 1].id + 1,
        wordList: [new Word('zxw')]
      }
      store.word.wordData.push(obj)
      // store.word.wordData.find(i => i.groupName == rclick_group_name.value).groupName = value
      //开启键盘输入事件
      window.addEventListener('keydown', getAlphabet)
      ElNotification({
        type: 'success',
        message: `添加成功`,
        duration: 1000
      })
    })
    .catch(({ message }) => {
      if (message == undefined) {
        message = '已取消'
      }
      //开启键盘输入事件
      window.addEventListener('keydown', getAlphabet)
      ElNotification({
        type: 'error',
        message: message,
        duration: 2000
      })
    })
  //
}
//单词列表的点击事件
function clickWordlist() {
  window.removeEventListener('keydown', getAlphabet)
  console.log(store.word.settings)
  wordListflage.value = true
  rclick_active.value = -1
}
//滚轮关闭鼠标右键弹窗
function whell() {
  rclick_flag.value = false
  rclick_group_flag.value = false
}
//点击和右击关闭单词列表右键弹窗事件
function close_rclick(e) {
  e.preventDefault()
  let target = document.querySelector('.word_rclick')
  let arr = []
  // 获取元素的所有后代节点
  const processChildren = (el, descendants) => {
    for (let i = 0; i < el.childNodes.length; i++) {
      const node = el.childNodes[i]
      descendants.push(node)
      if (node.nodeType === 1) {
        processChildren(node, descendants)
      }
    }
  }
  processChildren(target, arr)
  let num = arr.findIndex(i => i == e.target)
  if (e.target == target) num = 1
  if (num == -1) {
    rclick_flag.value = false
    window.removeEventListener('click', close_rclick)
    window.removeEventListener('contextmenu', close_rclick)
  }
}
////点击和右击关闭分组列表右键弹窗事件
function close_rclick_group(e) {
  e.preventDefault()
  let target = document.querySelector('.rclick_group')
  let arr = []
  // 获取元素的所有后代节点
  const processChildren = (el, descendants) => {
    for (let i = 0; i < el.childNodes.length; i++) {
      const node = el.childNodes[i]
      descendants.push(node)
      if (node.nodeType === 1) {
        processChildren(node, descendants)
      }
    }
  }
  processChildren(target, arr)
  let num = arr.findIndex(i => i == e.target)
  if (e.target == target) num = 1
  if (num == -1) {
    rclick_group_flag.value = false
    window.removeEventListener('click', close_rclick_group)
    window.removeEventListener('contextmenu', close_rclick_group)
  }
}
//右击选择效果标志
let rclick_active = ref(-1)
//单词列表右击单词事件
function rclick_wordlist(e) {
  rclick_flag.value = false
  window.removeEventListener('click', close_rclick)
  window.removeEventListener('contextmenu', close_rclick)
  window.removeEventListener('mousewheel', whell)

  setTimeout(() => {
    rclick_flag.value = true
    rclick_xy.x = e.pageX
    rclick_xy.y = e.pageY
  })
  rclick_active.value = Number(e.target.getAttribute('data-index'))
  window.addEventListener('mousewheel', whell)
  setTimeout(() => {
    window.addEventListener('click', close_rclick)
    window.addEventListener('contextmenu', close_rclick)
  })
}
//右击弹窗点击'删除单词'事件
function rclick_delete() {
  if (rclick_active.value < store.word.settings.id) store.word.settings.id = store.word.settings.id - 1
  if (store.word.wordData[store.word.settings.group].wordList.length > 1) {
    store.word.wordData[store.word.settings.group].wordList.splice(rclick_active.value, 1)
  } else {
    ElNotification({
      type: 'error',
      message: `不能删除最后一个单词`,
      duration: 1000
    })
  }
  rclick_flag.value = false
  rclick_active.value = -1
}
//右击弹窗点击'从当前开始'事件
function rclick_current() {
  store.word.settings.id = Number(rclick_active.value)
  rclick_flag.value = false
}
//右击弹窗点击'修改单词'事件
function rclick_alter() {
  rclick_flag.value = false
  ElMessageBox.prompt('请输入新单词', '温馨提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputPattern: /^[A-Za-z]{1,12}$/,
    inputErrorMessage: '输入不符合规则'
  })
    .then(({ value }) => {
      if (value == store.word.wordData[store.word.settings.group].wordList[rclick_active.value].word) {
        throw Error('修改值与原值相同')
      }
      // console.log(store.word.wordData[store.word.settings.group].wordList[rclick_active.value])
      // console.log(store.word.wordData[store.word.settings.group].wordList)
      let add = store.word.wordData[store.word.settings.group].wordList.findIndex(i => i.word == value)
      if (add == -1) {
        store.word.wordData[store.word.settings.group].wordList[rclick_active.value].word = value
      } else {
        throw Error('已有该单词')
      }
      // console.log(store.word.wordData[store.word.settings.group].wordList[rclick_active.value].word)

      ElNotification({
        type: 'success',
        message: `修改成功`,
        duration: 1000
      })
    })
    .catch(err => {
      let mes = ''
      err == 'cancel' ? (mes = '已取消') : (mes = err.message)
      console.log(mes)
      ElNotification({
        type: 'error',
        message: mes,
        duration: 1000
      })
    })
}
//右击弹窗点击'修改分组名'事件
function rclick_changegroup() {
  rclick_group_flag.value = false
  //关闭键盘输入事件
  window.removeEventListener('keydown', getAlphabet)
  //弹窗采集用户输入的分组名
  ElMessageBox.prompt('请输入新的分组名', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputPattern: /^([\u4E00-\u9FFF]{1,8}|[\u4E00-\u9FFFA-Za-z]{1,8}|[a-zA-Z]{1,12})$/,
    inputErrorMessage: '输入不符合规则'
  })
    .then(({ value }) => {
      if (store.word.wordData.find(i => i.groupName == value)) {
        throw new Error('有相同的分组名')
      }
      store.word.wordData.find(i => i.groupName == rclick_group_name.value).groupName = value
      //开启键盘输入事件
      window.addEventListener('keydown', getAlphabet)
      ElNotification({
        type: 'success',
        message: `修改成功`,
        duration: 1000
      })
    })
    .catch(({ message }) => {
      if (message == undefined) {
        message = '已取消'
      }
      //开启键盘输入事件
      window.addEventListener('keydown', getAlphabet)
      ElNotification({
        type: 'error',
        message: message,
        duration: 2000
      })
    })
}
//右击弹窗点击'删除分组'事件
function rclick_deletegroup() {
  rclick_group_flag.value = false
  //关闭键盘输入事件
  window.removeEventListener('keydown', getAlphabet)
  //弹窗采集用户输入的分组名
  ElMessageBox.confirm('确定删除该么分组', '温馨提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  })
    .then(() => {
      // console.log(rclick_group_name.value)
      if (store.word.wordData.findIndex(i => i.groupName == rclick_group_name.value) < store.word.settings.group)
        store.word.settings.group = store.word.settings.group - 1
      store.word.wordData.splice(
        store.word.wordData.findIndex(i => i.groupName == rclick_group_name.value),
        1
      )
      //开启键盘输入事件
      window.addEventListener('keydown', getAlphabet)
      ElNotification({
        type: 'success',
        message: `删除成功`,
        duration: 1000
      })
    })
    .catch(({ message }) => {
      if (message == undefined) {
        message = '已取消'
      }
      //开启键盘输入事件
      window.addEventListener('keydown', getAlphabet)
      ElNotification({
        type: 'error',
        message: message,
        duration: 2000
      })
    })
}
//关闭单词列表回调
function close_dialog_wordList() {
  window.addEventListener('keydown', getAlphabet)
  window.removeEventListener('click', close_rclick)
  window.removeEventListener('contextmenu', close_rclick)
  window.removeEventListener('mousewheel', whell)
  window.removeEventListener('mousewheel', whell)
  rclick_flag.value = false
}
//添加单词点击事件
function add_word() {
  //检测是否有相同单词
  function hasDuplicateWords(array) {
    const wordSet = new Set()

    for (let i = 0; i < array.length; i++) {
      const words = array[i].split(' ')

      for (let j = 0; j < words.length; j++) {
        const word = words[j]

        if (wordSet.has(word)) {
          return true
        }

        wordSet.add(word)
      }
    }

    return false
  }
  ElMessageBox.prompt('请输入新单词,多个单词使用英文逗号隔开,且不能以逗号结尾', '温馨提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputPattern: /^([A-Za-z]{1,12})(,[A-Za-z]{1,12})*$/,
    inputErrorMessage: '输入不符合规则'
  })
    .then(({ value }) => {
      let arr = value.split(',')
      if (hasDuplicateWords(arr)) {
        throw new Error('输入有相同单词')
      }
      let add = []
      arr.forEach(item => {
        let temp = store.word.wordData[store.word.settings.group].wordList.find(i => i.word == item)
        if (temp == undefined) add.push(item)
      })
      if (add.length !== 0) {
        if (add.length == arr.length) {
          ElNotification({
            type: 'success',
            message: `添加成功`,
            duration: 1000
          })
        } else {
          ElNotification({
            type: 'success',
            message: `检查到输入的部分单词,单词表已有,已剔除`,
            duration: 1000
          })
        }
        add.forEach(i => {
          function Word(word) {
            ;(this.word = word), (this.wyy = ''), (this.bd = ''), (this.isWrite = false)
          }
          store.word.wordData[store.word.settings.group].wordList.push(new Word(i))
        })
      } else {
        throw new Error('输入单词,单词表中已有,添加失败')
      }
    })
    .catch(err => {
      let mes = ''
      err == 'cancel' ? (mes = '已取消') : (mes = err.message)
      ElNotification({
        type: 'error',
        message: mes,
        duration: 1000
      })
    })
}
onMounted(() => {
  document.body.style.backgroundColor = '#f4f4f5'
})

onUnmounted(() => {
  document.body.style.backgroundColor = '#fff'
})
</script>

<style lang="less" scoped>
.app_word {
  user-select: none;
  position: relative;
  margin: 50px auto;
  width: 1280px;
  height: 700px;
  background-color: #f4f4f5;
  border-radius: 10px;

  .left {
    position: absolute;
    left: 10px;
    top: 50px;
    width: 200px;
    border-radius: 10px;
    overflow: auto;
    max-height: 500px;
    -webkit-overflow-scrolling: touch;
  }
  .left::-webkit-scrollbar {
    width: 0;
  }
}
add {
  margin-right: 50px;
}
.wordListdip {
  max-height: 490px;
  display: grid;
  grid-template-columns: repeat(8, 100px);
  overflow-x: hidden;
  overflow-y: scroll;
  justify-content: space-around;
  li {
    user-select: none;
    cursor: default;
    margin-top: 5px;
    width: 100px;
    height: 30px;
    background-color: #dedfe0;
    display: flex;
    justify-content: center;
    align-items: center;
    .el-icon {
      font-size: 16px;
    }
  }
  .spelled_wordlist {
    background-color: #95d475;
  }
  .active_wordlist {
    background-color: #79bbff;
  }
}
.wordListdip::-webkit-scrollbar {
  width: 5px; /* 滚动条宽度 */
}
.wordListdip::-webkit-scrollbar-track {
  background-color: #f1f1f1; /* 轨道背景颜色 */
}
.wordListdip::-webkit-scrollbar-thumb {
  background-color: #888; /* 滑块背景颜色 */
}
.wordListnav {
  user-select: none;
  display: flex;
  .text_wrodlist {
    margin-left: 20px;
    display: flex;
    align-items: center;
    span {
      display: block;
      width: 20px;
      height: 20px;
    }
  }
  .spelled_wordlist {
    background-color: #95d475;
  }
  .active_wordlist {
    background-color: #79bbff;
  }
}
.rclick_item {
  user-select: none;
  width: 100%;
  display: flex;
  align-items: center;
  i {
    margin-left: 10px;
  }
  span {
    margin-left: 10px;
  }
  margin-bottom: 5px;
}

.rclick_item:hover {
  background-color: #e9e9eb;
  border-radius: 5px;
}
</style>
