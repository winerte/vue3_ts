<template>
    <el-card class="box-card">
        <template #header>
            <el-button class="button" type="primary" @click="addTrademark">
                <el-icon style="vertical-align: middle;">
                    <plus />
                </el-icon>
                <span>添加品牌</span>
            </el-button>
        </template>
        <el-table :data="tableData" border style="width: 100%">

            <el-table-column type="index" label="序号" width="80"> </el-table-column>
            <el-table-column prop="tmName" label="品牌名称" width="180"> </el-table-column>
            <el-table-column label="品牌logo">
                <template #="logo">
                    <img :src="logo.row.logoUrl" style="width: 24px; height: 24px;"></img>
                </template>
            </el-table-column>
            <el-table-column prop="edit" label="品牌操作">
                <template #default="scope">
                    <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete( scope.row.id)">删除</el-button>
                </template> </el-table-column>
        </el-table>
        <span>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="currentPage" :page-sizes="[5, 10, 20, 30]" :page-size="pageSize" prev-text="上一页"
                next-text="下一页" layout="total,  prev, pager, next,sizes, jumper" :total="total">
            </el-pagination>
        </span>
        <el-dialog :title v-model="dialogFormVisible">
            <el-form :model="formData" label-width="80px">
                <el-form-item label="品牌名称" >
                    <el-input v-model="formData.tmName" placeholder="请输入品牌名称"></el-input>
                </el-form-item>
                <el-form-item label="品牌logo">
                    <el-upload class="upload-demo" drag :action="uploadUrl" :headers="uploadHeaders" multiple>
                        <el-icon><Plus/></el-icon>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <template #tip>
                            <div class="el-upload__tip">只能上传 jpg/png 文件，且不超过 500kb</div>
                        </template>
                    </el-upload>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="btnCont">确 定</el-button>
                </span>
            </template>
        </el-dialog>

    </el-card>
</template>

<script setup lang="ts">

import { ref, onMounted, reactive, computed } from 'vue'
import { reqBaseTrademark,reqAdd,reqUpdate ,reqDelete} from '@/api/goods/kids'
import { Records } from '@/api/goods/kids/type'
import useUserStore from '@/store/modules/user'

let tableData = ref<Records>();
let total = ref<number>(1)
let currentPage = ref<number>(1)
let pageSize = ref<number>(10)
let dialogFormVisible = ref<boolean>(false)
let title  = ref<string>('')    
let formData = reactive<Records>({
    id: 0,
    tmName: '',
    logoUrl: '/api/static/img/sph/20241210/oppo.jpeg',
})

// 使用环境配置的上传路径
const uploadUrl = ref<string>(`${import.meta.env.VITE_BASE_API}/admin/product/fileUpload`)

// 获取user store
const userStore = useUserStore()

// 计算属性生成上传headers，携带token
const uploadHeaders = computed(() => ({
  token: userStore.token || ''
}))

const getBaseTrademark = async (page: number = 1, pageSize: number) => {
    let result = await reqBaseTrademark(page, pageSize)
    total.value = result.data.total;
    tableData.value = result.data.records
    currentPage.value = result.data.current;
    pageSize = result.data.size;
}


onMounted(() => {
    getBaseTrademark(currentPage.value, pageSize.value)

})


const handleEdit = (row: Records) => {
    title.value = '修改品牌'
    formData.tmName = row.tmName
    formData.id = row.id
    dialogFormVisible.value = true
}
const handleDelete = async( id: number) => {
     let result = await reqDelete(id)
     if(result.code === 200){
        getBaseTrademark(1, 10)
        alert('删除成功')
    }else{
        alert('删除失败')
    }
}
const handleSizeChange = (val: any) => {
    pageSize.value = val
    getBaseTrademark(currentPage.value, val)
}
const handleCurrentChange = (val: any) => {
    currentPage.value = val
    getBaseTrademark(val, pageSize.value)
}

const addTrademark = () => {
    formData.tmName = ''

    title.value = '添加品牌'
    dialogFormVisible.value = true
}
const btnCont = async() => {
 
    if(formData.id != 0){
        let result = await reqUpdate(formData)
        if(result.code === 200){
            getBaseTrademark(currentPage.value, pageSize.value)
            dialogFormVisible.value = false
            alert('修改成功')
        }else{
            alert('修改失败')
        }
    }else{
        let result = await reqAdd(formData)
    if(result.code === 200){
        getBaseTrademark(currentPage.value, pageSize.value)
        dialogFormVisible.value = false
        alert('添加成功')
    }else{
        alert('添加失败')
    }
    }
   
   
}
</script>


<style scoped lang="scss">
.box-card {
    width: 100%;
    height: 100%;
}
</style>