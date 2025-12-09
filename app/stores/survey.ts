import { defineStore } from "pinia";
import { useApi } from "~/composables/useApi";
import type { SurveyField } from "@/types/SurveyField";

export type Answer = {
  field_id: number;
  value: any;
  type: string;
};

export const useSurveyStore = defineStore("survey", {
  state: () => ({
    surveys: [] as any[],
    title: "",
    description: "",
    is_live: true,
    created_by: 1,
    fields: [] as SurveyField[],
    survey: null,     // full survey info
    answers: [] as Answer[],      // user answers { questionId: value }
    loading: false,
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

    async fetchSurvey(id: number) {
      this.loading = true;
      const api = useApi();
      try {
        const res = await api.get(`/api/survey/${id}`);
        this.survey = res.data;
      } finally {
        this.loading = false;
      }
    },

    setAnswer(fieldId: number, value: any, type: string) {
      const existing = this.answers.find(a => a.field_id === fieldId);

      if (existing) {
        existing.value = value;
        existing.type = type;
      } else {
        this.answers.push({
          field_id: fieldId,
          value: value,
          type: type,
        });
      }
    },

    async submitSurvey(id: number) {
      const api = useApi();
      return api.post(`/api/survey/${id}/submit`, {
        submission_fields: this.answers
      });
    },
  },
});
