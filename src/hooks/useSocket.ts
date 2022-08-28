import io from "socket.io-client";
import { useUserStore } from "@/stores/user";
import { useLobbyStore } from "@/stores/lobby";
import { useRoomStore } from "@/stores/room";

const socket = io("http://localhost:3000");

export const useSocket = () => {
  const userStore = useUserStore();
  const lobbyStore = useLobbyStore();
  const roomStore = useRoomStore();

  const createRoom = (cryptoAmount: number) => {
    socket.emit("createRoom", {
      username: userStore.name,
      userId: userStore.id,
      cryptoAmount,
    });
  };

  const leaveRoom = (roomId: string) => {
    socket.emit("leaveRoom", { roomId, userId: userStore.id });
  };

  const joinRoom = (roomId: string) => {
    socket.emit("joinRoom", {
      roomId,
      userName: userStore.name,
      userId: userStore.id,
    });
  };

  const readyRoom = (roomId: string) => {
    socket.emit("readyRoom", {
      roomId,
      userId: userStore.id,
    });
  };

  const createUser = () => {
    socket.emit("createUser");
  };

  const startGame = (roomId: string) => {
    socket.emit("startGame", roomId);
  };

  const gameCommand = (roomId, command, player, card) => {
    socket.emit("gameCommand", { roomId, player, card, command });
  };

  socket.on("connected", () => {
    console.log("connected");
  });

  socket.on("roomCreated", (room) => {
    console.log(room);
    lobbyStore.addRoom(room);
  });

  socket.on("joinedRoom", (room) => {
    roomStore.setRoom(room);
  });

  socket.on("userCreated", (userId) => {
    console.log(userId, "user id");
    userStore.setUserId(userId);
  });

  socket.on("updateRoomsState", (rooms) => {
    console.log(rooms);
    lobbyStore.setRooms(rooms);
  });

  socket.on("updateRoomState", (room) => {
    console.log(room, "updated room state");
    roomStore.setRoom(room);
  });

  return {
    socket,
    createRoom,
    leaveRoom,
    createUser,
    joinRoom,
    startGame,
    gameCommand,
    readyRoom,
  };
};
