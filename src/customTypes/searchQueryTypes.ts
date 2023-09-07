/* Supported Operators for filter 
EQ look up for '<value>'
LIKE look up for '*<value>*'
NOT look up for values not matching '<value>'
GT look up for values greater than '<value>'
GTE look up for values greater than or equal to '<value>'
LT look up for values less than '<value>'
LTE look up for values less than or equal to '<value>'
BETWEEN look up for values between '<lowerBound>'-'<upperBound>'(bounds included) */

export interface Filter {
  operator: string;
  property: string;
  value: string | undefined;
  dataType?: string;
  lowerBound?: string;
  upperBound?: string;
}

export interface Aggregations {
  dataType: string;
  property: string;
  size: number;
}

export interface QueryInput {
  // eslint-disable-next-line camelcase
  index_name: string;
  resultProperties: string[];
  filter: Filter[];
  aggregations?: Aggregations[];
}

export interface Criteria {
  property: string;
  operator: string[];
  dataType: string;
}

export interface QueryResult<T> {
  aggregations: string[];
  duration: number;
  max: number;
  // eslint-disable-next-line camelcase
  max_fetchable: number;
  page: number;
  size: number;
  hits: T;
}
