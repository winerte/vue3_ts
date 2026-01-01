<template>
    <div class="login-container">
        <!-- 背景装饰 -->
        <div class="login-bg">
            <div class="bg-pattern"></div>
        </div>
        
        <div class="login-wrapper">
            <div class="login-content">
                <!-- 左侧品牌区域 -->
                <div class="login-brand">
                    <div class="brand-logo">
                        <img 
                            src="https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/6c61ae65d1c41ae8221a670fa32d05aa.svg" 
                            alt="Logo"
                        >
                    </div>
                    <div class="brand-info">
                        <h1 class="brand-title">后台管理系统</h1>
                        <p class="brand-desc">专业、高效、安全的管理平台</p>
                    </div>
                    <div class="brand-features">
                        <div class="feature-item">
                            <el-icon class="feature-icon">Shield</el-icon>
                            <span>安全可靠</span>
                        </div>
                        <div class="feature-item">
                            <el-icon class="feature-icon">Speedometer</el-icon>
                            <span>高效运行</span>
                        </div>
                        <div class="feature-item">
                            <el-icon class="feature-icon">Setting</el-icon>
                            <span>灵活配置</span>
                        </div>
                    </div>
                </div>
                
                <!-- 右侧登录表单 -->
                <div class="login-form-wrapper">
                    <div class="login-form-container">
                        <h2 class="login-title">欢迎回来</h2>
                        <p class="login-subtitle">请登录您的账号</p>
                        
                        <el-form 
                            :model="loginForm" 
                            :rules="rules" 
                            ref="loginFormRef"
                            class="login-form"
                        >
                            <el-form-item prop="username">
                                <el-input 
                                    v-model="loginForm.username" 
                                    placeholder="请输入用户名"
                                    class="login-input"
                                    :prefix-icon="'User'"
                                ></el-input>
                            </el-form-item>
                            
                            <el-form-item prop="password">
                                <el-input 
                                    v-model="loginForm.password" 
                                    type="password" 
                                    placeholder="请输入密码"
                                    class="login-input"
                                    :prefix-icon="'Lock'"
                                    show-password
                                ></el-input>
                            </el-form-item>
                            
                            <div class="form-actions">
                                <el-checkbox v-model="rememberMe" class="remember-me">记住我</el-checkbox>
                                <el-link type="primary" :underline="false" class="forgot-password">
                                    忘记密码？
                                </el-link>
                            </div>
                            
                            <el-form-item>
                                <el-button 
                                    type="primary" 
                                    @click="login" 
                                    class="login-btn"
                                    :loading="isLoading"
                                >
                                    {{ isLoading ? '登录中...' : '登录' }}
                                </el-button>
                            </el-form-item>
                        </el-form>
                        
                        <div class="login-footer">
                            <p class="copyright">© 2024 后台管理系统 版权所有</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, defineComponent } from 'vue'
import useUserStore from '@/store/modules/user'
import { useRouter } from 'vue-router'
// 使用Element Plus内置图标，通过字符串形式引用

const userStore = useUserStore()
const $router = useRouter()
const loginFormRef = ref()
const isLoading = ref(false)

const loginForm = reactive({
    username: 'admin',
    password: '111111'
})

const rememberMe = ref(true)

const rules = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'change' },
        { min: 5, max: 16, message: '用户名长度在 5 到 16 个字符', trigger: 'change' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'change' },
        { min: 5, max: 16, message: '密码长度在 5 到 16 个字符', trigger: 'change' }
    ]
}

const login = async () => {
    if (!loginFormRef.value) return
    
    try {
        await loginFormRef.value.validate()
        isLoading.value = true
        
        await userStore.userLogin(loginForm)
        $router.push('/')
    } catch (error) {
        console.error('登录失败:', error)
        // 登录失败不需要跳转，保持在登录页面
    } finally {
        isLoading.value = false
    }
}
</script>

<style lang="scss" scoped>
.login-container {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
}

.login-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    
    .bg-pattern {
        position: absolute;
        top: 0;
        left: 0;
        width: 200%;
        height: 200%;
        background-image: 
            radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
        animation: bgMove 20s ease-in-out infinite;
    }
}

@keyframes bgMove {
    0%, 100% {
        transform: translate(0, 0) scale(1);
    }
    33% {
        transform: translate(-50px, -50px) scale(1.1);
    }
    66% {
        transform: translate(50px, 50px) scale(0.9);
    }
}

