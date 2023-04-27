import { defineStore } from "pinia";
import { api } from "../boot/axios";
import { useUserStore } from "./user";

const userStore = useUserStore();
export const useRequestedItemStore = defineStore("requested_item", {
  state: () => ({
    requested_items: [],
    singleItem: null,
    myItems: [],
  }),
  getters: {
    filteredItems: (state) => {
      if (userStore.user) {
        return state.requested_items.filter(
          (item) => requested_item.borrower._id !== userStore.user._id
        );
      } else {
        return state.requested_items;
      }
    },
  },
  actions: {
    async fetchRequestedItems() {
      const { data } = await api.get(`/api/requested_items`);
      this.requested_items = data;
    },
    async fetchRequestedItemById(itemId) {
      const { data } = await api.get(`/api/requested_items/` + itemId);

      this.singleItem = data;
    },
    // async fetchMyItems() {
    //   const { data } = await api.get(`/api/items/lender/${userStore.user._id}`);
    //   this.myItems = data;
    // },
    async postRequestedItems(payload) {
      const { data } = await api.post(`/api/requested_items`, payload);
      // let { data } = await api.post(
      //   `/api/upload`,
      //   { file: payload.file },
      //   {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   }
      // );
      // //payload.img_url = data.url;
      // await api.post(`/api/requested_items`, payload);
    },
    async updateStatus(id, status) {
      await api.put(`/api/requested_items/${id}`, { status });
    },
  },
});
