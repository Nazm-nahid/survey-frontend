import type { SurveyField } from "./SurveyField";

export interface Survey {
  id: number;
  title: string;
  description: string;
  is_live: boolean;
  created_by: number;
  fields: SurveyField[];
}
