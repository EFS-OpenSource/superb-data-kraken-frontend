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
