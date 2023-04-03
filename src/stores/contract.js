import { defineStore } from "pinia";
import { api } from "../boot/axios";
import { useUserStore } from "./user";

const userStore = useUserStore();
export const useContractStore = defineStore("contract", {
  state: () => ({
    lendingItems: [],
    borrowingItems: [],
    requests: [],
  }),
  getters: {},
  actions: {
    async fetchLendingItems() {
      const { data } = await api.get(
        `/api/contracts/lender/${userStore.user._id}`
      );
      this.lendingItems = data;
    },
    async fetchBorrowingItems() {
      const { data } = await api.get(
        `/api/contracts/borrower/${userStore.user._id}`
      );
      this.borrowingItems = data;
    },
  },
});
