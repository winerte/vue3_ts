import request from '@/utils/request'
import type { MenuListData } from './type'
enum API {
  allper=   "admin/acl/permission",
  roleper ="admin/acl/permission/toAssign",
}

export const getAllPermission = () => request.get<any,MenuListData>(API.allper)
export const roleToAssign =(roleId:number) => request.get<any,MenuListData>(API.roleper+`/${roleId}`)