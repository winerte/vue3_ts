// SKU基本类型定义
export interface Sku {
    id: number;
    skuName: string;
    skuDesc: string;
    catalogId: number;
    price: number;
    weight: number;
    tmId: number;
    spuId: number;
    isSale: number; // 1-上架 0-下架
    skuDefaultImg: string;
    createTime: string;
    updateTime: string;
    // 平台属性
    skuAttrValueList?: SkuAttrValue[];
    // 销售属性
    skuSaleAttrValueList?: SkuSaleAttrValue[];
    // 图片列表
    skuImageList?: SkuImage[];
}

// SKU平台属性值
export interface SkuAttrValue {
    id: number;
    attrId: number;
    valueId: number;
    skuId: number;
    attrName?: string;
    valueName?: string;
}

// SKU销售属性值
export interface SkuSaleAttrValue {
    id: number;
    saleAttrId: number;
    saleAttrValueId: number;
    skuId: number;
    saleAttrName?: string;
    saleAttrValueName?: string;
}

// SKU图片
export interface SkuImage {
    id: number;
    skuId: number;
    imgName: string;
    imgUrl: string;
    spuImgId: number;
    isDefault: number; // 1-默认图 0-非默认图
}

// SKU分页列表
export interface SkuPage {
    records: Sku[];
    total: number;
    size: number;
    current: number;
    searchCount: boolean;
    pages: number;
}

// SKU详情
export interface SkuInfo extends Sku {
    // 扩展字段，用于详情展示
    spuName?: string;
    tmName?: string;
    catalogName?: string;
}

// 基础响应类型
export interface BaseResponse<T> {
    code: number;
    message: string;
    data: T;
    ok: boolean;
}