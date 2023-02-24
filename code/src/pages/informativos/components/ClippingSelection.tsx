import React, { useEffect } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { Icon, Tabs } from 'antd';
import { useDoRequest } from '../../../Hooks/useDoRequest';
import { ClippingModel } from '../../../models/clipping/ClippingModel';
import { Loading } from '../../../components/_shell/Loading';
import { RouteComponentProps } from 'react-router';
import { ClippingRequests } from '../../../requests/clipping/ClippingRequests';
import moment from 'moment';

const { TabPane } = Tabs;

const Container = styled.div`
  padding: 0.5rem 0;
  width: 100%;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
`;

export const ClippingSelection = ({ match, history }: RouteComponentProps) => {
  const clippingId = _.get(match.params, 'clippingId');
  const [clippings, loading, , doRequest] = useDoRequest<ClippingModel[]>();

  const getClippingUrl = (clipping: ClippingModel) => {
    const todayMoment = moment();

    let url = `/informativos/${clipping.name.toLocaleLowerCase()}/${todayMoment.format(
      'YYYY'
    )}/${todayMoment.format('MM')}`;
    if (!clipping.monthly) url += `/${todayMoment.format('DD')}`;

    return url;
  };

  useEffect(() => {
    doRequest(() => ClippingRequests.getClippings());
  }, []);

  useEffect(() => {
    if (!clippingId && clippings) {
      const [firstClipping] = clippings;

      if (!firstClipping) return;

      history.replace(getClippingUrl(firstClipping));
    }
  }, [clippings]);

  return (
    <Container>
      {loading ? (
        <Loading size={22} />
      ) : (
        <Tabs
          defaultActiveKey={clippingId}
          onTabClick={(key) => {
            const clipping = clippings.find(
              (c) => c.name.toLowerCase() === key
            );
            history.push(getClippingUrl(clipping));
          }}>
          {clippings &&
            clippings.map((c) => (
              <TabPane
                tab={
                  <span>
                    <Icon type="file-text" />
                    {c.name}
                  </span>
                }
                key={c.name.toLowerCase()}
              />
            ))}
        </Tabs>
      )}
    </Container>
  );
};
