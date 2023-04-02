import { defineStore } from "pinia";
import { api } from "../boot/axios";

export const useItemStore = defineStore("item", {
  state: () => ({
    items: [],
    singleItem: null
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
    async postItems(payload) {
      const { data } = await api.post(`/api/items`, payload);
    },
  },
});
