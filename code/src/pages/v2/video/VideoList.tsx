import React, { useContext, useEffect, useRef } from 'react';
import useFiltersRequest from './hooks/search/useFiltersRequest';
import { Divider, Row, Col, Pagination, Spin } from 'antd';
import { Container, ContentContainer } from './components/LayoutFilter';
import { List } from './components/common/List';
import { VideoFiltersContext } from './VideoFiltersContext';
import { OrderFilter } from './components/filters/OrderFilter';
import { SubFilters, VideoResultEmpty } from './styles';

export const VideoList: React.FC = () => {
  const mountedRef = useRef(false);
  const { submit } = useContext(VideoFiltersContext);
  const { data, error, page, pager, loading, setPage, loadFilters } =
    useFiltersRequest();
  const loadData = async () => loadFilters();

  useEffect(() => {
    if (mountedRef.current) {
      loadData();
    } else {
      mountedRef.current = true;
    }
  }, [page, submit]);

  useEffect(() => {
    loadData();
    mountedRef.current = true;
  }, []);
  const errorTpl = <p>Houve um erro ao carregar os vídeos...</p>;

  const loadingTpl = (
    <div className="loading-container">
      <Spin tip="Carregando" size="large" />
    </div>
  );

  const subFilters = (
    <SubFilters>
      <p>{pager.total} vídeos ordenados por: </p>
      <OrderFilter />
    </SubFilters>
  );

  if (!pager.total && !loading && !error) {
    return (
      <Container>
        <ContentContainer>
          <VideoResultEmpty>
            Nenhum resultado encontrado para esta consulta.
          </VideoResultEmpty>
        </ContentContainer>
      </Container>
    );
  }

  return (
    <Container>
      {loading ? (
        loadingTpl
      ) : (
        <ContentContainer>
          <Col>
            {error ? (
              errorTpl
            ) : (
              <>
                {subFilters}
                <List items={data} />
              </>
            )}
          </Col>
          <Row type="flex" justify="center">
            <Col>
              <Divider />
              <Pagination
                current={pager.currentPage}
                pageSize={pager.perPage}
                total={pager.total}
                onChange={setPage}
              />
              <br />
            </Col>
          </Row>
        </ContentContainer>
      )}
    </Container>
  );
};
