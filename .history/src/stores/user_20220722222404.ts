import { defineStore } from 'pinia'

export const useCounterStore = defineStore({
  id: 'user',
  state: () => ({
    name: 0
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    increment() {
      this.counter++
    }
  }
})
