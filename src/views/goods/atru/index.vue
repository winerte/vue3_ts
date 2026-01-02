<template>
    <el-card class="box-card_up">
        <!-- 使用Category组件 -->
        <Category 
            v-model:c1Id="c1Id" 
            v-model:c2Id="c2Id" 
            v-model:c3Id="c3Id"
            @categoryChange="handleCategoryChange"
        ></Category>
    </el-card>
    <el-card class="box-card_down">
        <template #header>
            <el-button class="button" type="primary" :disabled="c3Id === ( 0 && undefined )? true : false " @click="addAttr">
                <el-icon style="vertical-align: middle;">
                    <plus />
                </el-icon>
                <span>添加属性</span>
            </el-button>
        </template>
        <!-- 表格 -->
        <el-table :data="tableData" border style="width: 100% ">
            <el-table-column label="序号" type="index" width="80px"> </el-table-column>
            <el-table-column label="属性名称" width="200px" prop="attrName"> </el-table-column>
            <el-table-column label="属性值名称">
                <template #="tag">
                    <el-tag style="margin: 5px;" v-for="(item) in tag.row.attrValueList" :key="item.id">{{
                        item.valueName }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="300px">
                <template #="scope">
                    <el-button type="primary" size="mini" @click="updateAttr(scope.row)">修改</el-button>
                    <el-button type="danger" size="mini" @click="delAttr(scope.row.id)" >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 弹窗 -->
        <el-dialog :title v-model="dialogFormVisible">
            <el-form :model="formData">
                <el-form-item label="属性名称">
                    <el-input v-model="formData.attrName" @input="inputChange"></el-input>
                </el-form-item>
                <el-form-item class="attr-value-section">
                    <div class="button-group">
                        <el-button type="primary" :disabled @click="addTable">
                            <el-icon style="vertical-align: middle;">
                                <plus />
                            </el-icon>
                            <span>添加属性值</span>
                        </el-button>
                        <el-button type="normal" @click="cleanInput" style="margin-left: 10px;">
                            <span>取消</span>
                        </el-button>
                    </div>
                    <el-table border :data="formData?.attrValueList" highlight-current-row style="width:100% ; margin-top: 20px;">
                        <el-table-column type="index" width="50"> </el-table-column>
                        <el-table-column property="valueName" label="属性值" width="120">
                            <template #="tagValue">
                                <el-input v-model="tagValue.row.valueName"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template #="delValue">
                                <el-button type="danger" size="mini" @click="delTable(delValue.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="clickButton">确 定</el-button>
                </span>
            </template>
        </el-dialog>

    </el-card>
</template>
<script setup lang="ts">
    
import { ref, watch } from 'vue'
import { reqAttrList, reqDelete, reqAddOrUpdate } from '@/api/goods/artu'
import { AttrInfo ,AttrValueList} from '@/api/goods/artu/type'
// 导入Category组件
import Category from '@/commpents/category.vue'

// 选中的分类ID
const c1Id = ref<number>(0)
const c2Id = ref<number>(0)
const c3Id = ref<number>(0)

const tableData = ref<AttrInfo[]>([])

const formData = ref<AttrInfo>()

let disabled = ref<boolean>(true)

let dialogFormVisible = ref<boolean>(false)
let title = ref<string>('')

const inputChange = () => {
    disabled.value = false
}

const cleanInput = () => {
    disabled.value = true
    formData.value!.attrName = ''
}

// 处理分类变化事件
const handleCategoryChange = (c1Id: number, c2Id: number, c3Id: number) => {
    if (c3Id === 0) {
        tableData.value = []
        return
    }
    getAttrList()
}

// 监听c3Id变化，获取属性列表
watch(c3Id, () => {
    if (c3Id.value === 0) {
        tableData.value = []
        return
    }
    getAttrList()
})

// 获取属性列表
const getAttrList = async () => {
    let result = await reqAttrList(c1Id.value, c2Id.value, c3Id.value)
    if (result.code === 200) {
        tableData.value = result.data
    } else {
        tableData.value = []
    }
}

// 删除属性
const delAttr = async (id:number) => {
    let result = await reqDelete(id)
    if (result.code === 200) {
        getAttrList()
        alert('删除成功')
    } else {
        alert('删除失败')
    }
}

// 修改属性
const updateAttr = (data: AttrInfo) => {
    title.value = '修改属性'
    dialogFormVisible.value = true
    formData.value = data
    disabled.value = false
}

// 点击确定按钮
const clickButton = async () => {
    let result = await reqAddOrUpdate(formData.value!)

    if (formData.value?.id) {
        //修改
        if (result.code === 200) {
            getAttrList()
            dialogFormVisible.value = false
            alert('修改成功')
        }
    } else {
        //添加
        if (result.code === 200) {
            getAttrList()
            dialogFormVisible.value = false
            alert('添加成功')
        }
    }
}

// 添加属性
const addAttr = () => {
    if (c3Id.value === 0 || c3Id.value === undefined) {
        return
    }

    dialogFormVisible.value = true
    title.value = '添加属性'
    formData.value = {
        attrName: '',
        categoryId: c3Id.value!,
        categoryLevel: 3,
        attrValueList: []
    }
}

// 添加属性值
const addTable = () => {
    formData.value!.attrValueList.push({
        valueName: '',
        attrId: 0
    })
}

// 删除属性值
const delTable = (data:AttrValueList)=>{
    formData.value!.attrValueList = formData.value!.attrValueList.filter(item=>item.id !== data.id)
}
</script>


<style scoped lang="scss">
.box-card_up {
    width: 100%;
    height: 10%;
    margin-bottom: 10px;

}

.box-card_down {
    width: 100%;
    height: 85%;
}

// 属性值部分样式
.attr-value-section {
    padding: 10px 0;
}

.button-group {
    display: flex;
    align-items: center;
}

// 自定义按钮间距
.button-group :deep(.el-button) {
    margin-right: 10px;
}
</style>
