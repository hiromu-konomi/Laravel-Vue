import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./components/Home.vue";
import Form from "./components/Form.vue";
import List from "./components/List.vue";
import Report from "./components/Report.vue";
import Calendar from "./components/Calendar.vue";
import Register from "./components/Register.vue";
import Login from "./components/Login.vue";
// import about from "./components/about.vue";

Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    routes: [
                {
                    path: "/",
                    name: "Form",
                    component: Form,
                },
                {
                    path: "/list",
                    name: "List",
                    component: List,
                },
                {
                    path: "/report",
                    name: "Report",
                    component: Report,
                },
                {
                    path: "/calendar",
                    name: "Calendar",
                    component: Calendar,
                },
                {
                    path: "/register",
                    name: "Register",
                    component: Register,
                },
                {
                    path: "/login",
                    name: "login",
                    component: Login,
                    // meta: { guestOnly: true }
                },
//         {
//             path: "/about",
//             name: "about",
//             component: about,
//             meta: { authOnly: true }
//         }
    ]
});

// function isLoggedIn() {
//     return localStorage.getItem("auth");
// }

// router.beforeEach((to, from, next) => {
//     if (to.matched.some(record => record.meta.authOnly)) {
//         if (!isLoggedIn()) {
//             next("/login");
//         } else {
//             next();
//         }
//     } else if (to.matched.some(record => record.meta.guestOnly)) {
//         if (isLoggedIn()) {
//             next("/about");
//         } else {
//             next();
//         }
//     } else {
//         next();
//     }
// });

export default router;