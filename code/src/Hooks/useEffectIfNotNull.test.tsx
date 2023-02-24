import React, { useState } from 'react';
import { cleanup, getByText, render } from '@testing-library/react';
import { useEffectIfNotNull } from './useEffectIfNotNull';

interface IProps {
  message: string;
  aList: any[];
}

const TestComponent = ({ message, aList }: IProps) => {
  const [count, setCount] = useState(0);

  useEffectIfNotNull(() => {
    setCount(count + 1);
  }, [message, aList]);

  return <p>{count}</p>;
};

describe('useEffectIfNotNull', () => {
  afterEach(cleanup);

  it('deve fazer update quando uma das dependencias mudarem de valor.', async () => {
    const message = 'oi';
    const list = [];
    const { container } = render(
      <TestComponent message={message} aList={list} />
    );

    expect(getByText(container, '1')).toBeTruthy();

    render(<TestComponent message={`${message}oi`} aList={list} />, {
      container
    });

    expect(getByText(container, '2')).toBeTruthy();

    render(<TestComponent message={`${message}oi`} aList={[]} />, {
      container
    });

    expect(getByText(container, '3')).toBeTruthy();

    render(<TestComponent message={''} aList={[]} />, { container });

    expect(getByText(container, '3')).toBeTruthy();
  });
});
