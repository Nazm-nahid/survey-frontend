export interface SurveyOption {
  id?: number;
  field_id?: number;
  title: string;
  value: number | string;
}

export interface SurveyField {
  id?: number;
  survey_id?: number;

  local_id: number;

  title: string;
  description: string;
  type: "short_text" | "select" | "radio" | "checkbox" | "rating";

  visibility: boolean;
  is_required: boolean;
  conditions: string[];

  options: SurveyOption[];

  // rating
  min?: number;
  max?: number;
}
