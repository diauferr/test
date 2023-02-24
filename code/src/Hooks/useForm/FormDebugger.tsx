import React from 'react';
import { FormState } from './types';

export const FormDebugger: React.FC<{
  state: FormState<any>;
}> = ({ state }) => (
  <pre className="bg-gray-200 text-xs mt-10">
    {JSON.stringify(state, null, 2)}
  </pre>
);
