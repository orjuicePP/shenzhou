import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'loginTest',
		component: () => import('views/loginTest/LoginTest.vue'),
	},
	{
		path: '/loginTest',
		redirect: '/',
	},
	{
		path: '/register',
		name: 'register',
		component: () => import('views/loginTest/Register.vue'),
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
		path: '/article',
		name: 'article',
		component: () => import('views/article/Article.vue'),
	},
	{
		path: '/administrator',
		name: 'administrator',
		component: () => import('views/administrator/Administrator.vue'),
	},
	{
		path: '/shop',
		name: 'shop',
		component: () => import('views/shop/Shop.vue'),
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
