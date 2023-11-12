<script setup lang="ts">
import { computed } from 'vue';
import { RouterView, RouterLink } from 'vue-router';

import { useAuthenticationStore } from '@/Store/Authentication';

const storeAuth = useAuthenticationStore();
//  v-if="storeAuth.isAuthenticated()"
const links = computed(() => [
  {
    id: 1,
    isShow: true,
    title: 'Home',
    url: { name: 'home' },
  },
  {
    id: 2,
    isShow: storeAuth.isAuthenticated,
    title: 'Todo App',
    url: { name: 'todo.app' },
  },
  {
    id: 4,
    isShow: !storeAuth.isAuthenticated,
    title: 'Login',
    url: { name: 'login' },
  },
]);
</script>

<template>
  <div class="py-12 px-4 flex flex-col flex-1 h-full bg-gray-900">
    <div>
      <header class="mb-6">
        <nav class="flex justify-end gap-4">
          <template v-for="link in links" :key="link.id">
            <router-link v-if="link.isShow" :to="link.url">
              {{ link.title }}
            </router-link>
          </template>
          <p
            v-if="storeAuth.isAuthenticated"
            @click="storeAuth.logout()"
            class="hover:text-red-400 cursor-pointer"
          >
            Logout
          </p>
        </nav>
      </header>

      <div>
        <router-view v-slot="{ Component }">
          <transition name="slide-fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<style>
* {
  font-family: 'Inter', sans-serif;
  color: white;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: 100%;
}

.bug {
  border: 1px solid red;
}

h1 {
  font-size: 1.75rem;
  font-weight: 700;
}

h2 {
  font-size: 1.5rem;
  font-weight: 600;
}

a:hover {
  color: rgba(31, 178, 170);
}

input {
  padding: 0.5rem 1.5rem;
  border-radius: 5px;
  color: black;
}

button {
  background-color: rgba(31, 178, 170);
  padding: 0.5rem 1.5rem;
  border-radius: 5px;
}

button:hover {
  background-color: rgba(31, 178, 170, 0.8);
}
</style>
