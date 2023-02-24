/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable indent */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/default-param-last */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-use-before-define */

import { Action } from './Action';
import { ChangeValuePayload } from './FormActions';
import { FormState, ValidateForm } from './types';

export const create_form_reducer =
  <T>(validate_fn: ValidateForm<T>) =>
  (state: FormState<T>, { type, payload }: Action<any>): FormState<T> => {
    const handlers: any = {
      initialize: (value: T): FormState<T> => ({
          ...state,
          value,
          dirty: false,
          dirty_fields: [],
        show_errors: false
        }),
      change_value: ({
        field_name,
        field_value
      }: ChangeValuePayload<T>): FormState<T> => ({
          ...state,
        dirty_fields: Array.from(
          new Set([...state.dirty_fields, field_name.toString()])
        ),
          value: {
            ...state.value,
          [field_name]: field_value
          },
        dirty: true
        }),
      show_errors: (): FormState<T> => ({
        ...state,
        show_errors: true
      }),
      set_focused: (field_name: keyof T | ''): FormState<T> => ({
        ...state,
        focused_field: field_name
      })
    };

    let next_state = state;

    if (handlers[type] && typeof handlers[type] === 'function') {
      next_state = handlers[type](payload);
    }

    const errors = validate_fn(next_state.value);

    return {
      ...next_state,
      errors,
      //@ts-ignore
      valid: !Object.keys(errors).some((key: any) => !!errors[key])
    };
  };
