<template>

    <div class="login_wrapper">
        <el-row>
            <el-col :span="12">

            </el-col>
            <el-col :span="12" class="login_form">
                <h1>登录</h1>
                <h2>欢迎来到登录页面</h2>
                <el-form :model="loginForm" label-width="80px" :rules="rules">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="loginForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="loginForm.password" type="password" show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="login">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>

</template>

<script setup lang="ts">
import { reactive, defineComponent } from 'vue'
import useUserStore from '@/store/modules/user'
import { useRouter } from 'vue-router'

let userStore = useUserStore()

let $router = useRouter()

const loginForm = reactive({
    username: 'admin',
    password: '111111'
})
const login = async () => {
    try {
        await userStore.userLogin(loginForm)
        $router.push('/')

    } catch (error) {
        $router.push('/login')

    }

}

const rules = {
    username :[{require:true,message:'请输入用户名',min:5 ,max:16,trigger:'change'}],
    password :[{require:true,message:'请输入密码',min:5 ,max:16,trigger:'change'}]
}

</script>

<style lang="scss" scoped>
.login_wrapper {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('@/assets/background.jpg') no-repeat center center;
    background-size: cover;

    .login_form {
        top: 30vh;
        width: 40%;
        position: relative;
        color: black;

        /* 设置el-input宽度为80% */
        :deep(.el-input) {
            width: 80%;
        }
    }
}
</style>
