<template>
  <div class="header-logo">
    <JokerLogo class="header-logo__logo" />
    <h1 class="header-logo__title">DURAK</h1>
  </div>
</template>

<script setup lang="ts">
import JokerLogo from "@/assets/svg/joker-logo.svg";
</script>

<style lang="scss" scoped>
// @import "@/scss/variables.scss";

.header-logo {
  display: flex;
  align-items: center;

  &__logo {
    width: 4rem;
    color: $primary;
    margin-right: 0.8rem;
  }

  &__title {
    color: $primary;
    font-size: 2.4rem;
    font-weight: bold;
    text-shadow: 0px 0px 12px #fa3755;
  }
}
</style>
