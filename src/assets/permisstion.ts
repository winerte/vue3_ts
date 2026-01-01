import router from '@/router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import useUserStore from '@/store/modules/user'
import pinia from '@/store'
import { el } from 'element-plus/es/locales.mjs'


let userStore = useUserStore(pinia)
//前置守卫
router.beforeEach(async(to:any, from:any, next:any) => {
  document.title ='XX后台管理系统-'+ to.meta.title
  nprogress.configure({ showSpinner: false });
  nprogress.start()
  let token = userStore.token;
  if(token){
    //登录过的逻辑  
    if(to.path == '/login'){
      next({path:'/'})
    }else{
      //拿用户信息
      try{
        await userStore.userInfo();
        next()
      }catch(err){
        //token失效
        await userStore.LogOut()
        next({path:'/login',query:{redirect:to.path}})
      }
      
    }
  }else{
    //未登录的逻辑
    if(to.path == '/login'){
      next()
    }else{
      next({path:'/login',query:{redirect:to.path}})
    }
  }

})

router.afterEach(() => {
    nprogress.done()
   
})