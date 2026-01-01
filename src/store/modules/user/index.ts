
import { defineStore } from "pinia"
import { reqLogin, reqGetUserInfo, reqLogout } from "@/api/user";
import type { loginFrom } from "@/api/user/type"
import routers from "@/router"
import { userInfo } from "os";

let useUserStore = defineStore("User", {
    state: () => {
        return {
            token: localStorage.getItem("token") || "",
            menuRoutes: routers.options.routes,
            userName: "",
            avatar: ""
        };
    },
    getters: {

    },
    actions: {
        async userLogin(data: loginFrom) {

            let result = await reqLogin(data)

            if (result.code === 200) {
               
                this.token = result.data
                localStorage.setItem("token", result.data)
            } else {
               
                return Promise.reject(new Error(result.data))
            }
        },
        async userInfo() {
            let result = await reqGetUserInfo()
            if (result.code === 200) {
               
                this.userName = result.data.name
                this.avatar = result.data.avatar
                return "ok"
            }else {
                return Promise.reject("获取用户信息失败")
            }
        },

        LogOut() {
            reqLogout()

            this.token = ""
            this.userName = ""
            this.avatar = ""
            localStorage.removeItem("token")


        }
    }
})

export default useUserStore
