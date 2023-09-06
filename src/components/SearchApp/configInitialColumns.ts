// temporary solution from f/847-sdk-suchoberflaeche-fuer-aicloud, ToDo: AT00051-986

import { useIntl } from 'react-intl';

class LabelValue {
  label: string;

  value: string;

  constructor(item: string) {
    this.label = item;
    this.value = item;
  }
}

export const DefaultColumnsSearch = (): LabelValue[] => {
  let columns;

  if (process.env.VITE_CONFIG_SEARCH_COLUMNS) {
    columns = process.env.VITE_CONFIG_SEARCH_COLUMNS.split(',').map(
      (item: string) => new LabelValue(item),
    );
  }
  columns = [
    { label: 'organization', value: 'organization' },
    { label: 'space', value: 'space' },
    { label: 'metadata.name', value: 'metadata.name' },
    {
      label: 'metadata.project.name',
      value: 'metadata.project.name',
    },
    {
      label: 'metadata.description',
      value: 'metadata.description',
    },
  ];

  return columns;
};

export const DefaultColumnsData = (): LabelValue[] => {
  const { formatMessage } = useIntl();
  let columns;

  if (process.env.VITE_CONFIG_SEARCH_DATA_COLUMNS) {
    columns = process.env.VITE_CONFIG_SEARCH_DATA_COLUMNS.split(',').map(
      (item: string) => new LabelValue(item),
    );
  }
  columns = [
    {
      label: formatMessage({
        id: 'ConfigInitialColumns.DefaultColumnsData.name',
      }),
      value: 'name',
    },
    {
      label: formatMessage({
        id: 'ConfigInitialColumns.DefaultColumnsData.createdAt',
      }),
      value: 'dateCreated',
    },
    {
      label: formatMessage({
        id: 'ConfigInitialColumns.DefaultColumnsData.size',
      }),
      value: 'size',
    },
    {
      label: formatMessage({
        id: 'ConfigInitialColumns.DefaultColumnsData.download',
      }),
      value: 'download',
    },
  ];
  return columns;
};
