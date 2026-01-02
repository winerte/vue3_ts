export interface BaseRespons<T> {
    code:    number;
    message: string;
    data:    T;
    ok:      boolean;
}

export interface  ProductPage {
    records:     Record[];
    total:       number;
    size:        number;
    current:     number;
    searchCount: boolean;
    pages:       number;
}

export interface Record {
    id:              number;
    spuName:         string;
    description:     string;
    category3Id:     number;
    tmId:            number;
    spuImageList?:    null;
    spuSaleAttrList?: null;
}

export interface ImgData {
    id?:      number;
    imgName: string;
    imgUrl:  string;
    spuId:   number;
}

export interface BaseAttr {
    id:      number;
    name: string;

}
export interface puSaleAttr {
    id:                   number;
    baseSaleAttrId:       number;
    saleAttrName:         string;
    spuId:                number;
    spuSaleAttrValueList: SpuSaleAttrValue[];
}

export interface SpuSaleAttrValue {
    id:                number;
    saleAttrValueName: string;
    baseSaleAttrId:    number;
    spuId:             number;
}

export interface ProductPageLst extends BaseRespons<ProductPage>{}