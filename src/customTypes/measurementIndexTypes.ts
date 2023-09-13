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
