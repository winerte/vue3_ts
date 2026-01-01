// 基础响应类型
export interface baseReqData<T> {
    code: number;
    data: T;
    message: string;
}

// 分类信息类型
export interface CategoryInfo {
    id: number;
    name: string;
}

// 分类列表响应类型（用于c1、c2、c3）
export interface CategoryListResponse extends baseReqData<CategoryInfo[]> {}

// 单个属性响应类型
export interface AttrItemResponse extends baseReqData<AttrInfo> {}

// 属性信息类型
export interface AttrInfo {
    id?:            number;
    attrName:      string;
    categoryId:    number;
    categoryLevel: number;
    attrValueList: AttrValueList[];
}

export interface AttrValueList {
    id?:        number;
    valueName: string;
    attrId?:    number;
}

export interface  AttrListResponse extends baseReqData<AttrInfo[]> {}