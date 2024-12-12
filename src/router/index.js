import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignUp from "../views/SignUp.vue";
import LogIn from "../views/LogIn.vue";
import auth from "../auth";
import AddPostPage from "@/views/AddPostPage.vue";import EditPostView from '@/views/EditPostView.vue';





const routes = [{
        path: "/",
        name: "home",
        component: HomeView,
        beforeEnter: async(to, from, next) => {
            let authResult = await auth.authenticated();
            if (!authResult) {
                next('/login')
            } else {
                next();
            }
        }
    },
    {
        path: '/edit/:id',
        name: 'EditPost',
        component: EditPostView,
        beforeEnter: async(to, from, next) => {
            let authResult = await auth.authenticated();
            if (!authResult) {
                next('/login')
            } else {
                next();
            }
        }
    },
    {
        path: "/signup",
        name: "SignUp",
        component: SignUp,
    },
    {
        path: "/login",
        name: "LogIn",
        component: LogIn,
    },
    {
        path: "/contacts",
        name: "contacts",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "contacts" */ "../views/ContactsView.vue"),
    },
    {
        path: "/add-post",
        name: "AddPostPage",
        component: AddPostPage,
        beforeEnter: async (to, from, next) => {
            let authResult = await auth.authenticated(); // Reuse the same `auth.authenticated` function
            if (!authResult) {
                next("/login"); // Redirect unauthenticated users to login
            } else {
                next(); // Allow access if authenticated
            }
        },
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;