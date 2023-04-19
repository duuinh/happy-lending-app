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
  getters: {
    filteredItems: (state) => {
      if (userStore.user) {
        return state.items.filter(
          (item) => item.lender._id !== userStore.user._id
        );
      } else {
        return state.items;
      }
    },
  },
  actions: {
    async fetchItems() {
      const { data } = await api.get(`/api/items`);
      this.items = data;
    },
    async fetchItemById(itemId) {
      const { data } = await api.get(`/api/items/` + itemId);

      this.singleItem = data;
    },
    async fetchMyItems() {
      const { data } = await api.get(`/api/items/lender/${userStore.user._id}`);
      this.myItems = data;
    },
    async postItems(payload) {
      let { data } = await api.post(
        `/api/upload`,
        { file: payload.file },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      payload.img_url = data.url;
      await api.post(`/api/items`, payload);
    },
    async updateStatus(id, status) {
      await api.put(`/api/items/${id}`, { status });
    },
  },
});
