<template>
       <div>
            <el-form :inline="true" size="medium">

                <el-form-item label="一级分类" label-width="80px">
                    <el-select v-model="c1Id" placeholder="请选择" @change="handleC1Change" style="width: 200px">
                        <el-option v-for="item in c1List" :key="item.id" :label="item.name"
                            :value="item.id"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="二级分类">
                    <el-select v-model="c2Id" placeholder="请选择" @change="handleC2Change" style="width: 200px">
                        <el-option v-for="item in c2List" :key="item.id" :label="item.name"
                            :value="item.id"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="三级分类">
                    <el-select v-model="c3Id" placeholder="请选择" @change="handleC3Change" style="width: 200px">
                        <el-option v-for="item in c3List" :key="item.id" :label="item.name"
                            :value="item.id"></el-option>
                    </el-select>
                </el-form-item>

            </el-form>
        </div>

</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
import { reqC1, reqC2, reqC3 } from '@/api/goods/artu'
import { CategoryInfo } from '@/api/goods/artu/type'

// 定义组件props，用于接收父组件传递的数据
const props = defineProps<{
  c1Id?: number
  c2Id?: number
  c3Id?: number
}>()

// 定义事件，用于向父组件传递数据
const emit = defineEmits<{
  'update:c1Id': [value: number]
  'update:c2Id': [value: number]
  'update:c3Id': [value: number]
  'categoryChange': [c1Id: number, c2Id: number, c3Id: number]
}>()

// 分类数据
const c1List = ref<CategoryInfo[]>([])
const c2List = ref<CategoryInfo[]>([])
const c3List = ref<CategoryInfo[]>([])

// 分类ID，使用props的初始值
const c1Id = ref<number>(props.c1Id || 0)
const c2Id = ref<number>(props.c2Id || 0)
const c3Id = ref<number>(props.c3Id || 0)

// 获取一级分类列表
const getC1List = async () => {
  try {
    let result = await reqC1()
    c1List.value = Array.isArray(result) ? result : result.data || []
  } catch (error) {
    console.error('获取一级分类失败:', error)
    c1List.value = []
  }
}

// 获取二级分类列表
const getC2List = async (c1Id: number) => {
  try {
    let result = await reqC2(c1Id)
    c2List.value = Array.isArray(result) ? result : result.data || []
    // 清空三级分类
    c2Id.value = 0
    c3Id.value = 0
    c3List.value = []
    // 通知父组件
    emit('update:c2Id', 0)
    emit('update:c3Id', 0)
    emit('categoryChange', c1Id, 0, 0)
  } catch (error) {
    console.error('获取二级分类失败:', error)
    c2List.value = []
  }
}

// 获取三级分类列表
const getC3List = async (c2Id: number) => {
  try {
    let result = await reqC3(c2Id)
    c3List.value = Array.isArray(result) ? result : result.data || []
    // 清空三级分类选中值
    c3Id.value = 0
    // 通知父组件
    emit('update:c3Id', 0)
    emit('categoryChange', c1Id.value, c2Id, 0)
  } catch (error) {
    console.error('获取三级分类失败:', error)
    c3List.value = []
  }
}

// 一级分类变化时触发
const handleC1Change = (value: number) => {
  c1Id.value = value
  
  emit('update:c1Id', value)
  getC2List(value)
}

// 二级分类变化时触发
const handleC2Change = (value: number) => {
  c2Id.value = value

  emit('update:c2Id', value)
  getC3List(value)
}

// 三级分类变化时触发
const handleC3Change = (value: number) => {
  c3Id.value = value
  emit('update:c3Id', value)
  emit('categoryChange', c1Id.value, c2Id.value, value)
}

// 组件挂载时获取一级分类列表
onMounted(() => {
  getC1List()
})
</script>