import React from 'react';
interface IProps {
  test_id: string;
}

export const TestId: React.FC<IProps> = ({ test_id }) => (
  <div
    {...{
      'data-testid': test_id,
      style: {
        position: 'absolute',
        top: -100,
        left: -100,
        opacity: 0,
        width: 1,
        height: 1
      }
    }}></div>
);
