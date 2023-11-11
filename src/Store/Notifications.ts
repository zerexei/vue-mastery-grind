import { defineStore, acceptHMRUpdate } from 'pinia'
import { reactive, computed } from 'vue'

type State = {
  message: string,
}
export const useNotificationsStore = defineStore('notifications', () => {
  // ++> State
  const state = reactive<State>({
    message: ""
  });

  const resetState = () => {
    state.message = '';
  }


  // ++> Actions
  const message = computed(() => state.message)
  const setMessage = (message: string) => {
    state.message = message;
  }

  return {
    state,
    resetState,

    message,
    setMessage,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useNotificationsStore, import.meta.hot))
}
