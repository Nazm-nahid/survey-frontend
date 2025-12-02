export interface SurveyField {
  local_id: number;
  title: string;
  description: string;
  type: "short" | "dropdown" | "radio" | "checkbox" | "rating";
  visibility: boolean;
  is_required: boolean;
  options: { title: string; value: number }[];
  conditions: string[];
}
