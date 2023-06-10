<template>
  <transition
    name="animate__animated animate__bounce"
    enter-active-class="animate__fadeIn "
    leave-active-class="animate__fadeOut animate__faster"
  >
    <div class="word_rclick" :style="{ 'left': props.x + 'px', 'top': props.y + 'px' }">
      <slot> </slot>
    </div>
  </transition>
</template>

<script setup>
const props = defineProps(['x', 'y'])
//定义style样式
</script>

<style lang="less">
.word_rclick {
  width: 300px;
  // height: 100px;
  border-radius: 5px;
  position: fixed;
  background-color: #fff;
  z-index: 99999;
  padding: 3px;
}
</style>
