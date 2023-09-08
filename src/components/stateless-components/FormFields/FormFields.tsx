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

/* eslint-disable react/no-unused-prop-types */
import { ReactNode } from 'react';
import { Alert, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';

interface FormInputType {
  id: string;
  ariaLabel: string;
  groupClassName?: string;
  groupStyle?: Record<string, unknown>;
  labelClassName?: string;
  labelStyle?: Record<string, unknown>;
  labelText: string;
  labelToolTipIcon?: JSX.Element;
  labelToolTipText?: string | ReactNode;
  inputClassName?: string;
  inputStyle?: Record<string, unknown>;
  fontSize?: 'sm' | 'lg';
  value?: string | number;
  placeholder?: string;
  onChange?: (e?: any) => void;
  required?: boolean;
  validationFeedback?: string;
  disabled?: boolean;
}

export function FormInput({
  id,
  ariaLabel,
  groupClassName,
  groupStyle,
  labelClassName,
  labelStyle,
  labelText,
  labelToolTipIcon,
  labelToolTipText,
  inputClassName,
  inputStyle,
  fontSize,
  value,
  placeholder,
  onChange,
  required,
  validationFeedback,
  disabled,
}: FormInputType) {
  return (
    <Form.Group className={groupClassName} style={groupStyle}>
      <Form.Label
        className={`${labelClassName} d-flex align-items-center mb-1`}
        style={labelStyle}
        htmlFor={id}
      >
        {labelText}
        {labelToolTipIcon && (
          <OverlayTrigger
            placement="right"
            transition={false}
            overlay={
              <Tooltip id={labelText as string}>{labelToolTipText}</Tooltip>
            }
          >
            <div className="ms-1 d-flex align-items-center">
              {labelToolTipIcon as JSX.Element}
            </div>
          </OverlayTrigger>
        )}
      </Form.Label>
      <Form.Control
        aria-label={ariaLabel}
        size={fontSize}
        id={id}
        type="text"
        className={inputClassName}
        style={inputStyle}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
      />
      <Form.Control.Feedback type="invalid">
        <div className="h6">{validationFeedback}</div>
      </Form.Control.Feedback>
    </Form.Group>
  );
}

interface FormTextAreaType extends FormInputType {
  rows?: number;
}

export function FormTextarea({
  id,
  groupClassName,
  groupStyle,
  labelClassName,
  labelStyle,
  labelText,
  labelToolTipIcon,
  labelToolTipText,
  fontSize,
  inputClassName,
  inputStyle,
  placeholder,
  value,
  rows,
  onChange,
  required,
}: FormTextAreaType) {
  return (
    <Form.Group className={groupClassName} style={groupStyle}>
      <Form.Label className={labelClassName} style={labelStyle} htmlFor={id}>
        {labelText}
        {labelToolTipIcon && (
          <OverlayTrigger
            placement="right"
            overlay={
              <Tooltip id={labelText as string}>{labelToolTipText}</Tooltip>
            }
          >
            <div className="ms-1 d-flex align-items-center">
              {labelToolTipIcon as JSX.Element}
            </div>
          </OverlayTrigger>
        )}
      </Form.Label>
      <Form.Control
        id={id}
        as="textarea"
        size={fontSize}
        type="text"
        className={inputClassName}
        style={inputStyle}
        rows={rows || 0}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </Form.Group>
  );
}

// interface FormFileType extends Partial<FormInputType> {
//   dataTestId?: string;
//   fileText?: string;
//   dataBrowse?: string;
//   custom?: boolean;
//   accept?: string;
//   size?: number;
// }

// export function FormFile({
//   dataTestId,
//   id,
//   groupClassName,
//   groupStyle,
//   labelClassName,
//   labelStyle,
//   labelText,
//   labelToolTipIcon,
//   labelToolTipText,
//   inputClassName,
//   inputStyle,
//   fileText,
//   dataBrowse,
//   custom,
//   accept,
//   size,
//   onChange,
//   required,
// }: FormFileType) {
//   <Form.Group className={groupClassName} style={groupStyle}>
//     <Form.Label className={labelClassName} style={labelStyle} htmlFor={id}>
//       {labelText}
//       {labelToolTipIcon && (
//         <OverlayTrigger
//           placement="right"
//           overlay={
//             <Tooltip id={labelText as string}>{labelToolTipText}</Tooltip>
//           }
//         >
//           <div className="ms-1 d-flex align-items-center">
//             {labelToolTipIcon as JSX.Element}
//           </div>
//         </OverlayTrigger>
//       )}
//     </Form.Label>
//     <Form.Control
//       type="file"
//       data-testid={dataTestId}
//       id={id}
//       label={fileText}
//       data-browse={dataBrowse}
//       custom={custom}
//       className={inputClassName}
//       style={inputStyle}
//       onChange={onChange}
//       accept={accept}
//       size={size}
//       required={required}
//     />
//   </Form.Group>;
// }

interface FormRadioButtonsType extends Partial<FormInputType> {
  inline?: boolean;
  labelsAndValues: { name: string; value: string }[];
  checkedValue?: string;
  disabled?: boolean;
}

export function FormRadioButtons({
  id,
  groupClassName,
  groupStyle,
  labelClassName,
  labelStyle,
  labelText,
  labelToolTipIcon,
  labelToolTipText,
  inline,
  labelsAndValues,
  checkedValue,
  onChange,
  required,
  disabled,
}: FormRadioButtonsType) {
  return (
    <Form.Group id={id} className={groupClassName} style={groupStyle}>
      <Form.Label className={labelClassName} style={labelStyle} htmlFor={id}>
        {labelText}
        {labelToolTipIcon && (
          <OverlayTrigger
            placement="right"
            overlay={
              <Tooltip id={labelText as string}>{labelToolTipText}</Tooltip>
            }
          >
            <div className="ms-1 d-flex align-items-center">
              {labelToolTipIcon as JSX.Element}
            </div>
          </OverlayTrigger>
        )}
      </Form.Label>
      <div className="ms-2">
        {labelsAndValues.map((radioButton) => (
          <Form.Check
            aria-label={radioButton.name}
            key={radioButton.name}
            type="radio"
            inline={inline}
            name={id}
            label={radioButton.name}
            value={radioButton.value}
            checked={checkedValue === radioButton.value}
            onChange={onChange}
            required={required}
            disabled={disabled}
            style={{
              fontSize: '17px',
            }} /* TODO set style globally change with updating to bootstrap 5 */
          />
        ))}
      </div>
    </Form.Group>
  );
}

interface FormCheckboxProps extends Partial<FormInputType> {
  labelsAndValues: { name: string; value: string | boolean }[];
  disabled?: boolean;
  warning?: string;
  inline?: boolean;
}

export function FormCheckbox({
  id,
  groupClassName,
  groupStyle,
  labelClassName,
  labelStyle,
  labelText,
  labelToolTipIcon,
  labelToolTipText,
  labelsAndValues,
  onChange,
  required,
  disabled,
  warning,
  inline,
}: FormCheckboxProps) {
  return (
    <Form.Group id={id} className={groupClassName} style={groupStyle}>
      <Form.Label
        aria-label={labelText}
        className={`${labelClassName} m-0 h3 font-weight-medium`}
        style={labelStyle}
        htmlFor={id}
      >
        {labelText}
        {labelToolTipIcon && (
          <OverlayTrigger
            placement="right"
            overlay={
              <Tooltip id={labelText as string}>{labelToolTipText}</Tooltip>
            }
          >
            <div className="ms-1 d-flex align-items-center">
              {labelToolTipIcon as JSX.Element}
            </div>
          </OverlayTrigger>
        )}
      </Form.Label>
      <div className="ms-2">
        {warning && (
          <Alert variant="warning" className="font-weight-normal py-1 px-2">
            {warning}
          </Alert>
        )}
        {labelsAndValues.map((checkbox) => (
          <Form.Check
            aria-label={checkbox.name}
            key={checkbox.name}
            inline={inline}
            name={id}
            required={required}
          >
            <Form.Check.Input
              className="me-2"
              type="checkbox"
              value={checkbox.name}
              disabled={disabled}
              checked={
                typeof checkbox.value === 'string'
                  ? labelsAndValues
                      .map((labelAndValue) => labelAndValue.value)
                      .includes(checkbox.value)
                  : checkbox.value
              }
              onChange={onChange}
            />
            <Form.Check.Label
              className="font-weight-normal"
              style={{
                fontSize: '17px',
              }} /* TODO set style globally change with updating to bootstrap 5 */
            >
              {checkbox.name}
            </Form.Check.Label>
          </Form.Check>
        ))}
      </div>
    </Form.Group>
  );
}
