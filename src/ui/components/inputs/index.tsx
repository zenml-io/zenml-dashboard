import React from 'react';
import cn from 'classnames';

import { Box, FlexBox, Paragraph } from '..';

import styles from './index.module.scss';

export const InputWithLabel = ({
  InputComponent,
  label,
  name,
  labelColor,
}: {
  InputComponent: JSX.Element;
  label: string;
  name?: any;
  labelColor?: any;
}): JSX.Element => (
  <FlexBox.Column fullWidth>
    <Box paddingBottom="xs">
      <Paragraph
        size="body"
        style={{ color: labelColor ? labelColor : 'black' }}
      >
        <label htmlFor={name}>{label}</label>
      </Paragraph>
    </Box>
    {InputComponent}
  </FlexBox.Column>
);

export const BaseInput = ({
  onChange,
  value,
  placeholder,
  type,
  hasError,
  className,
  ...props
}: {
  onChange: any;
  value: string;
  placeholder?: string;
  type: string;
  hasError?: boolean;
  className?: string;
}): JSX.Element => (
  <input
    {...props}
    onChange={onChange}
    value={value}
    placeholder={placeholder}
    className={cn(styles.input, hasError ? styles.error : null, className)}
    type={type}
  />
);

export const PasswordInput = ({
  onChangeText,
  value,
  placeholder,
  hasError,
  ...props
}: {
  onChangeText: any;
  value: string;
  placeholder: string;
  hasError?: boolean;
}): JSX.Element => (
  <BaseInput
    {...props}
    hasError={hasError}
    onChange={(e: any): void => {
      onChangeText(e.target.value);
    }}
    value={value}
    placeholder={placeholder}
    type="password"
  />
);

type InputType = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const EmailInput = ({
  onChangeText,
  value,
  placeholder,
  hasError,
  ...props
}: {
  onChangeText: any;
  value: string;
  placeholder: string;
  hasError?: boolean;
  props?: InputType;
}): JSX.Element => (
  <BaseInput
    {...props}
    hasError={hasError}
    onChange={(e: any): void => {
      onChangeText(e.target.value);
    }}
    value={value}
    placeholder={placeholder}
    type="email"
  />
);

export const TextInput = ({
  onChangeText,
  value,
  placeholder,
  hasError,
  type = 'text',
  ...props
}: {
  onChangeText: any;
  value: string;
  placeholder?: string;
  hasError?: boolean;
  type?: string;
}): JSX.Element => (
  <BaseInput
    {...props}
    hasError={hasError}
    onChange={(e: any): void => {
      onChangeText(e.target.value);
    }}
    value={value}
    placeholder={placeholder}
    type={type}
  />
);

export const DropdownInput = ({
  onChange,
  value,
  placeholder,
  hasError,
  options,
  ...props
}: {
  onChange: any;
  value: string;
  placeholder?: string;
  hasError?: boolean;
  options: Record<string, string>[];
}): JSX.Element => (
  <select
    {...props}
    onChange={(e: any) => onChange(e.target.value)}
    value={value}
    placeholder={placeholder}
    className={cn(styles.input, hasError ? styles.error : null)}
  >
    <option selected disabled value="">
      {placeholder}
    </option>
    {options.map((option, index) => (
      <option key={index} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);
