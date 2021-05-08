import { createRouter, createWebHistory } from "vue-router";

const routes = [{
        path: "/",
        name: "Home",
        component: () =>
            import ("../views/Home.vue"),
    },
    {
        path: "/type/:typeId",
        name: "Type",
        component: () =>
            import ("../views/Type.vue"),
        meta: {
            active: "/type"
        }
    },
    {
        path: "/tag/:tagId",
        name: "Tag",
        component: () =>
            import ("../views/Tag.vue"),
        meta: {
            active: "/tag"
        }
    },
    {
        path: "/archives",
        name: "Archives",
        component: () =>
            import ("../views/Archives.vue"),
    },
    {
        path: "/message",
        name: "Message",
        component: () =>
            import ("../views/Message.vue"),
    },
    {
        path: "/about",
        name: "About",
        component: () =>
            import ("../views/About.vue"),
    },
    {
        path: "/blog/:id",
        name: "Blog",
        component: () =>
            import ("../views/Blog.vue"),
        props: true,
    },
    {
        path: "/admin",
        name: "Default",
        component: () =>
            import ("../views/admin/Default.vue"),
        children: [{
                path: "blog",
                component: () =>
                    import ("../views/admin/Blog.vue"),
                meta: {
                    requireAuth: true
                },
            },
            {
                path: "type",
                component: () =>
                    import ("../views/admin/Type.vue"),
                meta: {
                    requireAuth: true
                },
                children: [{
                    path: "search",
                    component: () =>
                        import ("../views/admin/Type.vue"),
                    meta: {
                        requireAuth: true
                    }
                }]
            },
            {
                path: "tag",
                component: () =>
                    import ("../views/admin/Tag.vue"),
                meta: {
                    requireAuth: true
                },
                children: [{
                    path: "search",
                    component: () =>
                        import ("../views/admin/Tag.vue"),
                    meta: {
                        requireAuth: true
                    }
                }, ]
            },
            {
                path: "publish",
                name: "Publish",
                component: () =>
                    import ("../views/admin/Publish.vue"),
                meta: {
                    requireAuth: true
                }
            },
        ]
    },
    {
        path: "/admin/login",
        name: "Login",
        component: () =>
            import ("../views/admin/Login.vue")
    },
    {
        path: "/admin/find",
        name: "GetPassword",
        component: () =>
            import ("../views/admin/GetPassword.vue")
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;