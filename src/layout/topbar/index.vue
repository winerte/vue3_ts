<template>
    <div class="topBar">
        <div class="left_bar">
            <el-icon style="padding-right: 5px;">
                <Fold />
            </el-icon>

            <el-breadcrumb separator-icon="ArrowRight">
                    <el-breadcrumb-item v-for="(item, index) in route.matched" :key="index" v-show="item.meta.title"
                        :to="item.path">
                        {{ item.meta.title }}
                    </el-breadcrumb-item>
                </el-breadcrumb>
        </div>

        <div class="right_bar">
            <el-button type="normal">
                <el-icon style="vertical-align: middle;">
                    <refresh />
                </el-icon>
            </el-button>
            <el-button type="normal">
                <el-icon style="vertical-align: middle;">
                    <grid />
                </el-icon>
            </el-button>
            <el-button type="normal" @click="setBtn">
                <el-icon style="vertical-align: middle;">
                    <Setting />
                </el-icon>
            </el-button>
            <img :src="userStore.avatar" style="width: 24px; height: 24px; margin: 0px 10px;">
            <el-dropdown>
                <span class="el-dropdown-link">
                    {{ userStore.userName }}
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="logOut">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            <el-drawer title="我是标题" v-model="drawer" :with-header="false">
                <el-form>
                    <el-form-item label="主题模式">
                        <el-switch 
                            v-model="isDarkMode" 
                            active-color="#13ce66" 
                            inactive-color="#ff4949"
                            @change="toggleDarkMode">
                        </el-switch> 
                    </el-form-item>
                </el-form>
            </el-drawer>
        </div>
    </div>

</template>
<script lang="ts" setup>
import useUserStore from '@/store/modules/user';
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'
let userStore = useUserStore();
let $router = useRouter()
const route = useRoute()
const logOut = () => {
    userStore.LogOut()
    $router.push('/login')
}
let drawer = ref(false)
// 暗黑模式状态，默认从localStorage读取，不存在则默认为false
const saved = localStorage.getItem('darkMode')
let isDarkMode = ref<boolean>(saved ? JSON.parse(saved) : false)

// 初始化时设置主题
const initTheme = () => {
    if (isDarkMode.value) {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }
}

// 切换暗黑模式
const toggleDarkMode = (value: boolean) => {
    isDarkMode.value = value
    if (value) {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }
    // 保存到localStorage
    localStorage.setItem('darkMode', JSON.stringify(value))
    
    // 触发主题变化事件，让其他组件响应
    window.dispatchEvent(new CustomEvent('theme-change', {
        detail: { isDarkMode: value }
    }))
}

const setBtn = () => {
    drawer.value = true
}

// 初始化主题
initTheme()

</script>
<style lang="scss" scoped>
.topBar {
    width: 100%;
    height: 100%;
    display: flex;

    .left_bar {
        display: flex;
        width: 50%;
        height: 100%;
        align-items: center;

        padding-left: 10px;
    }

    .right_bar {
        display: flex;
        width: 50%;
        height: 100%;
        align-items: center;

        justify-content: end;
        padding-right: 10px;
    }

    align-items: center;
    justify-content: space-between;
}
</style>