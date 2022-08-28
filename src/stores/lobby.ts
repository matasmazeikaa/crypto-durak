import { defineStore } from "pinia";
import { useSocket } from "@/hooks/useSocket";

export const useLobbyStore = defineStore({
  id: "lobby",
  state: () => ({
    rooms: {},
  }),

  actions: {
    addRoom(room) {
      console.log(room);
      this.rooms = {
        ...this.rooms,
        [room.id]: room,
      };
    },
    setRooms(rooms) {
      console.log(rooms);
      this.rooms = rooms;
    },
    joinRoom(roomId: string) {
      const { joinRoom } = useSocket();

      joinRoom(roomId);
    },
  },
});
