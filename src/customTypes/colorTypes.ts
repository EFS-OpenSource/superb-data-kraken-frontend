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

export const textColors = [
  'text-primary',
  'text-secondary',
  'text-accent',
  'text-success',
  'text-info',
  'text-warning',
  'text-danger',
  'text-dark',
  'text-middle',
  'text-light',
] as const;

export const colors = [
  'primary',
  'secondary',
  'accent',
  'success',
  'info',
  'warning',
  'danger',
  'dark',
  'middle',
  'light',
  'outline-primary',
  'outline-secondary',
  'outline-accent',
  'outline-success',
  'outline-info',
  'outline-warning',
  'outline-danger',
  'outline-dark',
  'outline-middle',
  'outline-light',
] as const;

export type TextColor = (typeof textColors)[number];
export type Color = (typeof colors)[number];
