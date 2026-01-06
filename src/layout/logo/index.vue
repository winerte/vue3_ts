<template>
    <div class="logo">
        <img src="https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/6c61ae65d1c41ae8221a670fa32d05aa.svg" alt="">
        <p>后台管理系统</p>
    </div>
</template>

<script lang="ts" setup> 

</script>

<style scoped lang="scss">
    .logo{
        padding: 10px;
        display:flex; //展示
        width: 100%;
        height: 50px;
       
        .img{
            width: 50px;
            height: 40px;
        }
        p{
            margin-left: 10px;
            color: var(--text-color);
            font-size: larger;
        }
        align-items: center;
    }
</style>