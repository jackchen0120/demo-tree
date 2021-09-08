import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import dayjs from "dayjs"; // 引入日期工具库
import pipeMethod from "./utils/pipe"; // 引入全局管道模块
import "./styles/common.less"; // 引入全局样式文件

import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'
 
Vue.use(VXETable)

for (let key in pipeMethod) {
  // 全局管道
  Vue.filter(key, pipeMethod[key]);
}

Vue.config.productionTip = false;
// 将日期dayjs对象挂载到vue的原型对象上，在别的组件中使用 this.$DayTime
Vue.prototype.$DayTime = dayjs;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
