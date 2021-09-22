import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [{
        path: '/',
        name: 'login',
        component: () => import('views/loginTest/LoginTest.vue'),
    },
    {
        path: '/login',
        redirect: '/',
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('views/register/Register.vue'),
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('views/home/Home.vue'),
    },
    {
        path: '/guide',
        name: 'guide',
        component: () => import('views/guide/Guide.vue'),
    },
    {
        path: '/articles',
        name: 'articles',
        component: () => import('views/articles/Articles.vue'),
    },
    {
        path: '/administrator',
        name: 'administratore',
        component: () => import('views/administrator/Administrator.vue'),
    },
];

const router = new VueRouter({
    mode: 'history',
    routes,
});

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
    // to将要访问的路径
    // from代表从哪个路径的跳转而来
    // next是一个函数，表示放行
    // next() 放行 next('/login')强制跳转

    // if (to.path === '/login') {
    //     return next();
    // }
    // // 获取token
    // const tokenStr = tool.getCookie('token');
    // // 强制跳转
    // if (!tokenStr) return next('/login');
    next();
});

export default router;
