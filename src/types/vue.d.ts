import { ElMessage } from 'element-plus'

// 扩展Vue全局属性声明
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $message: typeof ElMessage
  }
}

export {}