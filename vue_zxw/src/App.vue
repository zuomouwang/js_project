<template>
  <router-view></router-view>
</template>

<script setup>
import { reactive } from 'vue'
import { wordStore } from './stores/counter.js'
import wordlist from './hook/words.js'

const store = wordStore()
//Settings对象构造函数
function Settings(mute, translate, group, id) {
  ;(this.mute = mute), (this.translate = translate), (this.group = group), (this.id = id)
}
//word对象构造函数

// 添加单词组件的初始数据
if (!localStorage.getItem('word')) {
  let settings = new Settings(false, 'wyy', 0, 0)
  let word = {
    settings: settings,
    wordData: [
      {
        groupName: '常见单词',
        id: 0,
        wordList: wordlist
      }
    ]
  }
  localStorage.setItem('word', JSON.stringify(word))
  const data = JSON.parse(localStorage.getItem('word'))
  store.word = reactive(data)
} else {
  const data = JSON.parse(localStorage.getItem('word'))
  store.word = reactive(data)
}
</script>

<style lang="less" scoped>

</style>
