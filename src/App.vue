<template>
  <div class="main">
    <Header class="main__header" />
    <GameRoom v-if="roomStore.isInRoom && !isCreatingRoom" />
    <CreateRoom
      v-if="isCreatingRoom"
      @create-room="setIsCreatingRoom(false)"
      @leave-room="setIsCreatingRoom(false)"
    />
    <Lobby
      v-if="!isCreatingRoom && !roomStore.isInRoom"
      @create-room="setIsCreatingRoom(true)"
    />
  </div>
</template>

<script setup lang="ts">
import Lobby from "@/components/Lobby.vue";
import GameRoom from "@/components/GameRoom.vue";
import { useRoomStore } from "./stores/room";
import { useUserStore } from "./stores/user";
import Header from "@/components/Header.vue";
import { ref } from "vue";
import CreateRoom from "./components/CreateRoom.vue";

const roomStore = useRoomStore();
const userStore = useUserStore();

const isCreatingRoom = ref(false);

const setIsCreatingRoom = (value: boolean) => {
  isCreatingRoom.value = value;
};

// Create random user
const words = [
  "Rock1",
  "Paper1",
  "Scissors1",
  "Rock2",
  "Paper2",
  "Scissors2",
  "Rock3",
  "Paper3",
  "Scissors3",
];
const word = words[Math.floor(Math.random() * words.length)];

userStore.createUser(word);
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 2rem;
  height: 100vh;

  &__header {
    margin-bottom: 8rem;
  }
}
</style>
