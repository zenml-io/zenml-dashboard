import React from 'react';
import cn from 'classnames';

import { Box, FlexBox, Paragraph } from '..';

import styles from './index.module.scss';
import { icons } from '..';
import { iconColors } from '../../../constants';

export const InputWithLabel = ({
  InputComponent,
  label,
  name,
  labelColor,
  optional,
  required,
  helperText = label,
}: {
  InputComponent: JSX.Element;
  label: string;
  name?: any;
  labelColor?: any;
  optional?: boolean;
  required?: boolean;
  helperText?: string;
}): JSX.Element => (
  <FlexBox.Column fullWidth>
    <Box paddingBottom="sm">
      <Paragraph
        size="body"
        style={{ color: labelColor ? labelColor : 'black' }}
      >
        <label htmlFor={name} style={{ display: 'flex', flexDirection: 'row' }}>
          {label}
          {optional && (
            <span style={{ color: '#C8C8C8', marginLeft: '4px' }}>
              (Optional)
            </span>
          )}
          {required && (
            <span style={{ color: 'red', marginLeft: '4px' }}>*</span>
          )}
          {helperText && (
            <span style={{ marginLeft: '8px' }}>
              <icons.info
                color={iconColors.darkGrey}
                title={helperText}
                size="xs"
              />
            </span>
          )}
        </label>
      </Paragraph>
    </Box>
    {InputComponent}
  </FlexBox.Column>
);

export const BaseInput = ({
  value,
  onChange,
  defaultValue,
  inputRef,
  placeholder,
  type,
  hasError,
  className,
  style,
  onRemoveFocus,
  ...props
}: {
  value?: string;
  onChange: (e: any) => void;
  defaultValue?: string;
  inputRef?: any;
  placeholder?: string;
  type: string;
  onRemoveFocus?: any;
  hasError?: boolean;
  className?: string;
  style?: any;
}): JSX.Element => (
  <input
    {...props}
    ref={inputRef}
    onChange={onChange}
    onBlur={onRemoveFocus}
    value={value}
    defaultValue={defaultValue}
    placeholder={placeholder}
    className={cn(styles.input, hasError ? styles.error : null, className)}
    type={type}
    style={style}
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
  value,
  onChangeText,
  defaultValue,
  inputRef,
  placeholder,
  hasError,
  style,
  type = 'text',
  onRemoveFocus,
  ...props
}: {
  value?: string;
  onChangeText?: (s: string) => void;
  defaultValue?: string;
  placeholder?: string;
  hasError?: boolean;
  type?: string;
  inputRef?: any;
  onRemoveFocus?: any;
  style?: any;
  onKeyDown?: (e: { key: string }) => void;
}): JSX.Element => (
  <BaseInput
    {...props}
    inputRef={inputRef}
    hasError={hasError}
    onChange={(e: any): void => {
      onChangeText?.(e.target.value);
    }}
    value={value}
    defaultValue={defaultValue}
    onRemoveFocus={onRemoveFocus}
    placeholder={placeholder}
    type={type}
    style={style}
  />
);

export const TextAreaInput = ({
  value,
  onChangeText,
  inputRef,
  placeholder,
  hasError = false,
  style,
  onRemoveFocus,
  lines = 4,
  ...props
}: {
  value: string;
  onChangeText: (s: string) => void;
  placeholder?: string;
  hasError?: boolean;
  inputRef?: any;
  onRemoveFocus?: () => void;
  lines?: number;
  style?: any;
  onKeyDown?: (e: { key: string }) => void;
}): JSX.Element => (
  <textarea
    {...props}
    ref={inputRef}
    onChange={(e) => onChangeText(e.target.value)}
    onBlur={onRemoveFocus}
    value={value}
    placeholder={placeholder}
    className={cn(styles.textarea, hasError ? styles.error : null)}
    style={style}
    rows={lines}
  />
);

export const DropdownInput = ({
  onChange,
  value,
  placeholder,
  hasError,
  options,
  style,
  ...props
}: {
  onChange: (s: string) => void;
  value: string;
  placeholder?: string;
  hasError?: boolean;
  options: Record<string, string>[];
  style: any;
}): JSX.Element => (
  <select
    {...props}
    onChange={(e: any) => onChange(e.target.value)}
    value={value}
    placeholder={placeholder}
    className={cn(styles.input, hasError ? styles.error : null)}
    style={style}
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
