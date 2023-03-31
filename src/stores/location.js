import { defineStore } from "pinia";
import { api } from "../boot/axios";

export const useLocationStore = defineStore("location", {
  state: () => ({
    locations: [],
  }),
  getters: {},
  actions: {
    async fetchLocations() {
      const { data } = await api.get(`/api/locations`);
      this.locations = data;
    },
  },
});
