import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
        redirect: "/hom",
        component: () =>
            import ("../layout/hom_layout.vue"),
        path: "/",
        children: [{
            path: '/hom',
            name: 'hom',
            meta: {
                title: '系统首页',
            },
            component: () =>
                import ("../viewes/hom")
        }, {
            path: '/product',
            name: 'product',
            meta: {
                title: '商品管理',
            },
            component: () =>
                import ("../viewes/product_list"),
            children: [{
                path: 'product_list',
                name: 'product_list',
                meta: {
                    title: '商品列表',
                },
                component: () =>
                    import ("../viewes/product_list/index"),
            }]
        }]
    }]
})