import { defineStore } from "pinia";
import { useApi } from "~/composables/useApi";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
    user: null as any,
  }), 

  actions: {
    async register(email: string, password: string) {
      const api = useApi();
      return api.post("/register", { email, password });
    },

    async verify(code: string, email: string) {
      const api = useApi();
      return api.get(`/verify?code=${code}&email=${email}`);
    },

    async login(email: string, password: string) {
      const api = useApi();
      const res = await api.post("/login", { email, password });
      this.token = res.data.token;
      if (typeof window !== "undefined") {
        localStorage.setItem("token", res.data.token);
      }
      return res.data;
    },

    logout() {
      this.token = null;
      this.user = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
    },
  },
});
