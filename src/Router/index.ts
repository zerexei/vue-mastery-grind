import { createRouter, createWebHistory } from "vue-router";

import { useAuthenticationStore } from "@/Store/Authentication";

import Home from '@/components/Home.vue'
import TodoApp from '@/components/TodoApp.vue';
import Login from '@/components/Login.vue';
import NotFound from '@/components/ErrorPage/NotFound.vue';

import PostList from '@/components/Posts/PostList.vue';
import PostShow from '@/components/Posts/PostShow.vue';
import PostEdit from '@/components/Posts/PostEdit.vue';


const routes = [

    { path: '/404/:resource', component: NotFound, props: true },
    { path: '/', component: NotFound },




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
    // { path: '/posts/:post', component: PostShow, 'name': 'posts.show', props: (route) => ({ x: route.params.post }) }
    {
        path: '/posts', component: PostList, 'name': 'posts.index', alias: "/posts-all",
        children: [
            { path: '', component: PostShow, 'name': 'posts.show' },
            { path: '/edit', component: PostEdit, 'name': 'posts.edit' },
        ]
    },

    {
        // path: '/post/:afterPost(.*)',
        // redirect: (to) => { path: `/posts/${to.params.afterPost}`},
        path: '/post/:id',
        redirect: () => { return { name: 'posts.index' } },
        children: [
            {
                path: '/edit',
                redirect: () => { return { name: 'posts.edit' } }
            }
        ]
    }
]

// router.replace() // disable backward navigation
// router.go(1) // go forward navigation
// router.go(-1) // go backward navigation
// router.push()

const router = createRouter({
    history: createWebHistory(),
    routes,
    // https://router.vuejs.org/guide/advanced/scroll-behavior.html#Scroll-Behavior
    scrollBehavior(to, from, savedPosition) {
        // return desired position
        if (to, from, savedPosition) {
            return savedPosition;
        }

        return { top: 0 }
    }
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