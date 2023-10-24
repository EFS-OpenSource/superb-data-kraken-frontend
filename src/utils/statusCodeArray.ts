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

const statusCodesArray: { [code: string]: string } = {
  '10001': 'ErrorToast.status-code-save-provide-id',
  '10011': 'ErrorToast.status-code-save-required-info-missing',
  '10012': 'ErrorToast.status-code-save-organization-name-found',
  '10013': 'ErrorToast.status-code-save-space-name-found',
  '10020': 'ErrorToast.status-code-get-single-not-found',
  '10021': 'ErrorToast.status-code-get-single-space-not-found',
  '10022': 'ErrorToast.status-code-invalid-name',
  '10025': 'ErrorToast.status-code-no-access-to-organization',
  '10026': 'ErrorToast.status-code-no-access-to-space',
  '10027': 'ErrorToast.status-code-renaming-object-forbidden',
  '10028': 'ErrorToast.status-code-forbidden',
  '10031': 'ErrorToast.status-code-unknown-right',
  '20001': 'ErrorToast.status-code-unable-create-role',
  '20011': 'ErrorToast.status-code-unable-delete-role',
  '20021': 'ErrorToast.status-code-unable-get-role',
  '20022': 'ErrorToast.status-code-unable-get-token',
  '20023': 'ErrorToast.status-code-unable-get-users',
  '20024': 'ErrorToast.status-code-unable-assign-role',
  '20025': 'ErrorToast.status-code-unable-withdraw-role',
  '20026': 'ErrorToast.status-code-unable-get-user',
  '20030': 'ErrorToast.status-code-find-userrequest',
  '20031': 'ErrorToast.status-code-conflicting-ids-provided',
  '40000': 'ErrorToast.status-code-validation-error',
  '40001': 'ErrorToast.status-code-unable-delete-orga',
  '50000': 'ErrorToast.status-code-unknown-error',
  // TODO: 50200 abdecken
  '50201': 'ErrorToast.status-code-metadata-service-error',
  '50202': 'ErrorToast.status-code-storagemanager-service-error',
};

const checkCode = (statusCode: string | undefined) => {
  console.log(`In check code ${statusCode}`);
  console.log(statusCodesArray[String(statusCode)]);
  return statusCodesArray[String(statusCode)];
};

export default checkCode;
