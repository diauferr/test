import styled from 'styled-components';

export const Title = styled.h1.attrs<any>((props) => ({
  className: props.dontAnimate ? '' : 'animated fadeInUp'
}))<any>`
  font-family: var(--title-font-family);
  font-weight: 700;
  line-height: 2.7rem;
  font-size: 2.6rem;
  color: #323232;
  margin-bottom: 2rem;

  @media (max-width: 600px) {
    font-size: 1.5rem;
    line-height: 1.4rem;
  }
`;
