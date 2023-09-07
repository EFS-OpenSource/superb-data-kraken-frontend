import { FC } from 'react';
import { Col, Form } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import { Filter } from '@customTypes/index';
import { Icon } from '@components/index';

export interface SearchInputBasicProps {
  searchValue: string | undefined;
  onSetSelectFilters: (filterAllFieds: Filter[]) => void;
  onSetSearchValue: (searchValue: string | undefined) => void;
}

export const SearchInputBasic: FC<SearchInputBasicProps> = ({
  searchValue,
  onSetSelectFilters,
  onSetSearchValue,
}) => {
  const filterAllFieds = [
    {
      operator: 'LIKE',
      property: '_all_fields',
      value: searchValue,
    },
  ];

  const handleKeyPress = (target: { charCode: number }): void => {
    if (target.charCode === 13 && searchValue) {
      onSetSelectFilters(filterAllFieds);
    }
  };

  const handleSearchButton = () => {
    onSetSelectFilters(filterAllFieds);
  };

  return (
    <Col
      xs={{ span: 12, offset: 0 }}
      className="border border-white rounded-lg pl-1 pr-2 d-flex justify-content-between align-items-center"
    >
      <Form.Control
        className="h-100 border border-white p-0 pl-2 shadow-none"
        onChange={(event: { target: { value: string } }) => {
          onSetSearchValue(event.target.value);
        }}
        onKeyPress={(event: { charCode: number }) => {
          handleKeyPress(event);
        }}
      />
      <Icon
        icon={BsSearch}
        size={20}
        color="text-primary"
        type="button"
        onClick={handleSearchButton}
      />
    </Col>
  );
};
