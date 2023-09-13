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

import { Icon } from '@components/index';
import {
  FaEquals,
  FaGreaterThan,
  FaGreaterThanEqual,
  FaLessThan,
  FaLessThanEqual,
  FaNotEqual,
  FaBacon,
  FaGripLinesVertical,
} from 'react-icons/fa';

const searchButtonInfo = [
  {
    icon: <Icon icon={FaEquals} size={12} />,
    tooltip: 'Search.equal-button',
    value: 'EQ',
  },
  {
    icon: <Icon icon={FaGreaterThan} size={12} />,
    tooltip: 'Search.greater-than-button',
    value: 'GT',
  },
  {
    icon: <Icon icon={FaGreaterThanEqual} size={12} />,
    tooltip: 'Search.greater-than-eq-button',
    value: 'GTE',
  },
  {
    icon: <Icon icon={FaLessThan} size={12} />,
    tooltip: 'Search.less-than-button',
    value: 'LT',
  },
  {
    icon: <Icon icon={FaLessThanEqual} size={12} />,
    tooltip: 'Search.less-than-eq-button',
    value: 'LTE',
  },
  {
    icon: <Icon icon={FaNotEqual} size={12} />,
    tooltip: 'Search.not-equal-button',
    value: 'NOT',
  },
  {
    icon: <Icon icon={FaBacon} size={12} />,
    tooltip: 'Search.like-button',
    value: 'LIKE',
  },
  {
    icon: <Icon icon={FaGripLinesVertical} size={12} />,
    tooltip: 'Search.between-button',
    value: ' BETWEEN',
  },
];

export default searchButtonInfo;
