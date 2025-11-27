export interface FieldConfig {
  name: string;
  required: boolean;
  visible: boolean;
  readonly?: boolean;
  label?: string;
  placeholder?: string;
}

export interface CompanyCustomerFormConfig {
  fields: {
    idCard: FieldConfig;
    name: FieldConfig;
    lastName: FieldConfig;
    email: FieldConfig;
    phone: FieldConfig;
    address: FieldConfig;
    city: FieldConfig;
    dateOfBirth: FieldConfig;
    notes: FieldConfig;
  };
  submitButtonText?: string;
  cancelButtonText?: string;
}
