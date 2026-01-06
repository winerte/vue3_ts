<script setup >
import useUserStore from '@/store/modules/user';
let userStore = useUserStore();
</script>

<template>
  <el-card>
<img :src=userStore.avatar alt="">
<h3>{{userStore.userName}}</h3>
  </el-card>
</template>

<style scoped >

</style>
