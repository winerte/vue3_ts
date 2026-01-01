import request from "@/utils/request";
import type {loginFrom,logingResp,userInfoResp } from "./type";

enum API {
  LOGIN = "/admin/acl/index/login",
  GETUSERINFO = "/admin/acl/index/info",
  LOGOUT = "/admin/acl/index/logout",
}

export const reqLogin = (data: loginFrom) => request.post<any,logingResp>(API.LOGIN, data);
export const reqGetUserInfo = () => request.get<any,userInfoResp>(API.GETUSERINFO);

export const reqLogout = () => request.post<any,any>(API.LOGOUT);