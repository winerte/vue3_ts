import request from "@/utils/request";
import type { Records,RequestDataInit } from "@/api/goods/kids/type";

enum API {
    baseTrademark = '/admin/product/baseTrademark',
    addTradeMark = '/admin/product/baseTrademark/save',
    updateTradeMark = '/admin/product/baseTrademark/update',
    deleteTradeMark = '/admin/product/baseTrademark/remove',
}

export const reqBaseTrademark = (page: number,limit:number) => request.get<any,RequestDataInit>(API.baseTrademark+`/${page}/${limit}`);
export const reqAdd = (data: any) => request.post<Records,RequestDataInit>(API.addTradeMark,data);
export const reqUpdate = (data: any) => request.post<Records,RequestDataInit>(API.updateTradeMark,data);
export const reqDelete = (id: number) => request.delete<any,RequestDataInit>(API.deleteTradeMark+`/${id}`);