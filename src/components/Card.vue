<template>
  <div
    class="card"
    :class="{
      'card--trump': trump,
      'card--back': isBack,
    }"
  >
    <CardLabel v-if="!isBack" :suit="suit" :label="label" position="top" />

    <JokerLogo
      class="card__logo"
      :class="{
        'card__logo--back': isBack,
        [`card__logo--${cardColor}`]: !isBack,
      }"
    />

    <CardLabel v-if="!isBack" :suit="suit" :label="label" position="bottom" />
  </div>
</template>

<script setup lang="ts">
import CardLabel from "./CardLabel.vue";
import JokerLogo from "@/assets/svg/joker-logo.svg";
import { computed, type PropType } from "vue";
import { CardSuit } from "./types";
const CARD_COLOR_RED = ["diamonds", "hearts"];

const props = defineProps({
  id: String,
  suit: String as PropType<CardSuit>,
  label: String,
  trump: Boolean,
  isBack: {
    type: Boolean,
    default: false,
  },
});

const cardColor = computed(() => {
  if (CARD_COLOR_RED.includes(props.suit)) {
    return "red";
  }

  return "black";
});
</script>

<style scoped lang="scss">
.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 12rem;
  height: 17rem;
  padding: 0 0.8rem;
  background-color: #d9d9d9;
  border: 1px solid red;
  border-radius: 1rem;
  margin: 0 1px;
  position: relative;

  &--back {
    background: linear-gradient(
      90deg,
      rgba(2, 0, 36, 1) 0%,
      rgba(250, 55, 85, 1) 40%,
      rgba(0, 212, 255, 1) 100%
    );

    .card-label {
      display: none;
    }
  }

  &__logo {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 5rem;
    color: $primary;

    &--back {
      width: 7rem;
      color: $background-color;
    }

    &--red {
      color: $primary;
    }

    &--black {
      color: $background-color;
    }
  }

  &--trump,
  &--deck {
    position: absolute;
  }

  &--trump {
    transform: rotate(90deg);
    left: 3rem;
  }

  &--deck {
    z-index: 1;
    box-shadow: 0.33rem 0.33rem midnightblue;
  }

  &--active {
    z-index: 1;
    margin-left: -5rem;
  }

  &--animation {
    transform-origin: center center;
    transition: transform 0.3s ease-in-out;
    position: absolute;
    z-index: 1000;
    will-change: transform;
  }
}
</style>
