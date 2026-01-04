import request from "@/utils/request";
import type { userListData } from "./type";

enum API {
   PAGEUSER = "admin/acl/user",
   ADDUSER="admin/acl/user/save"

}

//11/11?username=11

export const getPageUser =(pageNo:number,pageSize:number,username:string) => 
  request.get<any,userListData>(API.PAGEUSER+`/${pageNo}/${pageSize}?username=${username}`)
export const addUserAPI =(data:any) => request.post<any,any>(API.ADDUSER,data)