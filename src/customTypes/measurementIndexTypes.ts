export interface MeasurementIndex {
  metadata: Metadata;
  massdata: MassData[];
  organization: string;
  uuid: string;
  space: string;
}

export interface Metadata {
  name: string;
  description: string;
  dateTime: DateTime;
  customers?: Customer[];
  project: Project;
  scope: Scope;
  environment: Environment;
  authors: ContactPerson[];
  data: Data[];
  entities: Entity[] | unknown;
  tags?: string[];
  result?: Result;
}

interface DateTime {
  createdAt: string;
  startedAt?: string;
  endedAt?: string;
  retentionTime?: string;
}

interface Customer {
  name: string;
  department?: string;
  contactPersons: ContactPerson[];
  address: Address;
}

interface Project {
  name: string;
  dateTime?: DateTime;
  type: string;
  costCenters?: string[];
  confidentiality: string;
  purpose: string;
}

interface Environment {
  name: string;
  description?: string;
  contactPersons?: ContactPerson[];
  address?: Address;
  longitude?: string[];
  latitude?: string[];
}

interface Scope {
  name: string;
  dateTime?: DateTime;
  purpose: string;
  confidentiality: string;
  releaseLevel?: string;
  tags?: string[];
}

interface ContactPerson {
  name: string;
  telephone: string;
  email: string;
}

interface Address {
  houseNumber: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

interface Data {
  name: string;
  format?: string;
  dateTime: DateTime;
  relatedToEntities?: string[];
  definition?: string;
  identifier?: string;
  type?: string;
}

interface Entity {
  name?: string;
  specification?: string;
  licensing?: string;
}

interface Result {
  passed: boolean;
  comment: string;
}

export interface MassData {
  name: string;
  location: string;
  dateCreated: string;
  size: number;
}
