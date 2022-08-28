<template>
  <div :class="['card-label', [`card-label--${position}`]]">
    <div class="card-label__rank">{{ label }}</div>
    <Component :is="name" />
    <!-- <Hearts /> -->
  </div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, type PropType } from "vue";
const Hearts = defineAsyncComponent(() => import("@/assets/svg/hearts.svg"));
const Diamonds = defineAsyncComponent(
  () => import("@/assets/svg/diamonds.svg")
);
const Clubs = defineAsyncComponent(() => import("@/assets/svg/clubs.svg"));
const Spades = defineAsyncComponent(() => import("@/assets/svg/spades.svg"));

const CARD_SUIT_COMPONENT_MAP = {
  hearts: () => Hearts,
  diamonds: () => Diamonds,
  clubs: () => Clubs,
  spades: () => Spades,
};

type CardSuitComponentInterface = "hearts" | "diamonds" | "clubs" | "spades";

const props = defineProps({
  suit: {
    type: String as PropType<CardSuitComponentInterface>,
    required: true,
  },
  position: String,
  label: String,
});

const name = computed(() => {
  switch (props.suit) {
    case "hearts":
      return Hearts;
    case "clubs":
      return Clubs;
    case "diamonds":
      return Diamonds;
    case "spades":
      return Spades;
    default:
      return Hearts;
  }
});
</script>

<style lang="scss" scoped>
.card-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1.6rem;
  color: black;

  .card-label__rank {
    font-weight: 800;
    font-size: 2.4rem;
  }

  .card-label__suit {
    font-size: 1.6rem;

    &--diamonds {
      color: var(--diamonds-color);

      &::after {
        content: "♦️";
      }
    }

    &--hearts {
      color: var(--diamonds-color);

      &::after {
        content: "♥️";
      }
    }

    &--clubs {
      &::after {
        content: "♣️";
      }
    }

    &--spades {
      &::after {
        content: "♠️";
      }
    }
  }

  .card-label__suit {
    font-size: 1.6rem;
  }

  &--bottom {
    transform: rotateZ(180deg);
    align-self: flex-end;
  }
}
</style>
