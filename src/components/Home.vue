<script setup lang="ts">
import { useStore } from '@/Store';

// import static assets
import Logo from '@/assets/vue.svg';

console.log(Logo);

const store = useStore();
</script>

<template>
  <div>
    <h1>Hello World</h1>
    <h2>Counter {{ store.counter }}</h2>
    <p
      v-for="x in [{ color: 'red' }]"
      class="default-css"
      :class="[
        true && 'text-center',
        { green: 'bg-[green]', red: 'bg-[red]' }[x.color],
        true ? ['text-blue class2'] : ['text-red-400'],
      ]"
    >
      Lorem
    </p>
    <img :src="Logo" alt="vue logo" />
    <img src="/vite.svg" alt="vue logo" />
    <button @click="store.incrementCounter">Increment</button>
  </div>
</template>
