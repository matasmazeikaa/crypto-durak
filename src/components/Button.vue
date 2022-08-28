<template>
  <button class="button">
    {{ title }}
  </button>
</template>

<script setup lang="ts">
defineProps({
  title: String,
});
</script>

<style lang="scss" scoped>
.button {
  background-color: #e0e0e0;
  padding: 2rem;
  color: $primary;
  border-radius: 1rem;
  font-size: 1.6rem;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.25s ease-in-out;

  &:hover {
    opacity: 0.8;
  }
}
</style>
