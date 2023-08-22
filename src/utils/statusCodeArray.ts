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
  '50201': 'ErrorToast.status-code-metadata-service-error',
  '50202': 'ErrorToast.status-code-storagemanager-service-error',
};

const checkCode = (statusCode: string | undefined) => {
  console.log(`In check code ${statusCode}`);
  console.log(statusCodesArray[String(statusCode)]);
  return statusCodesArray[String(statusCode)];
};

export default checkCode;
