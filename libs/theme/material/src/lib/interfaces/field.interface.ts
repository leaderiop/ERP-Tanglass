export interface Validator {
  name: string;
  validator: any;
  message: string;
}
export interface FieldConfig {
  label?: string;
  name?: string;
  inputType?: string;
  options?: any;
  collections?: any;
  type?: string;
  multiple?: boolean;
  value?: any;
  validations?: Validator[];
  style?: string;
  hint?: string;
  disabled?: boolean;
  [key: string]: any;
}
