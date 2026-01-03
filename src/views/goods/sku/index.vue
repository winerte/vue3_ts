<template>
    <el-card class="sku-card">
        <template #header>
            <div class="card-header">
                <span>SKU列表</span>
            </div>
        </template>

        <!-- SKU表格 -->
        <el-table :data="skuList" border style="width: 100%">
            <el-table-column type="index" label="序号" width="80"></el-table-column>
            <el-table-column prop="skuName" label="名称" width="200"></el-table-column>
            <el-table-column prop="skuDesc" label="描述" width="300" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="默认图片" width="120">
                <template #default="scope">
                    <img :src="scope.row.skuDefaultImg" style="width: 80px; height: 80px; object-fit: cover;" :alt="scope.row.skuName">
                </template>
            </el-table-column>
            <el-table-column prop="weight" label="重量(g)" width="120"></el-table-column>
            <el-table-column prop="price" label="价格(元)" width="120"></el-table-column>
            <el-table-column label="操作" width="240">
                <template #default="scope">
                    <!-- 上下架切换 -->
                    <el-button 
                        :type="scope.row.isSale === 1 ? 'success' : 'warning'" 
                        size="small"
                        @click="toggleSaleStatus(scope.row)"
                    >
                        <el-icon>
                            <arrow-up v-if="scope.row.isSale === 1" />
                            <arrow-down v-else />
                        </el-icon>
                    </el-button>
                    <!-- 编辑按钮 -->
                    <el-button type="primary" size="small" @click="editSku(scope.row)">
                        <el-icon>
                            <edit />
                        </el-icon>
                    </el-button>
                    <!-- 查看详情 -->
                    <el-button type="info" size="small" @click="viewSkuDetail(scope.row)">
                        <el-icon>
                            <InfoFilled />
                        </el-icon>
                    </el-button>
                    <!-- 删除按钮 -->
                    <el-button type="danger" size="small" @click="handleDeleteSku(scope.row.id)">
                        <el-icon>
                            <DeleteIcon />
                        </el-icon>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="pagination-container">
            <el-pagination 
                @size-change="handleSizeChange" 
                @current-change="handleCurrentChange"
                :current-page="pageNo"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="pageSize"
                layout="prev, pager, next, jumper, -> ,total, sizes"
                :total="total"
            ></el-pagination>
        </div>

        <!-- SKU详情弹窗 -->
        <el-dialog 
            title="查看商品详情" 
            v-model="dialogVisible"
            width="80%"
            top="10vh"
        >
            <div v-if="currentSkuInfo">
                <!-- 基本信息 -->
                <el-row :gutter="20">
                    <el-col :span="12">
                        <h3>{{ currentSkuInfo.skuName }}</h3>
                        <div class="price">价格：¥{{ currentSkuInfo.price }}</div>
                        <div class="desc">{{ currentSkuInfo.skuDesc }}</div>
                    </el-col>
                    <el-col :span="12">
                        <!-- 平台属性 -->
                        <div class="attr-group">
                            <h4>平台属性</h4>
                            <el-tag 
                                v-for="(attr, index) in currentSkuInfo.skuAttrValueList" 
                                :key="index"
                                style="margin: 5px;"
                            >
                                {{ attr.attrName }}：{{ attr.valueName }}
                            </el-tag>
                        </div>
                        <!-- 销售属性 -->
                        <div class="attr-group">
                            <h4>销售属性</h4>
                            <el-tag 
                                v-for="(attr, index) in currentSkuInfo.skuSaleAttrValueList" 
                                :key="index"
                                style="margin: 5px;"
                            >
                                {{ attr.saleAttrName }}：{{ attr.saleAttrValueName }}
                            </el-tag>
                        </div>
                    </el-col>
                </el-row>

                <!-- 图片轮播 -->
                <div class="image-carousel">
                    <h4>商品图片</h4>
                    <el-carousel :interval="4000" type="card" height="300px">
                        <el-carousel-item 
                            v-for="(img, index) in currentSkuInfo.skuImageList" 
                            :key="index"
                        >
                            <img :src="img.imgUrl" style="width: 100%; height: 100%; object-fit: cover;" :alt="img.imgName">
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </div>
        </el-dialog>
    </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted, getCurrentInstance } from 'vue'
