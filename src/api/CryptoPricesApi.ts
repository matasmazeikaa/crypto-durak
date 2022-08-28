import axios from "axios";

export const getCryptoPrice = (crypto: string, fiatCurrency: string) =>
  axios.get(import.meta.env.VITE_CRYPTO_PRICE_API, {
    params: { fsym: crypto, tsyms: fiatCurrency },
  });
