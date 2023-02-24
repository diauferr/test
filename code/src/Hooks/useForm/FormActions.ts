import { Action } from './Action';

export type ChangeValuePayload<T> = {
  field_name: keyof T;
  field_value: any;
};

export const FormActions = <T>() => ({
  initialize: (form_value: T): Action<T> => ({
    type: 'initialize',
    payload: form_value
  }),
  change_value: (
    field_name: keyof T,
    field_value: any
  ): Action<ChangeValuePayload<T>> => ({
    type: 'change_value',
    payload: {
      field_name,
      field_value
    }
  }),
  set_focused: (field_name: keyof T | ''): Action<string> => ({
    type: 'set_focused',
    payload: field_name.toString()
  }),
  show_errors: (): Action<true> => ({
    type: 'show_errors',
    payload: true
  })
});
