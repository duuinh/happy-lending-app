import { defineStore } from "pinia";
import { api } from "../boot/axios";

export const useItemStore = defineStore("item", {
  state: () => ({
    items: [],
  }),
  getters: {},
  actions: {
    async fetchItems() {
      const { data } = await api.get(`/api/items`);
      this.items = data;
    },
  },
});
