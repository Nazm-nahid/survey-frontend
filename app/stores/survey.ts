import { defineStore } from "pinia";
import { useApi } from "~/composables/useApi";
import type { SurveyField } from "@/types/SurveyField";

export const useSurveyStore = defineStore("survey", {
  state: () => ({
    surveys: [] as any[],
    title: "",
    description: "",
    is_live: true,
    created_by: 1,
    fields: [] as SurveyField[]
  }),

  actions: {
    addField(type: any) {
      const id = Date.now();
      this.fields.push({
        local_id: id,
        title: "",
        description: "",
        type,
        visibility: true,
        is_required: false,
        options: [],
        conditions: [],
      });
    },

    removeField(id: any) {
      this.fields = this.fields.filter(f => f.local_id !== id);
    },

    addOption(fieldId: any, option: any) {
      const field = this.fields.find(f => f.local_id === fieldId);
      if( !field) return;
      if (!field.options) field.options = [];
      field.options.push(option);
    },

    addCondition(fieldId: any, condition: any) {
      const field = this.fields.find(f => f.local_id === fieldId);
      if( !field) return;
      if (!field.conditions) field.conditions = [];
      field.conditions.push(condition);
    },

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
