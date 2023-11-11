import { createRouter, createWebHistory } from "vue-router";

import { useAuthenticationStore } from "@/Store/Authentication";

import Home from '@/components/Home.vue'
import TodoApp from '@/components/TodoApp.vue';
import Login from '@/components/Login.vue';

const routes = [
    {
        path: '/', component: Home, name: "home", meta: {
            requiresAuth: false
        }
    },
    {
        path: '/login', component: Login, name: "login", meta: {
            requiresAuth: false
        }
    },
    {
        path: '/logout', component: TodoApp, name: "logout", meta: {
            requiresAuth: true
        }
    },
    {
        path: '/todo-app', component: TodoApp, name: "todo.app", meta: {
            requiresAuth: true
        }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    const storeAuth = useAuthenticationStore();

    if (!to.meta.requiresAuth) {
        return next();
    }

    if (storeAuth.isAuthenticated) {
        return next();
    }

    return next('/login');
});

export default router;