<template>
    <div class="main">
        <div class="left">
            <Logo></Logo>
            <!-- 滚动条 -->
            <el-scrollbar class="scrollbar">
                <!-- 动态菜单 -->
                <el-menu :default-active="$route.path">
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

let userStore = useUserStore()

</script>
<style scoped lang="scss">
.main {
    width: 100%;
    height: 100vh;
    background-color: white;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

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
        color: black;
    }
}
</style>