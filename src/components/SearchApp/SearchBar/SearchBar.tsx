import { FC, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import { IoOptionsSharp } from 'react-icons/io5';
import { Filter, MeasurementIndex } from '@customTypes/index';
import { CustomButton, Icon } from '@components/index';

export interface SeachBarProps {
  searchInputBasic: JSX.Element;
  searchInputAdvanced: JSX.Element;
  onSetSelectFilters: (filter: Filter[]) => void;
  hitCount: number | undefined;
  searchDuration: number | undefined;
  onSetHitCount: (hitCount: number | undefined) => void;
  onSetTableData: (tableData: MeasurementIndex[]) => void;
  onSetSearchValue: (searchValue: string | undefined) => void;
}

export const SearchBar: FC<SeachBarProps> = ({
  searchInputBasic,
  searchInputAdvanced,
  onSetSelectFilters,
  hitCount,
  searchDuration,
  onSetHitCount,
  onSetTableData,
  onSetSearchValue,
}) => {
  const { formatMessage } = useIntl();
  const [advancedMode, setAdvancedMode] = useState<boolean>(false);

  const handleToggler = (): void => {
    setAdvancedMode(!advancedMode);
    onSetSelectFilters([]);
    onSetTableData([]);
    onSetHitCount(undefined);
    onSetSearchValue(undefined);
  };

  return (
    <Col
      xl={{ span: 8, offset: 2 }}
      xs={{ span: 12, offset: 0 }}
      className={
        hitCount !== undefined
          ? 'px-5 pt-4 pb-2 bg-light rounded-lg'
          : 'px-5 py-4 bg-light rounded-lg'
      }
    >
      <Row>
        <Col
          xs={{ span: 11, offset: 0 }}
          className={
            advancedMode
              ? 'p-0 m-0'
              : 'd-flex p-0 m-0 bg-white align-items-center'
          }
        >
          {!advancedMode ? searchInputBasic : searchInputAdvanced}
        </Col>
        <Col xs={{ span: 1, offset: 0 }} className="p-0 m-0 text-center">
          <CustomButton
            size="sm"
            placementTooltip="top"
            icon={<Icon icon={IoOptionsSharp} size={20} />}
            onClick={handleToggler}
            tooltipMessage="Search.search-bar-filter-button"
          />
        </Col>
      </Row>
      {hitCount !== undefined && searchDuration && (
        <Row>
          <h6 className="mt-1 mb-0 text-dark">
            {hitCount.toString()}
            {formatMessage({
              id: 'SearchBar.search-result-count',
            })}
            (~ {searchDuration / 1000}
            {formatMessage({
              id: 'SearchBar.search-result-duration',
            })}
            )
          </h6>
        </Row>
      )}
    </Col>
  );
};
