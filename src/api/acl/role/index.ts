import request from "@/utils/request";
import { RolePageList } from "./type";

enum API {
   GETPAGEROLE = "admin/acl/role",
   
}

export const getPageRole =(pageNo:number,pageSize:number,roleName:string|null) =>
     request.get<any,RolePageList>(API.GETPAGEROLE+`/${pageNo}/${pageSize}?roleName=${roleName}`);