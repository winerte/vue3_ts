import request from "@/utils/request";
import type { ProductPageLst,puSaleAttrList } from "./type";
enum API  {
    GETPRODUCTLIST = '/admin/product',
    GETBaseSaleAttrList = '/admin/product/baseSaleAttrList',
    GETImageList = '/admin/product/spuImageList',
    GETSpuSaleAttrList = '/admin/product/spuSaleAttrList',
}

export const productList = (pageNo:number,pageSize:number,c3Id:number) => 
    request.get<any,ProductPageLst>(API.GETPRODUCTLIST+`/${pageNo}/${pageSize}?category3Id=${c3Id}`);

export const baseSaleAttrList = () => request.get<any,any>(API.GETBaseSaleAttrList);

export const imageList = (spuId:number) => request.get<any,any>(API.GETImageList+`/${spuId}`);

export const spuSaleAttrList = (spuId:number) => request.get<any,puSaleAttrList>(API.GETSpuSaleAttrList+`/${spuId}`);


