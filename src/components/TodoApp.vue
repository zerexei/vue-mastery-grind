<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { watch } from 'vue';
import { useTodoStore } from '@/Store/Todo';

const storeTodo = useTodoStore();
const { search } = storeToRefs(storeTodo); // const search = ref("")

const createTodo = (e: any) => {
  // const message = e.target[0].value;
  const message = storeTodo.state.search;
  if (!message) return alert('Message is required');

  const id = storeTodo.getNextTodoId();
  storeTodo.storeTodo({
    id,
    message,
    isCompleted: false,
  });

  // e.target[0].value = '';
  storeTodo.state.search = '';
};

watch(
  // () => storeTodo.state.search,
  search,
  (newVal: string) => {
    // @search updated, add logic
    console.log(newVal);

    // storeTodo.$patch({});
  }
);
</script>

<template>
  <div class="space-y-6">
    <h1 class="ml-4">Todo App</h1>

    <div>
      <form @submit.prevent="createTodo">
        <div class="flex gap-2 p-4">
          <input v-model="search" type="text" class="w-full" />
          <button class="border hover:border-transparent w-[15rem]">
            Add Todo
          </button>
        </div>
      </form>
    </div>

    <ul>
      <li
        v-for="(todo, index) in storeTodo.getTodoList"
        :key="todo.id"
        class="flex p-4"
      >
        <p class="flex-1" :class="[todo.isCompleted && 'line-through']">
          ({{ index + 1 }}) {{ todo.message }}
        </p>
        <div class="flex gap-2">
          <button @click="storeTodo.toggleTodoCompleted(todo.id)">
            &#10004;
          </button>

          <button @click="storeTodo.deleteTodoById(todo.id)">&#10060;</button>
        </div>
      </li>
    </ul>
  </div>
</template>
