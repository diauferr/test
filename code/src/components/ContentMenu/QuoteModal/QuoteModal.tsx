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

import { Icon, message } from 'antd';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { ContentType } from '../../../enums/ContentType';
import { useDoRequest } from '../../../Hooks/useDoRequest';
import { Button } from '../../Button';
import { Modal } from '../../Modal';
import { QuoteRequests } from '../../../requests/quote/QuoteRequests';

interface IProps {
  contentId: number;
  contentId2?: number;
  onCancel: () => any;
  visible: boolean;
  contentType: ContentType;
}

const CopyButtonContainer = styled.div`
  padding-bottom: 1rem;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const QuoteModal = ({
  contentId,
  onCancel,
  visible,
  contentType,
  contentId2
}: IProps) => {
  const [quote, loading, error, doRequest] = useDoRequest<any>();

  useEffect(() => {
    if (visible) {
      switch (contentType) {
        case ContentType.ARTICLE:
          doRequest(() => QuoteRequests.getArticleQuote(contentId));
          break;
        case ContentType.PERIODIC:
          doRequest(() => QuoteRequests.getPeriodicQuote(contentId));
          break;
        case ContentType.BOOK:
          doRequest(() => QuoteRequests.getBookQuote(contentId, contentId2));
          break;
        case ContentType.LEGISLATION:
          doRequest(() => QuoteRequests.getBookQuote(contentId, contentId2));
          break;
        case ContentType.CHAPTER:
          doRequest(() => QuoteRequests.getBookChapterQuote(contentId));
          break;
        case ContentType.VIDEO:
          doRequest(() => QuoteRequests.getVideoQuote(contentId));
          break;
      }
    }
  }, [visible]);

  useEffect(() => {
    if (error) message.error('Erro ao buscar citação.');
  }, [error]);

  // const copyQuote = useCallback(() => {
  //     clipboard.suppressWarnings()
  //     const dt = new clipboard.DT();
  //     dt.setData("text/html", quote)
  //     clipboard.write(dt).then(() => {
  //         message.info('Citação foi copiada.')
  //     }).catch(err => {
  //         message.warn('Não foi possível copiar a citação.')
  //     })

  // }, [quote])

  return (
    <Modal
      maskClosable={false}
      title="Referência Bibliográfica"
      visible={!!visible}
      onCancel={onCancel}
      footer={[
        <Button type={'primary'} key={'btn-1'} onClick={onCancel}>
          <Icon type="close" />
          Fechar
        </Button>
      ]}>
      {loading ? (
        <Icon
          style={{
            color: 'var(--primary-color)',
            display: 'flex',
            justifyContent: 'center',
            fontSize: '3rem',
            padding: '2rem'
          }}
          type="loading"
        />
      ) : (
        <>
          <div
            style={{ padding: '1rem' }}
            dangerouslySetInnerHTML={{
              __html: quote
            }}
          />

          {/* <CopyButtonContainer>
                        <Button onClick={copyQuote}>
                            <Icon type="copy"/>
                            Copiar
                        </Button>
                    </CopyButtonContainer> */}

          {contentType === ContentType.ARTICLE ||
          contentType === ContentType.CHAPTER ? (
              <p
                style={{
                  padding: '0 1rem',
                  color: '#00274f',
                  fontWeight: 'bold'
                }}>
              * Altere os intervalos "página inicial-página final" para as
              páginas constantes no documento.
              </p>
            ) : null}
        </>
      )}
    </Modal>
  );
};
