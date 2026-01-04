<template>

    <el-card class="box-card-up">
        <Category v-model:c1Id="c1Id" v-model:c2Id="c2Id" v-model:c3Id="c3Id" @categoryChange="handleCategoryChange">
        </Category>
    </el-card>

    <div v-show="sence == 0">
        <el-card class="box-card_down">
            <el-button class="button" type="primary" :disabled="c3Id === undefined ? true : false"
                @click="addSence(currentRow)">
                <el-icon style="vertical-align: middle;">
                    <plus />
                </el-icon>
                <span>添加SPU</span>
            </el-button>
            <el-table border style="margin: 10px 0;  width: 100%;" :data="tableData">
                <el-table-column type="index" label="序号" width="80"> </el-table-column>
                <el-table-column prop="spuName" label="SPU名称" width="230"> </el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="description" label="SPU描述" width="350">
                </el-table-column>
                <el-table-column label="操作">
                    <template #="{ row, $index }">
                        <el-button type="primary" @click="addSence(row)">
                            <el-icon style="vertical-align: middle;">
                                <plus />
                            </el-icon>
                        </el-button>
                        <el-button type="warning" @click="addSkuSence(row)">
                            <el-icon style="vertical-align: middle;">
                                <edit />
                            </el-icon>
                        </el-button>
                        <el-button type="info" @click="infoClick(row)">
                            <el-icon style="vertical-align: middle;">
                                <InfoFilled />
                            </el-icon>
                        </el-button>
                        <el-button type="danger" @click="">
                            <el-icon style="vertical-align: middle;">
                                <delete />
                            </el-icon>
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNo"
                :page-sizes="[5, 10, 15, 20]" :page-size="pageSize"
                layout=" prev, pager, next, jumper , -> ,total, sizes," :total="productPageData?.total">
            </el-pagination>
            <el-drawer title="spu信息" v-model="drawer" destroy-on-close>
                <el-row>
                    <el-col :span="8">
                        spu名称
                    </el-col>
                    <el-col :span="16">
                        {{ currentRow.spuName }}
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        spu描述
                    </el-col>
                    <el-col :span="16">
                        {{ currentRow.description }}
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        spu图片
                    </el-col>
                    <el-col :span="16">
                        <el-carousel :interval="4000" type="card" height="200px">
                            <el-carousel-item v-for="(item, index) in currentRow.spuImageList || []" :key="index">
                                <img :src="item.imgUrl" style="width: 100%; height: 100%; object-fit: cover;">
                            </el-carousel-item>
                        </el-carousel>
                    </el-col>
                </el-row>



            </el-drawer>
        </el-card>
    </div>

    <div>
        <spuForm v-show="sence === 1" @changeSence="changeSence" :row="currentRow" :c3Id="c3Id" @update:spuImageList="updateSpuImageList"></spuForm>
    </div>

    <div>
        <skuForm v-show="sence === 2" @changeSence="changeSence" :row="currentRow" :c3Id="c3Id"></skuForm>
    </div>



</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import Category from '@/commpents/category.vue';
import { productList, baseSaleAttrList } from '@/api/goods/spu'
import { ProductPage, Record } from '@/api/goods/spu/type'
import spuForm from './spuForm.vue';
import skuForm from './skuForm.vue';

let sence = ref(0); // 0当前样式 1修改添加spu 添加sku
let c1Id = ref<number>();
let c2Id = ref<number>();
let c3Id = ref<number>();

let tableData = ref<Record[]>()
let productPageData = ref<ProductPage>()
// 当前选中的row数据
let currentRow = ref<Record>({
    id: 0,
    spuName: '',
    description: '',
    category3Id: 0,
    tmId: 0,
})

let pageNo = ref(1);
let pageSize = ref(10);

watch(c3Id, () => {
    if (!c3Id.value)
        return
    getProducts()
})

const changeSence = (num: number) => {
    sence.value = num
}
const addSence = (row: Record) => {
    sence.value = 1
    currentRow.value = row
}
const addSkuSence = (row: Record) => {
    sence.value = 2
    currentRow.value = row
}

const getProducts = async () => {
    let result = await productList(pageNo.value, pageSize.value, c3Id.value!)
    if (result.code == 200) {
        productPageData.value = result.data
        tableData.value = result.data.records
    }
}
const handleSizeChange = (val: any) => {
    pageSize.value = val
}
const handleCurrentChange = (val: any) => {
    pageNo.value = val
}

const handleCategoryChange = (c3Id: number) => {
    console.log('c3Id', c3Id);
}
let drawer = ref(false);
const updateSpuImageList = (imageList: any[]) => {
    currentRow.value.spuImageList = imageList
}

const infoClick = (row: Record) => {
    currentRow.value = row
    drawer.value = true
}
</script>

<style scoped lang="scss">
.box-card-up {
    width: 100%;
    margin-bottom: 20px;

}

.box-card-down {
    width: 100%;
    height: 88%;
}
</style>