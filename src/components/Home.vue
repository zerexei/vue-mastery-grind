<script setup lang="ts">
import { useStore } from '@/Store';

// import static assets
import Logo from '@/assets/vue.svg';

console.log(Logo);

const store = useStore();
</script>

<template>
  <h1>Hello World</h1>
  <h2>Counter {{ store.counter }}</h2>

  <img :src="Logo" alt="vue logo" />
  <img src="/vite.svg" alt="vue logo" />
  <button @click="store.incrementCounter">Increment</button>
</template>
