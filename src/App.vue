<template>
  <div id="app">
    <div id="nav">
      <h2>比对ElementUI中el-tree与el-table组件实现目录树结构异同</h2>
      <router-link to="/tree">el-tree</router-link> |
      <router-link to="/table">el-table</router-link> |
      <router-link to="/vxe">vxe-table</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333;
  #nav {
    padding: 30px;
    h2 {
      padding-bottom: 20px;
      font-weight: bold;
    }
    a {
      font-size: 18px;
      color: #333;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
}
</style>
