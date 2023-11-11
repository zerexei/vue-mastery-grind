import { defineStore, acceptHMRUpdate, } from 'pinia'
import { reactive, computed } from 'vue'

import { useLocalStorage } from '@vueuse/core'
import { useRouter } from 'vue-router'

export interface User {
    id: number,
    name: string,
    email: string,
    role: string,

    password?: string,
}

type State = {
    user: User
}

export const useAuthenticationStore = defineStore('Authentication', () => {
    const router = useRouter();

    // ++> State
    const state  = reactive({
        user: useLocalStorage('auth', {} as User)
    });

    const resetState = () => {
        state.user = {} as User;
    }

    // ++> Actions
    const user = computed(() => {
        return state.user;
    });

    const isAuthenticated = computed(() => {
        return !!state.user.id;
    });

    const authenticate = async (email: string, password: string) => {
        const res: User = await new Promise((resolve) => {
            const user: User = {
                id: 1,
                name: "Test User",
                // email: "admin@mail.com",
                email,
                password,
                // password: "password",
                role: "Admin",
            };
            resolve(user)
        });

        state.user = res;

    }

    const logout = () => {
        state.user = {} as User;
        router.push('/login');
    }

    return {
        user,
        resetState,
        isAuthenticated,
        authenticate,
        logout,
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAuthenticationStore, import.meta.hot))
}



// custom type

// declare module 'pinia' {
//     interface PiniaCustomProperties {
//         router: Router
//     }
// }