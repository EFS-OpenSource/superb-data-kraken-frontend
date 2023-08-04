import { CSSProperties } from 'react';
import { Card } from 'react-bootstrap';

export interface CustomCardProps {
  cardTitleElement?: JSX.Element;
  cardBodyElement?: JSX.Element;
  className?: string;
  style?: CSSProperties;
}

const CustomCard = ({
  cardTitleElement,
  cardBodyElement,
  style,
  className,
}: CustomCardProps) => (
  <Card className={`${className} rounded`} style={style}>
    <Card.Title className="m-4 ps-3">{cardTitleElement}</Card.Title>
    <Card.Body className="mx-4 p-0 ps-3 pe-6">{cardBodyElement}</Card.Body>
  </Card>
);

export default CustomCard;
