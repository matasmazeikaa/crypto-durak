<template>
  <div class="create-room">
    <h2 class="create-room__title">Enter gamble amount</h2>
    <div class="create-room__input-container">
      <h2 class="create-room__crypto">ETH</h2>
      <span class="create-room__crypto-price">${{ inputedCryptoPrice }}</span>
      <div class="create-room__input-wrapp">
        <input
          class="create-room__input"
          v-model="cryptoInput"
          placeholder="0.00"
          type="number"
        />
        <p class="create-room__balance">Balance: 0</p>
        <p class="create-room__input-error" v-if="inputError">
          {{ inputError }}
        </p>
      </div>
    </div>
    <div>
      <Button
        class="create-room__create-button"
        title="Confirm"
        @click="handleCreateRoom"
      />
      <Button title="Back to lobby" @click="$emit('leave-room')" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSocket } from "@/hooks/useSocket";
import { getCryptoPrice } from "@/api/CryptoPricesApi.ts";
import Button from "./Button.vue";
import { computed, onBeforeMount, ref, watch } from "vue";

const { createRoom } = useSocket();
const emit = defineEmits(["create-room"]);

const ethPrice = ref(0);
const cryptoInput = ref<number | string>("");
const inputError = ref("");

const setEthPrice = async () => {
  const price = await getCryptoPrice("ETH", "USD");

  ethPrice.value = price.data.USD;
};

const handleCreateRoom = () => {
  inputError.value = "";

  if (cryptoInput.value === 0 || cryptoInput.value === "") {
    inputError.value = "Please enter valid crypto sum";

    return;
  }

  emit("create-room");
  createRoom(Number(cryptoInput.value));
};

const inputedCryptoPrice = computed(() => {
  if (cryptoInput.value === 0 || cryptoInput.value === "") {
    return ethPrice.value;
  }

  return (ethPrice.value * Number(cryptoInput.value)).toFixed(2);
});

watch(cryptoInput, () => {
  inputError.value = "";
});

onBeforeMount(() => {
  setEthPrice();
});
</script>

<style lang="scss" scoped>
.create-room {
  min-width: 40rem;

  &__crypto {
    display: inline-block;
  }

  &__crypto-price {
    margin-left: 0.8rem;
    color: $grey;
  }

  &__input-container {
    background-color: rgb(22 21 34 / 1);
    padding: 2.4rem;
    border-radius: 14px;
    border: 1px solid rgb(46 51 72/ 1);
    margin-bottom: 1.6rem;
  }

  &__input-wrapper {
    display: flex;
    justify-content: space-between;
  }

  &__balance {
    align-self: end;
  }

  &__input {
    line-height: 36px;
    font-weight: bold;
    outline: 2px solid transparent;
    outline-offset: 2px;
    background-color: initial;
    font-size: 24px;
    border: none;
  }

  &__input-error {
    color: #ff4444;
  }

  &__title {
    font-size: 2.4rem;
    margin-bottom: 0.4rem;
  }

  &__create-button {
    margin-right: 0.8rem;
  }

  &__back-button {
    background-color: transparent;
    color: $text-color;
  }
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