import { 
    getSkuList, 
    onSaleSku, 
    cancelSaleSku, 
    deleteSku, 
    getSkuInfo 
} from '@/api/goods/sku'
import { Sku, SkuInfo } from '@/api/goods/sku/type'
import { ElMessageBox } from 'element-plus'
import { 
    ArrowUp as arrowUp, 
    ArrowDown as arrowDown, 
    Edit as edit, 
    InfoFilled, 
    Delete as DeleteIcon
} from '@element-plus/icons-vue'

// 获取当前组件实例，用于访问全局属性
const instance = getCurrentInstance()
const $message = instance?.proxy?.$message

// SKU列表数据
const skuList = ref<Sku[]>([])
// 分页参数
const pageNo = ref(1)
const pageSize = ref(10)
const total = ref(0)

// 详情弹窗
const dialogVisible = ref(false)
const currentSkuInfo = ref<SkuInfo | null>(null)

// 加载SKU列表
const loadSkuList = async () => {
    try {
        const result = await getSkuList(pageNo.value, pageSize.value)
        if (result.code === 200) {
            skuList.value = result.data.records
            total.value = result.data.total
        }
    } catch (error) {
        $message?.error('获取SKU列表失败')
    }
}

// 切换上下架状态
const toggleSaleStatus = async (sku: Sku) => {
    try {
        if (sku.isSale === 1) {
            // 下架
            const result = await cancelSaleSku(sku.id)
            if (result.code === 200) {
                sku.isSale = 0
                $message?.success('商品已下架')
            }
        } else {
            // 上架
            const result = await onSaleSku(sku.id)
            if (result.code === 200) {
                sku.isSale = 1
                $message?.success('商品已上架')
            }
        }
    } catch (error) {
        $message?.error('操作失败')
    }
}

// 查看SKU详情
const viewSkuDetail = async (sku: Sku) => {
    try {
        const result = await getSkuInfo(sku.id)
        if (result.code === 200) {
            currentSkuInfo.value = result.data
            dialogVisible.value = true
        }
    } catch (error) {
        $message?.error('获取SKU详情失败')
    }
}

// 编辑SKU
const editSku = (sku: Sku) => {
    console.log('编辑SKU:', sku)
    $message?.info('编辑功能待实现')
}

// 删除SKU
const handleDeleteSku = async (skuId: number) => {
    try {
        await ElMessageBox.confirm('确定要删除该SKU吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        })
        const result = await deleteSku(skuId)
        if (result.code === 200) {
            $message?.success('删除成功')
            loadSkuList() // 重新加载列表
        }
    } catch (error) {
        // 用户取消删除或删除失败
        if (error !== 'cancel') {
            $message?.error('删除失败')
        }
    }
}

// 分页处理
const handleSizeChange = (val: number) => {
    pageSize.value = val
    pageNo.value = 1
    loadSkuList()
}

const handleCurrentChange = (val: number) => {
    pageNo.value = val
    loadSkuList()
}

// 初始化加载
onMounted(() => {
    loadSkuList()
})
</script>

<style scoped>
.sku-card {
    margin-bottom: 20px;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.pagination-container {
    margin-top: 20px;
    text-align: right;
}

/* 详情弹窗样式 */
.price {
    font-size: 24px;
    color: #ff4d4f;
    margin: 10px 0;
}

.desc {
    margin: 10px 0;
    color: #666;
}

.attr-group {
    margin: 20px 0;
}

.attr-group h4 {
    margin-bottom: 10px;
    color: #333;
}

.image-carousel {
    margin-top: 30px;
}

.image-carousel h4 {
    margin-bottom: 10px;
    color: #333;
}
</style>