import { Col, Row } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import { format } from 'date-fns';
import { MeasurementIndex } from '@customTypes/index';

interface ProjectInfoProps {
  data: MeasurementIndex;
}

function ProjectInfo({ data }: ProjectInfoProps): JSX.Element {
  const { formatMessage } = useIntl();
  return (
    data &&
    data.metadata && (
      <div
        style={{ fontSize: 'smaller' }}
        className="mt-5 mb-6 p-4 bg-light rounded"
      >
        <Row className="mx-2">
          {data.metadata.project && data.metadata.project.name && (
            <Col xs={6} lg={3} className="px-4 mb-2">
              <Row className="px-0">
                <span className="text-dark">
                  {formatMessage({
                    id: 'MeasuremenentInfoOverlay.project-name',
                  })}
                </span>
              </Row>
              <Row>
                <div>{data.metadata.project.name}</div>
              </Row>
            </Col>
          )}
          {data.metadata.project && data.metadata.project.purpose && (
            <Col xs={6} lg={3} className="px-4">
              <Row className="px-0">
                <span className="text-dark">
                  {formatMessage({
                    id: 'MeasuremenentInfoOverlay.project-purpose',
                  })}
                </span>
              </Row>

              <Row>
                <div>{data.metadata.project.purpose}</div>
              </Row>
            </Col>
          )}
          {data.metadata.project && data.metadata.project.confidentiality && (
            <Col xs={6} lg={3} className="px-4">
              <Row>
                <span className="text-dark">
                  {formatMessage({
                    id: 'MeasuremenentInfoOverlay.project-confidentiality',
                  })}
                </span>
              </Row>
              <Row>
                <div>{data.metadata.project.confidentiality}</div>
              </Row>
            </Col>
          )}
          {data.metadata.name && (
            <Col xs={6} lg={3} className="px-4">
              <Row>
                <span className="text-dark">
                  {formatMessage({
                    id: 'MeasuremenentInfoOverlay.measurement-name',
                  })}
                </span>
              </Row>
              <Row>
                <div>{data.metadata.name}</div>
              </Row>
            </Col>
          )}
          {data.metadata.scope && data.metadata.scope.name && (
            <Col xs={6} lg={3} className="px-4">
              <Row>
                <span className="text-dark">
                  {formatMessage({
                    id: 'MeasuremenentInfoOverlay.measurement-scope',
                  })}
                </span>
              </Row>
              <Row>
                <div>{data.metadata.scope.name}</div>
              </Row>
            </Col>
          )}
          {data.metadata.dateTime && data.metadata.dateTime.createdAt && (
            <Col xs={6} lg={3} className="px-4">
              <Row>
                <span className="text-dark">
                  {formatMessage({
                    id: 'MeasuremenentInfoOverlay.measurement-createdAt',
                  })}
                </span>
              </Row>
              <Row>
                <div>
                  {format(
                    new Date(data.metadata.dateTime.createdAt),
                    'dd-MM-yyyy',
                  )}
                </div>
              </Row>
            </Col>
          )}
          {data.metadata.environment && data.metadata.environment.name && (
            <Col xs={6} lg={3} className="px-4">
              <Row>
                <span className="text-dark">
                  {formatMessage({
                    id: 'MeasuremenentInfoOverlay.measurement-environment',
                  })}
                </span>
              </Row>

              <Row>
                <div>{data.metadata.environment.name}</div>
              </Row>
            </Col>
          )}
        </Row>
      </div>
    )
  );
}

export default ProjectInfo;
