import { defineStore } from "pinia";
import { api } from "../boot/axios";
import { useUserStore } from "./user";

const userStore = useUserStore();
export const useRequestedItemStore = defineStore("requested_item", {
  state: () => ({
    requestedItems: [],
    singleItem: null,
    myRequests: [],
  }),
  getters: {
    filteredItems: (state) => {
      if (userStore.user) {
        return state.requestedItems.filter(
          (item) => item.borrower._id !== userStore.user._id
        );
      } else {
        return state.requestedItems;
      }
    },
  },
  actions: {
    async fetchRequestedItems() {
      const { data } = await api.get(`/api/requested_items`);
      this.requestedItems = data;
    },
    async fetchRequestedItemById(itemId) {
      const { data } = await api.get(`/api/requested_items/` + itemId);

      this.singleItem = data;
    },
    async fetchMyRequests() {
      const { data } = await api.get(
        `/api/requested_items/borrower/${userStore.user._id}`
      );
      this.myRequests = data;
    },
    async postRequestedItems(payload) {
      const { data } = await api.post(`/api/requested_items`, payload);
    },
    async updateStatus(id, status) {
      await api.put(`/api/requested_items/${id}`, { status });
    },
  },
});
