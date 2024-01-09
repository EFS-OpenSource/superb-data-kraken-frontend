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

import { Chip } from '@components/index';
import { useIntl } from 'react-intl';
import { OrgSpaceUserType } from '@customTypes/index';

function CustomCardBodyLayout({ data }: OrgSpaceUserType) {
  const { formatMessage } = useIntl();

  const formatDescription = (desc: string | undefined) => {
    if(desc === undefined || desc === null) {
      return "";
    }
    return desc.split("\n").map((i) => <div>{i}</div>);
  }

  return (
    <div className='p-0 d-flex align-items-start flex-column h-100'>
      <div className='mt-2 mb-3'>
        {data && data.description && data.description.length > 200
          ? formatDescription(`${data.description.substring(0, 200)}...`)
          : formatDescription(data.description)}
      </div>
      <div className='mt-auto mb-4'>
        <div className='font-weight-medium mb-2'>
          {formatMessage({
            id: 'Card.Owner',
          })}
        </div>
        <div>
          {data &&
            data.owners &&
            data.owners.map((owner) => (
              <Chip
                key={owner}
                text={owner}
                size='sm'
                activeColor='accent'
                disabled
                className='my-1'
              />
            ))}
        </div>
      </div>
      {/* TODO: Get list of owners from backend include them here */}
    </div>
  );
}

export default CustomCardBodyLayout;
