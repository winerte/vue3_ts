<template>
    <el-card style="height: 10%;">
        <el-form class="cadr_up">
            <el-form-item label="用户名">
                <el-input v-model="inputData" type="text" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">搜索</el-button>
                <el-button>重置</el-button>
            </el-form-item>
        </el-form>

    </el-card>
    <el-card class="card_down" style="margin-top: 10px;">
        <el-button type="primary" @click="addUserBtn">添加</el-button>
        <el-button type="danger" @click="batchRemove">批量删除</el-button>
        <el-table :data="tableData" border style="width: 100% ;margin: 10px 0;"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection"></el-table-column>
            <el-table-column type="index"></el-table-column>
            <el-table-column prop="id" label="id" width="80px"></el-table-column>
            <el-table-column prop="username" label="用户名字" width="80px"></el-table-column>
            <el-table-column prop="name" label="用户名称" width="80px"></el-table-column>
            <el-table-column prop="roleName" label="用户角色"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="120px"></el-table-column>
            <el-table-column prop="updateTime" label="更新时间" width="120px"></el-table-column>
            <el-table-column label="操作">
                <template #default="{ row, $index }">
                    <el-button type="primary" @click="editRoleBtn(row)">分配角色</el-button>
                    <el-button type="primary" @click="editUserBtn(row)">编辑</el-button>
                    <el-button type="danger">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNo"
            :page-sizes="[3, 5, 10, 15]" :page-size="pageSize" layout=" prev, pager, next, jumper,-> ,total, sizes,"
            :total>
        </el-pagination>
        <el-drawer title="添加/修改-用户" v-model="drawer">
            <el-form :model="formData">
                <el-form-item label="用户姓名">
                    <el-input v-model="formData.username" type="text" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="用户昵称">
                    <el-input v-model="formData.name" type="text" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="用户密码">
                    <el-input v-model="formData.password" show-password></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addUser">保存</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </el-drawer>
        <el-drawer title="分配角色" v-model="drawer1">
            <el-form :model="formData1">
                <el-form-item label="用户姓名">
                    <el-input v-model="formData1.username" :disabled="true" type="text" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="职位列表">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll"
                        @change="handleCheckAllChange">全选</el-checkbox>
                    <el-checkbox-group v-model="assignRoles" @change="handleCheckedCitiesChange">
                        <el-checkbox v-for="item in roleAllList" :label="item.roleName" :key="item.roleName">{{ item.roleName
                            }}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addUser">保存</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </el-drawer>
    </el-card>


</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { getPageUser, addUserAPI, userToAssign } from '@/api/acl/user/index'
import { Record, Role } from '@/api/acl/user/type'
import useUserStore from '@/store/modules/user'


let pageSize = ref<number>(5)

let pageNo = ref<number>(1)

let inputData = ref<string>('')
let userStore = useUserStore()
let tableData = ref<Record[]>([])
let total = ref<number>(0)
let drawer = ref<boolean>(false)
let formData = reactive<Record>({
    id: 0,
    username: '',
    name: '',
    password: '',
})
onMounted(() => {
    getPageUserData(pageNo.value, pageSize.value, inputData.value)
})
const getPageUserData = async (pageNo: number, pageSize: number, inputData: string) => {
    let result = await getPageUser(pageNo, pageSize, inputData)
    if (result.code == 200) {
        pageNo = result.data.current
        pageSize = result.data.size
        total.value = result.data.total
        tableData.value = result.data.records
    }
}
const addUserBtn = () => {

    drawer.value = true
}

const addUser = async () => {
    await addUserAPI(formData)
    getPageUserData(pageNo.value, pageSize.value, inputData.value)

}
const handleSizeChange = (val: number) => {
    pageSize.value = val
    getPageUserData(pageNo.value, pageSize.value, inputData.value)
}
const handleCurrentChange = (val: number) => {
    pageNo.value = val
    getPageUserData(pageNo.value, pageSize.value, inputData.value)
}

const batchRemove = () => {
    console.log('批量删除' + ids.value)
    // clearSelection()
}
let ids = ref<number[]>([])
const handleSelectionChange = (val) => {
    ids.value = val.map(item => item.id)

}
const editUserBtn = (row) => {
    console.log(row)
    // formData = row
    // drawer.value = true
}
let drawer1 = ref<boolean>(false)
let roleAllList = ref<Role[]>([])
let assignRoles = ref<string[]>([])
let checkAll = ref<boolean>(false)
let formData1 = reactive<Record>({
    id: 0,
    username: '',
    name: '',
    password: '',
})
let isIndeterminate = ref<boolean>(true)

// 更新全选状态
const updateCheckAllStatus = () => {
    const checkedCount = assignRoles.value.length;
    checkAll.value = checkedCount === roleAllList.value.length;
    isIndeterminate.value = checkedCount > 0 && checkedCount < roleAllList.value.length;
};

// 处理角色选择变化
const handleCheckedCitiesChange = (value: string[]) => {
    assignRoles.value = value;
    updateCheckAllStatus();
};

// 处理全选变化
const handleCheckAllChange = (val: boolean) => {
    if (val) {
        // 全选：将所有角色的roleName转换为字符串数组
        assignRoles.value = roleAllList.value.map(role => role.roleName);
    } else {
        // 取消全选：清空数组
        assignRoles.value = [];
    }
    isIndeterminate.value = false;
    updateCheckAllStatus();
};

// 编辑角色按钮点击
const editRoleBtn = async (row: Record) => {
    formData1 = row;
    let result = await userToAssign(row.id);
    if (result.code == 200) {
        roleAllList.value = result.data.allRolesList;
        // 将已分配角色转换为字符串数组（只保留roleName）
        assignRoles.value = result.data.assignRoles.map(role => role.roleName);
        updateCheckAllStatus(); // 更新全选状态
        drawer1.value = true;
    }
}

</script>

<style scoped lang="scss">
.cadr_up {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.card_down {
    width: 100%;
    height: 80%;

}
</style>