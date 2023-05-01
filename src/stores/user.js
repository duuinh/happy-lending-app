import { defineStore } from "pinia";
import { api } from "../boot/axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    token: null,
  }),

  getters: {},

  actions: {
    async findByEmail(email) {
      const { data } = await api.get(`/api/users/find/${email}`);
      this.user = data;
    },
    async add(payload) {
      const res = await api.post(`/api/users`, payload);
      const { data } = await api.get(`/api/users/${res.data._id}`);
      this.user = data;
    },
    async update(payload, id) {
      const res = await api.put(`/api/users/${id}`, payload);
      const { data } = await api.get(`/api/users/${res.data._id}`);
      this.user = data;
    },
  },
});
