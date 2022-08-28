<template>
  <button class="room">
    <h4 class="room__title">Room: {{ name }}</h4>
    <h4 class="room__text">{{ players.length }} / 2</h4>
  </button>
</template>

<script lang="ts" setup>
defineProps({
  name: String,
  players: {
    type: Array,
    default: () => [],
  },
});
</script>

<style lang="scss" scoped>
.room {
  display: flex;
  padding: 2.4rem;
  background-color: $secondary-background;
  min-width: 51rem;
  justify-content: space-between;
  border-radius: 1rem;
  transition: opacity 0.25s ease-in-out;
  cursor: pointer;
  border: 1px solid #fff;

  &__title {
    font-size: 2.4rem;
    font-weight: bold;
  }

  &__text {
    font-size: 1.6rem;
  }

  &:hover {
    opacity: 0.75;
  }
}
</style>
