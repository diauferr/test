import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .loading-container {
    display: flex;
    justify-content: center;
    height: 70vh;
    align-items: center;

    .ant-spin-dot-item {
      background-color: #fd4357;
    }
  }
`;

export const ContentContainer = styled.div`
  max-width: 1024px;
  display: flex;
  flex-direction: column;
  align-items: center;

  & {
    --red-active: #fd4357;
    padding-left: 30px;
    padding-right: 30px;
    margin-top: 200px;
  }

  .pointer {
    cursor: pointer;
    user-select: none;
  }

  .label {
    padding-top: 8px;
    font-weight: 500;
  }

  .mt-5 {
    margin-top: 10px;
  }

  .text-center {
    text-align: center;
  }

  .justify-center {
    display: flex;
    flex-direction: row;
    align-content: center;
    align-items: center;
  }

  .relative {
    position: relative;
  }

  .form-footer {
    background: whitesmoke;
    padding: 10px;
    margin: 30px 0;
  }

  .send {
    padding: 14px 30px 12px;
    width: auto;
    height: auto;
    line-height: 1;
    margin: 10px auto;
    display: block;
  }

  h2 {
    font-size: 0.9rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--top-bar-background-color);

    &.super {
      position: relative;
      bottom: -20px;
    }

    i {
      margin-right: 10px;
      font-size: 1.2rem;
      position: relative;
      top: 2px;
    }
  }

  .badge-count {
    color: #fff;
    background-color: var(--red-active);
    border-radius: 100%;
    display: inline-flex;
    align-content: center;
    justify-content: center;
    align-items: center;
    font-size: 0.8rem;
    padding: 0 4px;
    position: relative;
  }

  .ant-form-item {
    margin-bottom: 0;
  }

  .date-separator {
    display: inline-flex;
    padding: 0 0 0 6px;
    height: 40px;
    justify-content: center;
    align-items: center;
  }

  article {
    margin-bottom: 30px;

    .inner {
      padding-left: 30px;

      h2 a {
        color: var(--primary-color);

        &:hover,
        &:focus,
        &:active {
          color: var(--primary-color);
        }
      }

      .highlight_description {
        margin-bottom: 15px;
      }
    }
  }

  @media only screen and (max-width: 700px) {
    & {
      padding-top: 28px;
    }
  }

  @media only screen and (min-width: 992px) {
    .label {
      padding: 8px 0 0 28px;
    }
  }
`;

export const FormArea = styled.div`
  .ant-btn-round.ant-btn-sm {
    margin: 0 5px;
    border: 0 none;
    height: auto;
    line-height: 1.5;
    background-color: #dcdcdc;
    font-size: 1rem;
    padding: 0.3rem 1rem;

    &:hover,
    &:focus,
    &:active {
      color: inherit;
    }

    &.ant-btn-danger {
      color: #fff;
      background-color: var(--red-active);
    }

    &.ant-btn-primary {
      color: #fff;
      background-color: var(--top-bar-background-color);
    }

    &.btn-area {
      margin-bottom: 10px;
    }
  }
`;