.login-wrapper {
    position: relative;
    width: 100%;
    max-width: 1200px;
    height: 80vh;
    max-height: 600px;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 16px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    overflow: hidden;
    backdrop-filter: blur(10px);
    animation: loginWrapperFadeIn 0.6s ease-out forwards;
}

@keyframes loginWrapperFadeIn {
    from {
        opacity: 0;
        transform: translateY(30px) scale(0.95);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

.login-content {
    display: flex;
    width: 100%;
    height: 100%;
}

/* 左侧品牌区域 */
.login-brand {
    width: 50%;
    height: 100%;
    padding: 60px;
    background: linear-gradient(135deg, #409eff 0%, #67c23a 100%);
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    animation: brandFadeIn 0.8s ease-out forwards;
}

@keyframes brandFadeIn {
    from {
        opacity: 0;
        transform: translateX(-30px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.brand-logo {
    margin-bottom: 30px;
    animation: logoScale 1s ease-out forwards;
    
    img {
        width: 80px;
        height: 80px;
        object-fit: contain;
        filter: brightness(0) invert(1);
    }
}

@keyframes logoScale {
    0%, 50% {
        transform: scale(0.8);
        opacity: 0;
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}

.brand-info {
    margin-bottom: 40px;
}

.brand-title {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 12px;
    letter-spacing: 1px;
}

.brand-desc {
    font-size: 16px;
    opacity: 0.9;
    line-height: 1.6;
}

.brand-features {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.feature-item {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 14px;
    opacity: 0.9;
    transition: all 0.3s ease;
    
    &:hover {
        transform: translateX(10px);
        opacity: 1;
    }
}

.feature-icon {
    font-size: 20px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
}

/* 右侧登录表单 */
.login-form-wrapper {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
    animation: formFadeIn 0.8s ease-out forwards;
    animation-delay: 0.2s;
    opacity: 0;
}

@keyframes formFadeIn {
    from {
        opacity: 0;
        transform: translateX(30px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.login-form-container {
    width: 100%;
    max-width: 400px;
}

.login-title {
    font-size: 28px;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 8px;
    text-align: center;
}

.login-subtitle {
    font-size: 14px;
    color: var(--text-secondary);
    margin-bottom: 40px;
    text-align: center;
}

.login-form {
    width: 100%;
}

.login-input {
    width: 100%;
    border-radius: 8px;
    height: 48px;
    font-size: 14px;
    transition: all 0.3s ease;
    
    :deep(.el-input__wrapper) {
        border-radius: 8px;
        height: 48px;
        
        &:hover {
            box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.1);
        }
        
        &:focus-within {
            box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
        }
    }
    
    :deep(.el-input__inner) {
        height: 48px;
        line-height: 48px;
        font-size: 14px;
    }
    
    :deep(.el-input__prefix) {
        left: 12px;
        
        .el-icon {
            font-size: 18px;
            color: var(--text-placeholder);
        }
    }
}

.form-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
}

.remember-me {
    font-size: 14px;
    color: var(--text-regular);
    
    :deep(.el-checkbox__label) {
        margin-left: 6px;
    }
}

.forgot-password {
    font-size: 14px;
}

.login-btn {
    width: 100%;
    height: 48px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    background: linear-gradient(135deg, #409eff 0%, #67c23a 100%);
    border: none;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(64, 158, 255, 0.4);
    }
    
    &:active {
        transform: translateY(0);
    }
}

.login-footer {
    margin-top: 30px;
    text-align: center;
    
    .copyright {
        font-size: 12px;
        color: var(--text-secondary);
        opacity: 0.8;
    }
}

/* 响应式设计 */
@media (max-width: 992px) {
    .login-brand {
        display: none;
    }
    
    .login-form-wrapper {
        width: 100%;
        padding: 20px;
    }
    
    .login-wrapper {
        height: 90vh;
        margin: 20px;
    }
}

@media (max-width: 576px) {
    .login-title {
        font-size: 24px;
    }
    
    .login-subtitle {
        font-size: 13px;
    }
    
    .login-input {
        height: 44px;
        
        :deep(.el-input__wrapper) {
            height: 44px;
        }
        
        :deep(.el-input__inner) {
            height: 44px;
            line-height: 44px;
        }
    }
    
    .login-btn {
        height: 44px;
        font-size: 15px;
    }
}
</style>
