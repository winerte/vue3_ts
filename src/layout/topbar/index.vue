<template>
    <div class="topBar">
        <div class="left_bar">
            <el-icon style="padding-right: 5px;">
                <Fold />
            </el-icon>

            <el-breadcrumb separator-icon="ArrowRight" >
                <el-breadcrumb-item v-for="(item,index) in $route.matched " :key="index" v-show="item.meta.title" :to="item.path">
                    {{item.meta.title}}
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
            <el-button type="normal">
                <el-icon style="vertical-align: middle;">
                    <Apple />
                </el-icon>
            </el-button>
            <img :src="userStore.avatar" style="width: 24px; height: 24px; margin: 0px 10px;">
            <el-dropdown>
                <span class="el-dropdown-link">
                    {{ userStore.userName}}
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="logOut">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>

</template>
<script lang="ts" setup>
    import useUserStore from '@/store/modules/user';
    import {useRouter} from 'vue-router'
    let userStore = useUserStore();
    let $router = useRouter()
    const  logOut = ()=> {
        userStore.LogOut()
       $router.push ('/login')
    }
    

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