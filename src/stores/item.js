import { defineStore } from "pinia";
import { api } from "../boot/axios";
import { useUserStore } from "./user";

const userStore = useUserStore();
export const useItemStore = defineStore("item", {
  state: () => ({
    items: [],
    singleItem: null,
    myItems: [],
  }),
  getters: {},
  actions: {
    async fetchItems() {
      const { data } = await api.get(`/api/items`);
      this.items = data;
    },
    async fetchItemById(itemId) {
      const { data } = await api.get(`/api/items/`+ itemId);
      
      this.singleItem = data;
    },
    async fetchMyItems() {
      const { data } = await api.get(`/api/items/lender/${userStore.user._id}`);
      this.myItems = data;
    },
    async postItems(payload) {
      const { data } = await api.post(`/api/items`, payload);
    },
  },
});
