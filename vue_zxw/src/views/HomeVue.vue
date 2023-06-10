<template>
  <div class="list">
    <ul>
      <li><a href="#/word">单词记忆</a></li>
      <li><a href="JavaScript:;" target="_blank">drum</a></li>
      <li><a href="JavaScript:;" target="_blank">时钟</a></li>
      <li><a href="JavaScript:;" target="_blank">JS控制CSS变量</a></li>
      <li><a href="JavaScript:;" target="_blank">背景图</a></li>
      <li><a href="JavaScript:;" target="_blank">字符匹配</a></li>
      <li><a href="JavaScript:;" target="_blank">彩虹画板</a></li>
      <li>
        <a href="JavaScript:;" target="_blank">快速选择与拖动切换</a>
      </li>
    </ul>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
.list {
  width: 100%;
  background-image: linear-gradient(to right, rgba(255, 0, 122, 0.35), rgba(0, 86, 255, 0.4), #89ff0094);
  // height: 100%;
  ul {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    li {
      padding: 10px;
      text-align: center;
      width: 500px;
      height: 100px;
      line-height: 75px;
      font-size: 50px;
      a {
        color: #000;
      }
    }
  }
}
</style>
