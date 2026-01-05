<template>
    <el-card>
        <el-form class="card_top">
            <el-form-item label="角色名称">
                <el-input placeholder="请输入角色名称" v-model="inputData"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">搜索</el-button>
                <el-button>重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card class="card_down" style="margin-top: 10px;">
        <el-button :icon="'plus'" type="primary">
            添加角色
        </el-button>
        <el-table :data="roleList" border style="margin: 10px 0;" width="100%">
            <el-table-column type="index"></el-table-column>
            <el-table-column label="id" width="150px" prop="id"></el-table-column>
            <el-table-column label="角色名称" width="150px" prop="roleName"></el-table-column>
            <el-table-column label="创建时间" width="180px" prop="createTime"></el-table-column>
            <el-table-column label="更新时间" width="180px" prop="updateTime"></el-table-column>
            <el-table-column label="操作" align="center">
                <template #="{ row }">
                    <el-button type="primary" size="mini" @click="roleBtn(row)">分配权限</el-button>
                    <el-button type="primary" size="mini">编辑</el-button>
                    <el-button type="primary" size="mini">删除</el-button>
                </template>
            </el-table-column>

        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page=pageNo
            :page-sizes="[3, 5, 8, 10]" :page-size=pageSize layout=" prev, pager, next, jumper, -> ,total, sizes,"
            :total>
        </el-pagination>
        <el-drawer title="树形结构" v-model="drawer"  destroy-on-close>
            <el-tree :data="treeData" show-checkbox node-key="id"  :default-checked-keys="checkedKeys"
                 :props="defaultProps">
            </el-tree>
        </el-drawer>
    </el-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getPageRole } from '@/api/acl/role/index'
import { RolePageList, RolePageData, Role } from '@/api/acl/role/type'
import {getAllPermission,roleToAssign} from  '@/api/acl/menu/index'
import { MenuListData, Menu } from '@/api/acl/menu/type'

let inputData = ref<string | null>('')
let pageNo = ref<number>(1)
let pageSize = ref<number>(5)
let rolePageData = ref<RolePageData>()
let total = ref<number>()
let roleList = ref<Role[]>([])

onMounted(() => {
    getPageRoleList()
})

const getPageRoleList = async () => {
    let result = await getPageRole(pageNo.value, pageSize.value, inputData.value)
    if (result.code === 200) {
        rolePageData.value = result.data
        total.value = result.data.total
        pageNo.value = result.data.current
        pageSize.value = result.data.size
        roleList.value = result.data.records
    }
}
const handleSizeChange = (val: number) => {
    pageSize.value = val
    getPageRoleList()
};

const handleCurrentChange = (val: number) => {
    pageNo.value = val
    getPageRoleList()
};
let drawer = ref(false)
let treeData =ref<Menu[]>([])
let roleToAssignData =ref<Menu[]>([])
let defaultProps = ref({
    label: 'name',
    children: 'children'
})
let checkedKeys = ref<number[]>([])
const fittleTreeData = (data: Menu[],inint: number[]) => { 
    data.forEach(item => {
        if (item.select && item.level == 4 ) {
            inint.push(item.id)
        }
        if (item.children && item.children.length > 0) {
            fittleTreeData(item.children,inint)
        }
    })

}
const getRolePermission = async (roleId: number) => {
    let result = await roleToAssign(roleId)
    if(result.code === 200) {
        roleToAssignData.value = result.data
        fittleTreeData(roleToAssignData.value,checkedKeys.value)
    }
}
const roleBtn = async (row: Role) => {
    let result = await getAllPermission()
    
    if(result.code === 200) {
        treeData.value = result.data
        getRolePermission(row.id)
    }
    drawer.value = true
}
</script>

<style scoped lang="scss">
.card_top {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.card_down {
    margin-top: 10px;
}
</style>
