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
