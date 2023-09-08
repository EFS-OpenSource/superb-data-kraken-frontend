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
