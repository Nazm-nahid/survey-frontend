import { defineStore } from "pinia";
import { useApi } from "~/composables/useApi";

export const useSurveyStore = defineStore("survey", {
  state: () => ({
    surveys: [] as any[],
  }),

  actions: {
    async fetchSurveys() {
      const api = useApi();
      const res = await api.get("/api/survey/");
      this.surveys = res.data;
    },

    async createSurvey(payload: any) {
      const api = useApi();
      return api.post("/api/survey/create", payload);
    },

    async submitSurvey(id: number, submission: any) {
      const api = useApi();
      return api.post(`/api/survey/${id}/submit`, submission);
    },
  },
});
