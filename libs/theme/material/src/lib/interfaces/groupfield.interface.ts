import { FieldConfig } from '@tanglass-erp/material';

export interface Groupfield {
  name: string;
  label: string;
  fields: FieldConfig[];
  headerVisible?: boolean;
}
