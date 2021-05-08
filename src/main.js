import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "semantic-ui-css/semantic.min.css";
import store from './store';


createApp(App).use(router).use(store).mount("#app");

//钩子函数，访问路由前调用
router.beforeEach((to, from, next) => {
    //路由需要认证
    if (to.meta.requireAuth) {
        //判断store里是否有token
        if (store.state.token) {
            next();
        } else {
            next({
                path: '/admin/login',
                query: { redirect: to.fullPath }
            })
        }
    } else {
        next();
    }
})