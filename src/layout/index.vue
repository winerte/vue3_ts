<template>
    <div class="main">
        <div class="left">
            <Logo></Logo>
            <!-- 滚动条 -->
            <el-scrollbar class="scrollbar">
                <!-- 动态菜单 -->
                <el-menu 
                    :default-active="route.path"
                    :background-color="isDarkMode ? '#1e1e1e' : '#fff'"
                    :text-color="isDarkMode ? '#e5e5e5' : '#303133'"
                    :active-text-color="isDarkMode ? '#409eff' : '#409eff'"
                    :unique-opened="true"
                >
                    <Menu :menuList="userStore.menuRoutes"> </Menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <div class="top">
            <TopBar />        </div>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>
<script setup lang="ts">

import Logo from "./logo/index.vue"
import Menu from "./menu/index.vue"
import TopBar from "./topbar/index.vue"
import useUserStore from "@/store/modules/user"
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

let userStore = useUserStore()
const route = useRoute()

// 从localStorage获取主题状态
const saved = localStorage.getItem('darkMode')
let isDarkMode = ref<boolean>(saved ? JSON.parse(saved) : false)

// 监听主题变化事件
const handleThemeChange = (event: CustomEvent) => {
    isDarkMode.value = event.detail.isDarkMode
}

onMounted(() => {
    // 添加主题变化事件监听器
    window.addEventListener('theme-change', handleThemeChange as EventListener)
})

// 组件卸载时移除事件监听器
onUnmounted(() => {
    window.removeEventListener('theme-change', handleThemeChange as EventListener)
})
</script>
<style scoped lang="scss">
.main {
    width: 100%;
    height: 100vh;
    background-color: var(--bg-color);
    color: var(--text-color);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: background-color 0.3s ease, color 0.3s ease;

    .left {
        width: 20%;
        height: 100%;
        
        position: absolute;
        .scrollbar {
            width: 100%;
            height: calc(100% - 6vh);
            
        }
    }

    .top {
        position: absolute;
        width: 80%;
        height: 10%;
        left: 20%;
        
        
    }

    .content {
        position: absolute;
        width: 80%;
        height: 90%;
        left: 20%;
        top: 10vh;
        padding: 10px;
        overflow: auto;
        color: var(--text-color);
        background-color: var(--bg-color);
        transition: background-color 0.3s ease, color 0.3s ease;
    }
}
</style>