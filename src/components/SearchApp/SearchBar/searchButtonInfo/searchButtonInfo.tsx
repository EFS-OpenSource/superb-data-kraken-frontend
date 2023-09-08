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
