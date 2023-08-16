import { Organization, Space } from '@customTypes/index';

const validParams = (
  orgID: string | undefined,
  spcID: string | undefined,
  data: Organization[],
) => {
  const checkParams = (
    orgId: string | undefined,
    spcId: string | undefined,
  ) => {
    let isValid;
    if (orgId && data) {
      isValid = data.find((org: Organization) => org.id.toString() === orgId);
    }
    if (isValid && spcId) {
      isValid = isValid.spaces.find(
        (space: Space) => space.id.toString() === spcId,
      );
      return isValid;
    }
    return isValid;
  };

  return checkParams(orgID, spcID);
};

export default validParams;
