<template>
  <div class="site-wrapper site-page--not-found">
    <div class="site-content__wrapper">
      <div class="site-content">
        <h2 class="not-found-title">主页面</h2>
        <p class="not-found-desc">这是主页面 ...</p>
        <el-button @click="$router.go(-1)">返回上一页</el-button>
        <el-button type="primary" class="not-found-btn-gohome" @click="$router.push({ name: 'home' })">进入首页</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
  }
</script>

<style scoped lang="scss">
  .container {
    position:absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    // background: rgba(224, 234, 235, 0.1);
  }
</style> 