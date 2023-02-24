export type FormState<T> = {
  show_errors: boolean;
  dirty: boolean;
  dirty_fields: string[];
  valid: boolean;
  errors: {
    [K in keyof T]: string;
  };
  value: T;
  focused_field: keyof T | '';
};

export type ValidateForm<T> = (value: T) => {
  [K in keyof T]: string;
};
