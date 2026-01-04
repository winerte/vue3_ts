//引入
import axios from "axios";
import { ElMessage } from "element-plus";
import useUserStore from "@/store/modules/user";
//利用axios的create方法创建一个axios实例
const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_API, // 请求的公共路径，使用相对路径通过Vite代理转发
  timeout: 5000, // 超时时间
});
//添加请求拦截器
request.interceptors.request.use(
  (config) => { 
    let userStore = useUserStore();
    if(userStore.token){
      config.headers.token = userStore.token
    }
   
    return config
  },
  (error) => {
    return Promise.reject(error);
  }
);

//添加响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    let message = "";
    //分不同的情况给不同的提示。使用case when 判断
    switch (error.response.status) {
      case 400:
        message = "请求错误";
        break;
      case 401:
        message ="未授权";
        break;
      case 403:
        message ="拒绝访问";
        break;
      case 404:
        message ="请求错误，未找到该资源";
        break;
      case 405:
        message ="请求方法未允许";
    }
   ElMessage({
    message,
    type: "error",
   })

    return Promise.reject(error);
  }
);

//暴露
export default request;