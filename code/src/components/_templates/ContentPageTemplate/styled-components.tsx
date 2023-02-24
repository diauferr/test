import styled from 'styled-components';
import { ContentSection } from '../../ContentSection';
import { ContentBelowHeader } from '../ContentBelowHeader';

export const Container = styled<any>(ContentBelowHeader)`
  .title-info {
    color: #b1b1b1;
    font-size: 0.9rem;
    font-weight: bold;
    margin-bottom: 0.2rem;
    display: block;
    text-transform: uppercase;
    color: var(--primary-color-dark);
  }

  position: relative;
  background: #fff;
`;

export const Content = styled(ContentSection)<any>`
  display: flex;
  @media (max-width: 700px) {
    flex-direction: column;
    .img-container {
      flex: 1;
      display: flex;
      justify-content: center;
      img {
        max-height: 400px;
      }
    }
    .description-container {
      flex: 1;
      margin-top: 2rem;
      padding: 0;

      .details-container {
        flex-direction: column;
      }
    }
  }
  .img-container {
    flex: 2;
    padding-right: 1.5rem;
    img {
      max-width: 100%;
    }
  }

  .description-container {
    padding: 0 1rem;
    flex: 4;

    p {
      text-align: justify;
    }

    ul {
      margin: 0;
      padding-left: 1rem;
      line-height: 1.5rem;

      li {
        list-style: none;
      }
    }

    .details-container {
      justify-content: space-between;
      display: flex;

      .buttons-container {
        display: flex;
        justify-content: flex-end;
        flex-direction: column;
        button {
          margin-top: 1rem;
        }
      }
    }
  }
`;

export const EditionsSelectContainer = styled.div`
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px solid #cecece;

  display: flex;
  align-items: center;
  select {
    height: 30px;
    border-radius: 3px;
    width: 250px;
    outline: none;
  }

  label {
    font-family: var(--text-font-family);
    font-weight: 500;
    margin-right: 1rem;
  }
`;

export const TabsContainer = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;

  .ant-input {
    border: 0;
    background: #f3f3f3;

    :focus {
      outline: none !important;
    }
  }

  .ant-btn {
    background: var(--primary-color);
    border: 0;
    outline: none;
  }
`;
