import { ref, onMounted, onUnmounted } from 'vue'
import { ElNotification } from 'element-plus'
let setFlag = ''
let flag = true
let star = 0
let end = 0
let sub = 0
let windowflag = true
const alphabet = ref('')

export function getAlphabet(e) {
  if (flag == true && alphabet.value.split('')[0] == e.key) {
    flag = !flag
    star = new Date().getTime()
  } else {
    flag = !flag
    end = new Date().getTime()

    sub = end - star
  }
  if (sub < 100) {
    if (windowflag) {
      windowflag = false
      ElNotification({
        title: '',
        message: '不可长按按键',
        type: 'error',
        duration: 1000
      })
      setTimeout(() => {
        windowflag = true
      }, 1000);
    }
    return
  }
  if (e.key === 'Shift' || e.key === 'CapsLock') return
  if (setFlag.split('')[0] != e.key) {
    setFlag = e.key
    alphabet.value = e.key
  } else {
    setFlag = alphabet.value + '!'
    alphabet.value = setFlag

  }
}
export function useInputListener() {
  onMounted(() => {
    window.addEventListener('keydown', getAlphabet)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', getAlphabet)
  })
  return alphabet
}
