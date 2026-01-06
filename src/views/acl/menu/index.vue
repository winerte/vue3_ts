<template>
    <el-card>
        <template #header>
            <div class="card-header">
                <span>菜单管理</span>
            </div>
        </template>

        <!-- 树形表格 -->
        <el-table :data="menuList" border style="width: 100%" row-key="id"
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
            <el-table-column prop="name" label="名称" width="250"></el-table-column>
            <el-table-column prop="code" label="权限值" width="200"></el-table-column>
            <el-table-column prop="updateTime" label="修改时间" width="250"></el-table-column>
            <el-table-column label="操作" align="center">
                <template #default="scope">
                    <!-- 根据菜单层级显示不同的按钮文本 -->
                    <el-button type="primary" size="mini">
                        {{ scope.row.level === 1 ? '添加菜单' : '添加功能' }}
                    </el-button>
                    <el-button type="success" size="mini">编辑</el-button>
                    <el-button type="danger" size="mini">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getAllPermission } from '@/api/acl/menu/index'
import { Menu } from '@/api/acl/menu/type'

// 菜单列表数据
let menuList = ref<Menu[]>([])

// 获取菜单列表
const getMenuList = async () => {
    let result = await getAllPermission()
    if (result.code === 200) {
        menuList.value = result.data
    }
}

// 初始化加载
onMounted(() => {
    getMenuList()
})
</script>

<style scoped lang="scss">
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>