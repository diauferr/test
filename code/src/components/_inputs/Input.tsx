import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  input {
    box-shadow: none;
    transition: all 0.4s;

    &:focus {
      box-shadow: none;
    }

    border-width: 2px;
  }
`;
export const Input = React.forwardRef(
  ({ size, error, onPressEnter, ...props }: any, ref) => {
    let sizeClass = ' ';
    if (size) {
      sizeClass = `${sizeClass}is-${props.size}`;
    }

    let errorClass = ' ';
    if (error) {
      errorClass = `${errorClass}is-danger`;
    }

    return (
      <Container>
        <input
          className={`input ${sizeClass}${errorClass}`}
          {...props}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              if (onPressEnter) onPressEnter();
            }
          }}
          ref={ref}
        />
      </Container>
    );
  }
);
