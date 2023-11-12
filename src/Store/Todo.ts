import { acceptHMRUpdate, defineStore } from 'pinia';
import { ref, computed, reactive } from 'vue';
// import {useFooStore} from '@/Stores/Foo';

type Todo = {
  id: number,
  message: string,
  isCompleted: boolean,
}

export const useTodoStore = defineStore('todo', () => {
  // const foo = useFooStore() // nested store

  // ++> State
  const todoList = ref<Todo[]>([]);

  const state = reactive({
    search: ""
  });
  // const search = ref('');

  // pinia composition API manual $reset()
  const resetState = () => {
    todoList.value = [];
    // search.value = '';
  }

  // ++> Actions


  // index
  const getTodoList = computed(() => todoList.value)
  // create
  const storeTodo = (todo: Todo) => {
    todoList.value.unshift(todo);
  }
  // delete
  const deleteTodoById = (todoId: number) => {
    console.log(todoId, todoList.value);
    todoList.value = todoList.value.filter(todo => todo.id !== todoId);
  }

  // toggle todo completed
  const toggleTodoCompleted = (todoId: number) => {
    const todo = todoList.value.find(todo => todo.id === todoId);

    if (!todo) return;

    todo.isCompleted = !todo.isCompleted;
  }

  const getNextTodoId = () => {
    return Math.max(...todoList.value.map(todo => todo.id), 0) + 1;
  }

  const search = computed({
    get() {
      return state.search;
    },
    set(value) {
      state.search = value;
    }
  });

  return {
    // ++> State
    state,
    resetState,

    todoList,
    search,



    // ++> Actions
    getTodoList,
    storeTodo,
    deleteTodoById,
    toggleTodoCompleted,
    getNextTodoId,
  };

});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTodoStore, import.meta.hot))
}
