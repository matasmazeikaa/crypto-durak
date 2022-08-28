<template>
  <div class="header">
    <HeaderLogo />
    <Button
      v-if="!isLoggedIn"
      title="Connect wallet"
      @click="connectToWallet"
    />
    <Button v-else :title="`Wallet: ${truncatedWallet}`" />
  </div>
</template>

<script setup lang="ts">
import HeaderLogo from "@/components/HeaderLogo.vue";
import Button from "./Button.vue";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider/dist/umd/index.min.js";
import { ethers } from "ethers";
import { computed, ref } from "vue";

const account = ref("");

const isLoggedIn = computed(() => window.ethereum.selectedWallet);

const truncatedWallet = computed(() => {
  if (!window.ethereum.selectedAddress) {
    return null;
  }

  console.log(window.ethereum);

  const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;
  const address = window.ethereum.selectedAddress;

  const match = address.match(truncateRegex);
  if (!match) return address;
  return `${match[1]}…${match[2]}`;
});

const getWeb3Modal = async () => {
  const web3Modal = new Web3Modal({
    cacheProvider: false,
    providerOptions: {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: import.meta.env.VITE_INFURA_API_KEY,
        },
      },
    },
  });

  return web3Modal;
};

const connectToWallet = async () => {
  try {
    const web3Modal = await getWeb3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const accounts = await provider.listAccounts();

    account.value = accounts[0];
  } catch (err) {
    console.log("error:", err);
  }
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
</style>
