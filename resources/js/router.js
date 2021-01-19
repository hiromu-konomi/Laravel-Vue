import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./components/Home.vue";
import Form from "./components/Form.vue";
import List from "./components/List.vue";
import Report from "./components/Report.vue";
import Calendar from "./components/Calendar.vue";

Vue.use(VueRouter);

// import login from "./components/LoginComponent.vue";
// import about from "./components/about.vue";

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
//         {
//             path: "/login",
//             name: "login",
//             component: login,
//             meta: { guestOnly: true }
//         },
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