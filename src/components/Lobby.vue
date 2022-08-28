<template>
  <div class="lobby">
    <div class="rooms">
      <p class="rooms__title">Rooms:</p>
      <RoomButton
        v-for="(room, roomId) in joinableRooms"
        class="room"
        :key="roomId"
        :name="room.name"
        :players="room.gameState.players"
        @click="lobbyStore.joinRoom(roomId)"
      />
    </div>
    <Button
      v-if="!isCreatingRoom"
      @click="$emit('create-room')"
      title="Create room"
    />
  </div>
</template>

<script setup lang="ts">
import { useLobbyStore } from "@/stores/lobby";
import RoomButton from "./RoomButton.vue";
import Button from "./Button.vue";
import { computed } from "vue";

const lobbyStore = useLobbyStore();

const joinableRooms = computed(() =>
  Object.values(lobbyStore.rooms).reduce((acc: any, curr: any) => {
    console.log(curr);
    if (curr.gameState.players.length > 1) {
      return acc;
    }

    return {
      [curr.id]: curr,
      ...acc,
    };
  }, {})
);

console.log(joinableRooms);
</script>

<style lang="scss" scoped>
.room {
  margin-bottom: 1.6rem;
}

.lobby {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.rooms {
  background-color: $secondary-background;
  padding: 2.4rem 2.4rem 1rem 2.4rem;
  border-radius: 1rem;
  height: 100%;

  &__title {
    font-size: 3.2rem;
    margin-bottom: 1.6rem;
  }
}
</style>
