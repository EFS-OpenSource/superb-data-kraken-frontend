import { FC } from 'react';
import { Col, Row } from 'react-bootstrap';
import { BsX } from 'react-icons/bs';
import { nanoid } from 'nanoid';
import { produce } from 'immer';
import { sortBy } from 'lodash';
import { Icon, Chip } from '@components/index';
import { IoClose } from 'react-icons/io5';
import { MeasurementIndex, Filter } from '@customTypes/index';

export interface InputChipFieldProps {
  selectedFilters: Filter[];
  indexAttributes: string[];
  reducedIndexAttributes: string[];
  onSelectedFilters: (selectedFilters: Filter[]) => void;
  onReducedIndexAttributes: (updatedPropOptions: string[]) => void;
  onSetTableData: (tableData: MeasurementIndex[]) => void;
  onSetHitCount: (hitCount: number | undefined) => void;
}

const InputChipField: FC<InputChipFieldProps> = ({
  selectedFilters,
  indexAttributes,
  reducedIndexAttributes,
  onSelectedFilters,
  onReducedIndexAttributes,
  onSetTableData,
  onSetHitCount,
}) => {
  const removeAllInputChips = (): void => {
    onSelectedFilters([]);
    onReducedIndexAttributes(indexAttributes);
    onSetTableData([]);
    onSetHitCount(undefined);
  };
  const handleDeleteChip = (
    property: string,
    operator: string,
    value: string | undefined,
  ): void => {
    const reducedSelectedFilterOptions = selectedFilters.filter(
      (options) =>
        options.value !== value ||
        options.property !== property ||
        options.operator !== operator,
    );

    const updateIndexAttributes = sortBy(
      produce(reducedIndexAttributes, (draft) => {
        draft.push(property);
      }),
      [(item: string) => item],
    );

    onSelectedFilters(reducedSelectedFilterOptions);
    onReducedIndexAttributes(updateIndexAttributes);

    if (reducedSelectedFilterOptions.length === 0) {
      removeAllInputChips();
    }
  };

  return (
    <Row className="m-0 align-items-center">
      <Col xs={11} className="p-0 d-flex flex-wrap">
        {selectedFilters.map((filterOptions) => (
          <div key={nanoid()} className="mr-3 my-2">
            <Chip
              ariaLabel="search-chip"
              key={`${
                filterOptions.property
              } ${filterOptions.operator.toLowerCase()} ${filterOptions.value}`}
              text={`${
                filterOptions.property
              } ${filterOptions.operator.toLowerCase()} ${filterOptions.value}`}
              icon={
                <Icon
                  ariaLabel="deleteAddEditModalTag"
                  icon={IoClose}
                  type="button"
                  color="text-light"
                  size={16}
                  onClick={() =>
                    handleDeleteChip(
                      filterOptions.property,
                      filterOptions.operator,
                      filterOptions.value,
                    )
                  }
                />
              }
              activeColor="accent"
              size="sm"
            />
          </div>
        ))}
      </Col>
      <Col xs={1} className="p-0 text-center">
        <BsX
          size={32}
          role="button"
          className="btn btn-secondary disabled p-0 m-0"
          onClick={removeAllInputChips}
        />
      </Col>
    </Row>
  );
};

export default InputChipField;
