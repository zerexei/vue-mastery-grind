import { defineStore, acceptHMRUpdate } from 'pinia'
import { reactive, computed } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import { useNotificationsStore } from '@/Store/Notifications'

type State = {
  counter: number,
}
export const useStore = defineStore('index', () => {
  const storeNotifications = useNotificationsStore();

  // ++> State
  const state = reactive<State>({
    // @ts-expect-error: ref
    counter: useLocalStorage('counter', 0)
  });

  const resetState = () => {
    state.counter = 0;
  }

  const counter = computed(() => {
    return state.counter;
  })

  const incrementCounter = () => {
    state.counter++;
    storeNotifications.setMessage("Counter is incremented");
  }

  // ++> Actions

  return {
    state,
    resetState,
    counter,
    incrementCounter
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot))
}
