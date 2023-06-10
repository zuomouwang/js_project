import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const wordStore = defineStore('wordStore', () => {
  const word = reactive({})

  return { word }
})
