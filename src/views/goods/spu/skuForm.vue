<template>
    <el-card>
       
    <el-button @click="cancle">切换sku</el-button>
    </el-card>
   
</template>

<script setup lang="ts">

let emit = defineEmits(['changeSence'])

const cancle = () => {
    emit('changeSence',0)
}

</script>

