import { defineStore } from "pinia";
import { api } from "../boot/axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: localStorage.getItem("user"),
  }),

  getters: {},

  actions: {
    async login(payload) {
      const { data } = await api.post(`/api/users/login`, payload);
      this.user = data;
      localStorage.setItem("user", data);
    },
    async register(payload) {
      const { data } = await api.post(`/api/users`, payload);
      this.user = data;
      localStorage.setItem("user", data);
    },
  },
});
