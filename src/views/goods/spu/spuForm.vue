<template>
    <el-card>
        <el-form ref="form" :model="row" label-width="120px">
            <el-form-item label="spu名称">
                <el-input v-model="row.spuName"></el-input>
            </el-form-item>
            <el-form-item label="spu品牌">
                <el-select v-model="selectId" placeholder="请选择" style="width: 200px">
                    <el-option v-for="(item, index) in markData" :key="index" :label="item.tmName"
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="spu描述">
                <el-input type="textarea" autosize placeholder="请输入内容" v-model="row.description">
                </el-input>
            </el-form-item>
            <el-form-item label="spu照片">
                <el-upload :action="uploadUrl" :headers="uploadHeaders" list-type="picture-card"
                    :on-preview="handlePictureCardPreview" :on-success="handleUploadSuccess" >
                    <el-icon>
                        <plus />
                    </el-icon>
                </el-upload>
                <el-dialog v-model="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="" />
                </el-dialog>
            </el-form-item>
            <el-form-item label="spu销售属性">
                <el-select multiple placeholder="请选择111" style="width: 200px ;">
                    <el-option label="请选择" value=""></el-option>
                </el-select>
                <el-button type="primary" icon="plus" style="margin-left: 10px;">添加</el-button>
                <el-table border style="margin: 10px 0;" width="100%">
                    <el-table-column type="index" label="序号" width="80"></el-table-column>
                    <el-table-column label="属性名"></el-table-column>
                    <el-table-column label="属性值">
                        <el-tag>111</el-tag>
                    </el-table-column>
                    <el-table-column label="操作">
                        <el-button type="primary">添加</el-button>
                        <el-button type="danger">删除</el-button>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitData">保存</el-button>
                <el-button @click="cancle">取消</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>
<script setup lang="ts">
import { ref, onMounted, watch, computed, reactive } from 'vue'
import { reqAllList } from '@/api/goods/kids'
import { Records } from '@/api/goods/kids/type'
import { imageList, spuSaleAttrList, baseSaleAttrList } from '@/api/goods/spu'
import { Record ,ImgData} from '@/api/goods/spu/type'
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/modules/user'



// 定义props，接收row值
const props = defineProps<{
    row?: Record,
    c3Id?: number
}>()

onMounted(() => {
    getReqAllList()
    getBaseTrademark()

})

watch(() => props.row, () => {
    if (props.row) {
        getImageList(props.row.id)
        getSpuSaleAttrList(props.row.id)
    }
})


let markData = ref<Records[]>([])
const getReqAllList = async () => {
    let result = await reqAllList()
    if (result.code === 200) {
        markData.value = result.data
    }
}
const getImageList = async (spuId: number) => {
    let result = await imageList(spuId)
    if (result.code == 200) {
        console.log(result.data)
    }
}

const getSpuSaleAttrList = async (spuId: number) => {
    let result = await spuSaleAttrList(spuId)
    if (result.code == 200) {
        console.log(result.data)
    }
}

// 获取所有销售列表
const getBaseTrademark = async () => {
    let result = await baseSaleAttrList()
    if (result.code == 200) {
        console.log(result.data)
    }
}

let selectId = ref<number>()

// 获取user store
const userStore = useUserStore()

// 计算属性生成上传headers，携带token
const uploadHeaders = computed(() => ({
  token: userStore.token || ''
}))

// 使用环境配置的上传路径
const uploadUrl = ref<string>(`${import.meta.env.VITE_BASE_API}/admin/product/fileUpload`)

let $emit = defineEmits(['changeSence'])
const cancle = () => {
    $emit('changeSence', 0)
}

const submitData = () => {
    console.log('保存成功')
    ElMessage.success({
        message: '恭喜你，这是一条成功消息',
        type: 'success',
    })  
}

let dialogVisible = ref<boolean>(false)
    let dialogImageUrl = ref<string>('')
const handlePictureCardPreview =(file)=>{
    dialogVisible.value = true
    dialogImageUrl=file.url
}
let uploadFileList = ref<ImgData[]>([])
let imgData = reactive<ImgData>({
    imgName: '',
    imgUrl: '',
    spuId: props.c3Id!
})
const handleUploadSuccess = (file) => {
    if(file){
        imgData.imgUrl = file.response.data
        imgData.imgName = file.name
        uploadFileList.value.push(imgData)
    }
}
</script>