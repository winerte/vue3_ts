import request from '@/utils/request'
import { Sku, SkuPage, SkuInfo, BaseResponse } from './type'

// 获取SKU分页列表
export const getSkuList = (page: number, limit: number): Promise<BaseResponse<SkuPage>> => {
    return request.get(`/admin/product/list/${page}/${limit}`)
}

// 根据SPU ID查询SKU列表
export const getSkuListBySpuId = (spuId: number): Promise<BaseResponse<Sku[]>> => {
    return request.get(`/admin/product/findBySpuId/${spuId}`)
}

// 获取SKU详情
export const getSkuInfo = (skuId: number): Promise<BaseResponse<SkuInfo>> => {
    return request.get(`/admin/product/getSkuInfo/${skuId}`)
}

// 上架SKU
export const onSaleSku = (skuId: number): Promise<BaseResponse<null>> => {
    return request.get(`/admin/product/onSale/${skuId}`)
}

// 下架SKU
export const cancelSaleSku = (skuId: number): Promise<BaseResponse<null>> => {
    return request.get(`/admin/product/cancelSale/${skuId}`)
}

// 删除SKU
export const deleteSku = (skuId: number): Promise<BaseResponse<null>> => {
    return request.delete(`/admin/product/deleteSku/${skuId}`)
}

// 新增SKU
export const saveSkuInfo = (data: any): Promise<BaseResponse<null>> => {
    return request.post(`/admin/product/saveSkuInfo`, data)
}

// 获取商品图片列表
export const getSpuImageList = (spuId: number): Promise<BaseResponse<any[]>> => {
    return request.get(`/admin/product/spuImageList/${spuId}`)
}

// 获取商品销售属性列表
export const getSpuSaleAttrList = (spuId: number): Promise<BaseResponse<any[]>> => {
    return request.get(`/admin/product/spuSaleAttrList/${spuId}`)
}