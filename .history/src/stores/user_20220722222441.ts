import { defineStore } from 'pinia'

export const useCounterStore = defineStore({
  id: 'user',
  state: () => ({
    name: ''
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    setUsername(username: string) {
      this.name = username
    }
  }
})
