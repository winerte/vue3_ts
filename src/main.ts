import './assets/main.css'
import 'element-plus/dist/index.css'

import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
// 导入中文语言包
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import router from './router'
import pinia from './store'
// 引入所有Element Plus图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import './assets/permisstion'

const app = createApp(App)
// 使用中文语言包
app.use(ElementPlus, {
  locale: zhCn
})
app.use(router)
app.use(pinia)

// 注册所有图标为全局组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')