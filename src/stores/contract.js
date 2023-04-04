import { defineStore } from "pinia";
import { ContractStatusEnum } from "src/enums";
import { api } from "../boot/axios";
import { useUserStore } from "./user";

const userStore = useUserStore();
export const useContractStore = defineStore("contract", {
  state: () => ({
    lendingContracts: [],
    borrowingContracts: [],
    requests: [],
  }),
  getters: {
    requestedLendingContracts: (state) =>
      state.lendingContracts.filter(
        (contract) => contract.status === ContractStatusEnum.requested
      ),
    acceptedLendingContracts: (state) =>
      state.lendingContracts.filter(
        (contract) => contract.status === ContractStatusEnum.accepted
      ),
  },
  actions: {
    async fetchLendingItems() {
      const { data } = await api.get(
        `/api/contracts/lender/${userStore.user._id}`
      );
      this.lendingContracts = data;
    },
    async fetchBorrowingItems() {
      const { data } = await api.get(
        `/api/contracts/borrower/${userStore.user._id}`
      );
      this.borrowingContracts = data;
    },
    async updateContractStatus(id, status) {
      await api.put(`/api/contracts/${id}`, { status });
    },
    async postContracts(payload) {
      const { data } = await api.post(`/api/contracts`, payload);
    },
  },
});
