import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  margin: 0 30px 0 30px;
  @media (min-width: 1024px) {
    width: 1024px;
  }
`;

export const WrapperWithWords = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0 20px 0;
`;

export const WrapperWithoutWords = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0 20px 0;
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: space-around;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const Text = styled.span`
  margin: 0 !important;
  width: auto;
`;
