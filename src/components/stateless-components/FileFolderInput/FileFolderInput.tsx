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

import { Icon } from '@components/index';
import { Col } from 'react-bootstrap';
import { IconType } from 'react-icons/lib';
import { useIntl } from 'react-intl';

interface FileFolderProps {
  htmlFor: string;
  containerId: string;
  ariaLabel: string;
  inputId: string;
  isMultiple?: boolean;
  webkitDirectory?: string;
  icon?: IconType;
  textId?: string;
  onDrop?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function FileFolderInput({
  htmlFor,
  containerId,
  ariaLabel,
  inputId,
  isMultiple,
  webkitDirectory,
  icon,
  textId,
  onDrop,
  onDragOver,
  onChange,
}: FileFolderProps) {
  const { formatMessage } = useIntl();

  return (
    <Col md="auto" className="w-25">
      <section className="text-right" role="button">
        <label
          htmlFor={htmlFor}
          className="shadow rounded-lg bg-light border-primary d-flex align-items-center justify-content-center"
          style={{
            opacity: 0.7,
            height: '200px',
            border: '3px solid',
          }}
        >
          <div
            className="d-flex align-items-center justify-content-center w-100"
            style={{
              height: '200px',
            }}
            id={containerId}
            onDrop={onDrop}
            onDragOver={onDragOver}
            role="button"
            tabIndex={0}
          >
            <input
              aria-label={ariaLabel}
              id={inputId}
              type="file"
              className="d-none"
              onChange={onChange}
              multiple={isMultiple}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              /* @ts-expect-error */
              webkitdirectory={webkitDirectory}
            />
            <div className="d-flex flex-column">
              {icon && (
                <Icon
                  icon={icon}
                  className="text-primary m-auto pb-2"
                  type="button"
                  size={48}
                  style={{
                    opacity: 0.7,
                  }}
                />
              )}

              <h3
                className="text-dark text-center m-auto w-75"
                style={{
                  zIndex: -10,
                  pointerEvents: 'none',
                }}
              >
                {textId &&
                  formatMessage({
                    id: `${textId}`,
                  })}
              </h3>
            </div>
          </div>
        </label>
      </section>
    </Col>
  );
}

export default FileFolderInput;
