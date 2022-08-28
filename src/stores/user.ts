import { defineStore } from "pinia";
import { useSocket } from "@/hooks/useSocket";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    id: "",
    name: "",
  }),
  actions: {
    setUsername(username: string) {
      console.log(username);
      this.name = username;
    },
    setUserId(id: string) {
      console.log("setted it", id);
      this.id = id;
    },
    createUser(username: string) {
      const { createUser } = useSocket();

      createUser();
      this.name = username;
    },
  },
});
