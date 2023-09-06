import { Col, Row } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import { format } from 'date-fns';
import { MeasurementIndex } from '@customTypes/index';

interface ProjectInfoProps {
  data: MeasurementIndex;
}

const ProjectInfo: React.FC<ProjectInfoProps> = ({ data }): JSX.Element => {
  const { formatMessage } = useIntl();
  return (
    data &&
    data.metadata && (
      <div
        style={{ fontSize: 'smaller' }}
        className="mt-5 mb-6 p-4 bg-light rounded-lg"
      >
        <Row className="mx-2">
          {data.metadata.project && data.metadata.project.name && (
            <Col xs={6} lg={3} className="px-4">
              <Row>
                <h5 className="text-dark">
                  {formatMessage({
                    id: 'MeasuremenentInfoOverlay.project-name',
                  })}
                </h5>
              </Row>
              <Row>
                <div>{data.metadata.project.name}</div>
              </Row>
            </Col>
          )}
          {data.metadata.project && data.metadata.project.purpose && (
            <Col xs={6} lg={3} className="px-4">
              <h5 className="text-dark">
                <Row>
                  {formatMessage({
                    id: 'MeasuremenentInfoOverlay.project-purpose',
                  })}
                </Row>
              </h5>
              <Row>
                <div>{data.metadata.project.purpose}</div>
              </Row>
            </Col>
          )}
          {data.metadata.project && data.metadata.project.confidentiality && (
            <Col xs={6} lg={3} className="px-4">
              <h5 className="text-dark">
                <Row>
                  {formatMessage({
                    id: 'MeasuremenentInfoOverlay.project-confidentiality',
                  })}
                </Row>
              </h5>
              <Row>
                <div>{data.metadata.project.confidentiality}</div>
              </Row>
            </Col>
          )}
          {data.metadata.name && (
            <Col xs={6} lg={3} className="px-4">
              <h5 className="text-dark">
                <Row>
                  {formatMessage({
                    id: 'MeasuremenentInfoOverlay.measurement-name',
                  })}
                </Row>
              </h5>
              <Row>
                <div>{data.metadata.name}</div>
              </Row>
            </Col>
          )}
          {data.metadata.scope && data.metadata.scope.name && (
            <Col xs={6} lg={3} className="px-4">
              <h5 className="text-dark">
                <Row>
                  {formatMessage({
                    id: 'MeasuremenentInfoOverlay.measurement-scope',
                  })}
                </Row>
              </h5>
              <Row>
                <div>{data.metadata.scope.name}</div>
              </Row>
            </Col>
          )}
          {data.metadata.dateTime && data.metadata.dateTime.createdAt && (
            <Col xs={6} lg={3} className="px-4">
              <h5 className="text-dark">
                <Row>
                  {formatMessage({
                    id: 'MeasuremenentInfoOverlay.measurement-createdAt',
                  })}
                </Row>
              </h5>
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
              <h5 className="text-dark">
                <Row>
                  {formatMessage({
                    id: 'MeasuremenentInfoOverlay.measurement-environment',
                  })}
                </Row>
              </h5>

              <Row>
                <div>{data.metadata.environment.name}</div>
              </Row>
            </Col>
          )}
        </Row>
      </div>
    )
  );
};

export default ProjectInfo;
