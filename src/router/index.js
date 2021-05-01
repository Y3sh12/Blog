import { createRouter, createWebHistory } from "vue-router";

const routes = [{
    path: "/",
    name: "Home",
    component: () =>
        import ("../views/Home.vue"),
}, {
    path: "/type/:typeId",
    name: "Type",
    component: () =>
        import ("../views/Type.vue"),
}, {
    path: "/tag/:tagId",
    name: "Tag",
    component: () =>
        import ("../views/Tag.vue"),
}, {
    path: "/archives",
    name: "Archives",
    component: () =>
        import ("../views/Archives.vue"),
}, {
    path: "/message",
    name: "Message",
    component: () =>
        import ("../views/Message.vue"),
}, {
    path: "/about",
    name: "About",
    component: () =>
        import ("../views/About.vue"),
}, {
    path: "/blog/:id",
    name: "Blog",
    component: () =>
        import ("../views/Blog.vue"),
}, {
    path: "/admin",
    name: "Default",
    component: () =>
        import ("../views/admin/Default.vue"),
    children: [{
            path: "blog",
            name: "Blog",
            component: () =>
                import ("../views/admin/Blog.vue"),
        },
        {
            path: "type",
            name: "Type",
            component: () =>
                import ("../views/admin/Type.vue"),
            children: [{
                path: "search",
                name: "TypeSearch",
                component: () =>
                    import ("../views/admin/Type.vue")
            }, ]
        },

        {
            path: "tag",
            name: "Tag",
            component: () =>
                import ("../views/admin/Tag.vue"),
            children: [{
                path: "search",
                name: "TagSearch",
                component: () =>
                    import ("../views/admin/Tag.vue")
            }, ]
        },

        {
            path: "publish",
            name: "Publish",
            component: () =>
                import ("../views/admin/Publish.vue")
        },
    ]
}, {
    path: "/admin/login",
    name: "Login",
    component: () =>
        import ("../views/admin/Login.vue")
}, {
    path: "/admin/find",
    name: "GetPassword",
    component: () =>
        import ("../views/admin/GetPassword.vue")
}, {
    path: "/admin/test",
    name: "Test",
    component: () =>
        import ("../test/test.vue")
}];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;