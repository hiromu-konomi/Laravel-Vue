import Vue from "vue";
import VueRouter from "vue-router";
// メイン
import Main from "./components/Main.vue";
import Form from "./components/main/Form.vue";
import List from "./components/main/List.vue";
import Report from "./components/main/Report.vue";
import Calendar from "./components/main/Calendar.vue";
// 認証系
import Auth from "./components/Auth.vue";
import Register from "./components/auth/Register.vue";
import Login from "./components/auth/Login.vue";

Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: "/",
            component: Main,
            children: [
                {
                    path: "/",
                    name: "Form",
                    component: Form,
                    meta: { authOnly: true }
                },
                {
                    path: "/list",
                    name: "List",
                    component: List,
                    meta: { authOnly: true }
                },
                {
                    path: "/report",
                    name: "Report",
                    component: Report,
                    meta: { authOnly: true }
                },
                {
                    path: "/calendar",
                    name: "Calendar",
                    component: Calendar,
                    meta: { authOnly: true }
                },
            ]
        },
        {
            path: "/",
            component: Auth,
            children: [
                {
                    path: "/register",
                    name: "Register",
                    component: Register,
                    meta: { guestOnly: true }
                },
                {
                    path: "/login",
                    name: "Login",
                    component: Login,
                    meta: { guestOnly: true }
                },
            ]
        }
    ]
});

function isLoggedIn() {
    return localStorage.getItem("auth");
}

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.authOnly)) {
        if (!isLoggedIn()) {
            next("/login");
        } else {
            next();
        }
    } else if (to.matched.some(record => record.meta.guestOnly)) {
        if (isLoggedIn()) {
            next("/");
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;