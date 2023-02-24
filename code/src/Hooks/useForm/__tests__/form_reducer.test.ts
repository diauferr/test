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

import { FormActions } from '../FormActions';
import { create_form_reducer } from '../form_reducer';
import { FormState, ValidateForm } from '../types';

type FieldValues = {
  name: string;
  is_admin: boolean;
  tags: { id: string; title: string }[];
  age: number;
};

describe('form_reducer', () => {
  const validate_form: ValidateForm<FieldValues> = (value) => ({
    is_admin: '',
    tags: '',
    name: !value.name ? 'nome nao pode estar vazio.' : '',
    age: !value.age ? 'idade nao pode estar nula.' : ''
  });

  const form_reducer = create_form_reducer(validate_form);

  const value: FieldValues = {
    name: 'ricardo',
    is_admin: true,
    tags: [
      { id: 'admin', title: 'administrador' },
      { id: 'dev', title: 'developer' }
    ],
    age: 22
  };

  const INITIAL_STATE: FormState<FieldValues> = {
    show_errors: false,
    dirty: false,
    dirty_fields: [],
    valid: false,
    errors: {
      is_admin: '',
      tags: '',
      name: '',
      age: ''
    },
    value: {
      name: '',
      is_admin: false,
      tags: [],
      age: 0
    },
    focused_field: ''
  };

  const { initialize, change_value, set_focused } = FormActions<FieldValues>();

  it('Deve inicializar formulario com valores iniciais.', () => {
    // Arrange
    const action = initialize(value);

    // Act
    const next_state = form_reducer({ ...INITIAL_STATE, dirty: true }, action);

    // Assert
    expect(next_state.value).toEqual(value);
    expect(next_state.dirty).toEqual(false);
  });

  it('Deve validar o formulario.', () => {
    // Arrange
    const dto: FieldValues = {
      name: '',
      is_admin: true,
      tags: [
        { id: 'admin', title: 'administrador' },
        { id: 'dev', title: 'developer' }
      ],
      age: 0
    };
    const action = initialize(dto);

    // Act
    const next_state = form_reducer({ ...INITIAL_STATE, valid: true }, action);

    // Assert
    expect(next_state.valid).toBe(false);
    expect(next_state.errors.name).toMatch(/vazio/);
    expect(next_state.errors.age).toMatch(/nula/);
  });

  it('Deve alterar o valor de um campo.', () => {
    // Arrange
    const new_name = 'celio';
    const action = change_value('name', new_name);

    // Act
    const next_state = form_reducer(INITIAL_STATE, action);

    // Assert
    expect(next_state.dirty).toBe(true);
    expect(next_state.dirty_fields).toContain('name');
    expect(next_state.value.name).toBe(new_name);
  });

  it('Deve setar campo como focused.', () => {
    // Arrange
    const action = set_focused('name');

    // Act
    const next_state = form_reducer(INITIAL_STATE, action);

    // Assert
    expect(next_state.focused_field).toBe('name');
  });

  it('Deve setar como nenhum campo focado.', () => {
    // Arrange
    const action = set_focused('');

    // Act
    const next_state = form_reducer(
      { ...INITIAL_STATE, focused_field: 'name' },
      action
    );

    // Assert
    expect(next_state.focused_field).toBe('');
  });
});
