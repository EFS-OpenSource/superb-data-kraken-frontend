import React from 'react';
import { useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Col, Container, Row } from 'react-bootstrap';
import { Chip } from '@components/index';
import { Organization, Space } from '@customTypes/index';

interface OverviewAppType {
  orgData: Organization;
  spaceData: Space;
}

const OverviewApp: React.FC<OverviewAppType> = ({ orgData, spaceData }) => {
  const { formatMessage } = useIntl();
  const { spaceID } = useParams();

  const owners = (): string[] => {
    if (orgData && orgData.owners && !spaceData) {
      return orgData.owners;
    }
    if (spaceData && spaceData.owners) {
      return spaceData.owners;
    }
    return [''];
  };

  return (
    <Container fluid className="my-6 px-8">
      <Col md="auto">
        <Row className="mb-3">
          <Col>
            <Row>
              <Col xs={12} className="h3 font-weight-medium">
                {formatMessage({
                  id: 'AppPage.information',
                })}
              </Col>
            </Row>
            <Row className="my-2">
              <Col xs={2}>
                {formatMessage({
                  id: spaceID ? 'AppPage.space' : 'AppPage.organization',
                })}
              </Col>
              <Col xs={10}>
                {spaceID
                  ? spaceData?.displayName || spaceData?.name
                  : orgData?.displayName || orgData?.name}
              </Col>
            </Row>
            <Row className="my-2">
              <Col xs={2}>
                {formatMessage({
                  id: 'AppPage.container-id',
                })}
              </Col>
              <Col xs={10}>{spaceID ? spaceData?.name : orgData?.name}</Col>
            </Row>
            <Row className=" my-2">
              <Col xs={2} aria-label="title-description">
                {formatMessage({
                  id: 'AppPage.Description',
                })}
              </Col>
              <Col xs={10}>
                {spaceID ? spaceData?.description : orgData?.description}
              </Col>
            </Row>
            <Row className="my-2">
              <Col xs={2}>
                {formatMessage({
                  id: 'AppPage.owners',
                })}
              </Col>
              <Col xs={10}>
                {owners().map((owner) => (
                  <Chip
                    key={owner}
                    text={owner}
                    activeColor="accent"
                    disabled
                  />
                ))}
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Container>
  );
};

export default OverviewApp;
