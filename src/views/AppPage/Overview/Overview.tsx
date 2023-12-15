/*
Copyright (C) 2023 e:fs TechHub GmbH (sdk@efs-techhub.com)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 */

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

function OverviewApp({ orgData, spaceData }: OverviewAppType) {
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
                  id: 'Overview.information',
                })}
              </Col>
            </Row>
            <Row className="my-2">
              <Col xs={2}>
                {formatMessage({
                  id: spaceID ? 'Overview.space' : 'Overview.organization',
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
                  id: 'Overview.container-id',
                })}
              </Col>
              <Col xs={10}>{spaceID ? spaceData?.name : orgData?.name}</Col>
            </Row>
            {spaceID ? "" : 
                          <Row className=" my-2">
                          <Col xs={2} aria-label="title-company">
                            {formatMessage({
                              id: 'Overview.company',
                            })}
                          </Col>
                          <Col xs={10}>
                            {orgData?.company}
                          </Col>
                        </Row>
            }
            <Row className=" my-2">
              <Col xs={2} aria-label="title-description">
                {formatMessage({
                  id: 'Overview.Description',
                })}
              </Col>
              <Col xs={10}>
                {spaceID ? spaceData?.description : orgData?.description}
              </Col>
            </Row>
            <Row className="my-2">
              <Col xs={2}>
                {formatMessage({
                  id: 'Overview.owners',
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
}

export default OverviewApp;
