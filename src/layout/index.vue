<template>
    <div class="main">
        <div class="left">
            <Logo></Logo>
            <!-- 滚动条 -->
            <el-scrollbar class="scrollbar">
                <!-- 静态菜单
                <el-menu default-active="1" >
                    <el-menu-item index="1">
                        <template #title>首页</template>
</el-menu-item>
<el-menu-item index="2">
    <template #title>数据大屏</template>
</el-menu-item>
<el-sub-menu index="3">
    <template #title>
                            <i class="el-icon-location"></i>
                            <span>权限管理</span>
                        </template>
    <el-menu-item index="1-1">用户管理</el-menu-item>
    <el-menu-item index="1-2">角色管理</el-menu-item>
    <el-menu-item index="1-3">菜单管理</el-menu-item>
</el-sub-menu>
</el-menu> -->
                <!-- 动态菜单 -->
                <el-menu :default-active="$route.path">
                    <Menu :menuList="userStore.menuRoutes"> </Menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <div class="top">
            <TopBar />
        </div>
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
<style lang="scss" scoped>
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