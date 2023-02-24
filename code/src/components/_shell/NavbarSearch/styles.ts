import styled, { keyframes } from 'styled-components';
import { Input as input, Radio } from 'antd';
import { device } from '../../styledComponent';

const Radiogroup = Radio.Group;

export const zoomInOut = keyframes`
	0% {
		transform: scale(1, 1);
	}

	50% {
		transform: scale(1.1, 1.04);
	}

	100% {
		transform: scale(1, 1);
	}
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 22px;
  order: 3;
  width: 100%;

  &.closed {
    display: none;
  }

  @media ${device.sm} {
    &.closed {
      display: flex;
    }
  }

  @media ${device.lg} {
    width: auto;
    order: 2;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  position: relative;
`;

export const WrapMobile = styled.div`
  display: flex;
`;

export const Form = styled.div`
  display: flex;
`;

export const Button = styled.button`
  width: 44px;
  height: 40px;
  background-color: #d7282f;
  border-radius: 8px;
  border: none;
  margin-left: 8px;

  &:active {
    animation: ${zoomInOut} 0.3s ease-in-out;
  }
`;

export const SearchButtonMobile = styled.button`
  width: 38px;
  height: 36px;
  background-color: #d7282f;
  border-radius: 8px;
  border: none;
  margin-right: 8px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: nowrap;
  flex-direction: column;
  cursor: pointer;
  order: 1;

  &:active {
    animation: ${zoomInOut} 0.3s ease-in-out;
  }

  @media ${device.sm} {
    display: none;
  }
`;

export const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

export const Input = styled(input)`
  &.ant-input {
    background-color: #f1f3f5;
    color: #848384;
    min-width: 240px;
    border-radius: 8px !important;
    height: 40px !important;
    margin-bottom: 8px !important;
    border: 0 none;
    transition: all ease-in-out 1s;

    @media ${device.md} {
      min-width: 360px;
    }

    @media ${device.xl} {
      min-width: 500px;
    }

    @media ${device.xl2} {
      min-width: 700px;
    }
  }
`;

export const RadioGroup = styled(Radiogroup)`
  .ant-radio-checked .ant-radio-inner {
    border-color: #003a70 !important ;
  }

  .ant-radio-checked .ant-radio-inner:after {
    background-color: #003a70;
  }

  .ant-radio:hover .ant-radio-inner {
    border-color: #003a70;
  }
`;
