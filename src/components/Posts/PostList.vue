<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue';

import { RouterLink } from 'vue-router';

// const events = ref([]);

// const EventService = {
//   getEvents() {
//     return new Promise<{ data: [] }>((resolve) => resolve({ data: [] }));
//   },
// };

// onMounted(() => {
//   watchEffect(async () => {
//     events.value = [];

//     const res = await EventService.getEvents();

//     events.value = res.data;
//   });
// });
</script>

<template>
  <h2 class="">Posts</h2>

  <div classs="space-y-6">
    <router-link to="/posts/1">Post 1</router-link>
    <router-link to="/posts/2">Post 2</router-link>
    <router-link to="/posts/3">Post 3</router-link>
  </div>
</template>
