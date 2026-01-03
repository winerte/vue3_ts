<template>
    <el-card>
        <el-form ref="form" :model="skuFormData" label-width="120px">
            <!-- SPU基本信息 -->
            <el-divider content-position="left">SPU基本信息</el-divider>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="SPU名称">
                        <el-input v-model="spuInfo.spuName" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="SPU描述">
                        <el-input v-model="spuInfo.description" disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <!-- SKU表单 -->
            <el-divider content-position="left">SKU信息</el-divider>
            <el-form-item label="SKU名称">
                <el-input v-model="skuFormData.skuName" placeholder="请输入SKU名称"></el-input>
            </el-form-item>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="价格(元)">
                        <el-input v-model="skuFormData.price" type="number" placeholder="请输入价格"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="重量(克)">
                        <el-input v-model="skuFormData.weight" type="number" placeholder="请输入重量"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="SKU描述">
                <el-input v-model="skuFormData.skuDesc" type="textarea" autosize placeholder="请输入SKU描述"></el-input>
            </el-form-item>

            <!-- 平台属性 -->
            <el-divider content-position="left">平台属性</el-divider>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="手机一级">
                        <el-select v-model="skuFormData.platformAttr1" placeholder="请选择">
                            <el-option label="请选择" value=""></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="电池容量">
                        <el-select v-model="skuFormData.platformAttr2" placeholder="请选择">
                            <el-option label="请选择" value=""></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="运行内存">
                        <el-select v-model="skuFormData.platformAttr3" placeholder="请选择">
                            <el-option label="请选择" value=""></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="机身内存">
                        <el-select v-model="skuFormData.platformAttr4" placeholder="请选择">
                            <el-option label="请选择" value=""></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="CPU型号">
                        <el-select v-model="skuFormData.platformAttr5" placeholder="请选择">
                            <el-option label="请选择" value=""></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="屏幕尺寸">
                        <el-select v-model="skuFormData.platformAttr6" placeholder="请选择">
                            <el-option label="请选择" value=""></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>

            <!-- 销售属性 -->
            <el-divider content-position="left">销售属性</el-divider>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="颜色">
                        <el-select v-model="skuFormData.saleAttr1" placeholder="请选择">
                            <el-option label="请选择" value=""></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>

            <!-- 图片管理 -->
            <el-divider content-position="left">图片管理</el-divider>
            <el-table :data="spuImages" border style="margin: 10px 0; width: 100%">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column label="图片" width="120">
                    <template #default="scope">
                        <img :src="scope.row.imgUrl" style="width: 80px; height: 80px; object-fit: cover;">
                    </template>
                </el-table-column>
                <el-table-column prop="imgName" label="名称"></el-table-column>
                <el-table-column label="操作" width="120">
                    <template #default="scope">
                        <el-button type="primary" size="small" @click="setDefaultImage(scope.row)">
                            设置默认
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 操作按钮 -->
            <el-form-item>
                <el-button type="primary" @click="saveSku">保存SKU</el-button>
                <el-button @click="cancle">取消</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted } from 'vue'
import { Record } from '@/api/goods/spu/type'
import { ElMessage } from 'element-plus'

// 定义props，接收row和c3Id
const props = defineProps<{
    row?: Record,
    c3Id?: number
}>()

let emit = defineEmits(['changeSence'])

// SPU信息
const spuInfo = reactive({
    spuName: '',
    description: ''
})

// SKU表单数据
const skuFormData = reactive({
    skuName: '',
    price: 0,
    weight: 0,
    skuDesc: '',
    platformAttr1: '',
    platformAttr2: '',
    platformAttr3: '',
    platformAttr4: '',
    platformAttr5: '',
    platformAttr6: '',
    saleAttr1: '',
    isDefault: 0
})

// SPU图片列表
const spuImages = ref<any[]>([])

// 监听row变化，更新SPU信息
watch(() => props.row, (newRow) => {
    if (newRow) {
        spuInfo.spuName = newRow.spuName || ''
        spuInfo.description = newRow.description || ''
        // 加载SPU图片列表
        if (newRow.id) {
            getSpuImages(newRow.id)
        }
    }
}, { immediate: true })

// 获取SPU图片列表
const getSpuImages = async (spuId: number) => {
    // 这里需要调用实际的API
    console.log('获取SPU图片列表，spuId:', spuId)
    // 模拟数据
    spuImages.value = [
        { id: 1, imgUrl: 'https://picsum.photos/200/200?random=1', imgName: '1.png' },
        { id: 2, imgUrl: 'https://picsum.photos/200/200?random=2', imgName: '2.png' },
        { id: 3, imgUrl: 'https://picsum.photos/200/200?random=3', imgName: '3.png' }
    ]
}

// 设置默认图片
const setDefaultImage = (image: any) => {
    // 清除之前的默认图片
    spuImages.value.forEach(img => {
        img.isDefault = 0
    })
    // 设置当前图片为默认
    image.isDefault = 1
    ElMessage.success('已设置为默认图片')
}

// 保存SKU
const saveSku = () => {
    console.log('保存SKU数据:', skuFormData)
    ElMessage.success('SKU保存成功')
}

// 取消
const cancle = () => {
    emit('changeSence', 0)
}
</script>

<style scoped>
.el-card {
    margin-bottom: 20px;
}

.el-divider {
    margin: 20px 0;
}
</style>

