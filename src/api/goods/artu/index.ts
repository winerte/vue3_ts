import request from "@/utils/request";
import type { CategoryListResponse ,AttrListResponse,AttrInfo } from "./type";
enum API {
    category1='admin/product/getCategory1',
    category2='admin/product/getCategory2',
    category3='admin/product/getCategory3',
    arrtList='admin/product/attrInfoList',
    delArrt ='admin/product/deleteAttr' ,
    addOrUpdate ='admin/product/saveAttrInfo' 
}

export const reqC1 =() =>request.get<any,CategoryListResponse>(API.category1);
export const reqC2 =(id:number) =>request.get<any,CategoryListResponse>(API.category2+`/${id}`);
export const reqC3 =(id:number) =>request.get<any,CategoryListResponse>(API.category3+`/${id}`);

export const reqAttrList =(category1Id:number,category2Id:number,category3Id:number) => 
    request.get<any,AttrListResponse>(API.arrtList+`/${category1Id}/${category2Id}/${category3Id}`);

export const reqDelete = (id: number) => request.delete<any,any>(API.delArrt+`/${id}`);

export  const reqAddOrUpdate = (data: AttrInfo) => request.post<AttrInfo,any>(API.addOrUpdate,data);