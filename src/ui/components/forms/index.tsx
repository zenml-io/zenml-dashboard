import React, { useState } from 'react';
import {
  FlexBox,
  InputWithLabel,
  TextInput,
  If,
  Paragraph,
  PasswordInput,
  EmailInput,
  Box,
  LinkBox,
  icons,
  DropdownInput,
} from '..';
import { handleUpdateNumericInput } from '../../../utils/input';
import { iconColors } from '../../../constants/icons';

export const FormValidationError = (props: {
  hasError?: boolean;
  text?: string;
}): JSX.Element => (
  <If condition={!!props.hasError}>
    {(): JSX.Element => (
      <Box marginTop="xs">
        <Paragraph size="tiny" color="red">
          {props.text}
        </Paragraph>
      </Box>
    )}
  </If>
);

export type FieldError = {
  text: string;
  hasError: boolean;
};

export const FormTextField = (props: {
  label: string;
  labelColor?: any;
  placeholder: string;
  value: string;
  onChange?: any;
  error?: FieldError;
  disabled?: boolean;
  type?: string;
  name?: string;
  style?: any;
}): JSX.Element => (
  <FlexBox.Column fullWidth>
    <FlexBox alignItems="center" fullWidth>
      <InputWithLabel
        name={props.name}
        label={props.label}
        labelColor={props.labelColor}
        InputComponent={
          <TextInput
            {...props}
            style={props.style}
            placeholder={props.placeholder}
            hasError={props.error?.hasError}
            value={props.value}
            onChangeText={props.onChange}
          />
        }
      />
    </FlexBox>
    <FormValidationError
      text={props.error?.text}
      hasError={props.error?.hasError}
    />
  </FlexBox.Column>
);

export const FormDropdownField = (props: {
  label: string;
  labelColor?: any;
  placeholder: string;
  value: string;
  options: any[];
  onChange?: any;
  error?: FieldError;
  disabled?: boolean;
  name?: string;
  style?: any;
}): JSX.Element => (
  <FlexBox.Column fullWidth>
    <FlexBox alignItems="center" fullWidth>
      <InputWithLabel
        name={props.name}
        label={props.label}
        labelColor={props.labelColor}
        InputComponent={
          <DropdownInput
            {...props}
            style={props.style}
            placeholder={props.placeholder}
            hasError={props.error?.hasError}
            value={props.value}
            onChange={props.onChange}
          />
        }
      />
    </FlexBox>
    <FormValidationError
      text={props.error?.text}
      hasError={props.error?.hasError}
    />
  </FlexBox.Column>
);

export const CopyField = (
  props: {
    label: string;
    labelColor: any;
    placeholder: any;
    value: string;
  } & any,
): JSX.Element => {
  const [copied, setCopied] = useState(false);
  const handleClick = () => {
    navigator.clipboard.writeText(props.value);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <FlexBox.Column fullWidth style={{ height: '100px' }}>
      <FlexBox alignItems="center" fullWidth style={{ position: 'relative' }}>
        <InputWithLabel
          name={props.name}
          label={props.label}
          labelColor={props.labelColor}
          InputComponent={
            <TextInput
              {...props}
              value={`${props.value.slice(0, 60)}...`}
              placeholder={props.placeholder}
            />
          }
        />
        <LinkBox
          style={{ position: 'absolute', right: '10px', top: '30px' }}
          onClick={handleClick}
        >
          <icons.copy color={iconColors.grey} />
        </LinkBox>
      </FlexBox>
      {copied && (
        <div style={{ marginTop: '20px', textAlign: 'right' }}>
          <button
            style={{
              backgroundColor: '#F4F4F4',
              padding: '5px 20px',
              border: 'none',
              borderRadius: '5px',
            }}
          >
            Copied
          </button>
        </div>
      )}
    </FlexBox.Column>
  );
};

export const FormPasswordField = (
  props: {
    label: string;
    labelColor: any;
    placeholder: string;
    value: string;
    onChange: any;
    error: FieldError;
    showPasswordOption?: boolean;
  } & any,
): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <FlexBox.Column fullWidth>
      <FlexBox alignItems="center" fullWidth style={{ position: 'relative' }}>
        <InputWithLabel
          name={props.name}
          label={props.label}
          labelColor={props.labelColor}
          InputComponent={
            !showPassword ? (
              <PasswordInput
                {...props}
                onChangeText={props.onChange}
                value={props.value}
                placeholder={props.placeholder}
                hasError={props.error.hasError}
              />
            ) : (
              <TextInput
                {...props}
                onChangeText={props.onChange}
                value={props.value}
                placeholder={props.placeholder}
                hasError={props.error.hasError}
              />
            )
          }
        />
        {props.showPasswordOption && (
          <LinkBox
            style={{ position: 'absolute', right: '10px', top: '30px' }}
            onClick={() => setShowPassword(!showPassword)}
          >
            <icons.eye
              color={showPassword ? iconColors.black : iconColors.grey}
            />
          </LinkBox>
        )}
      </FlexBox>
      <FormValidationError
        text={props.error.text}
        hasError={props.error.hasError}
      />
    </FlexBox.Column>
  );
};

export const FormEmailField = (
  props: {
    label: string;
    labelColor: any;
    placeholder: string;
    value: string;
    onChange: any;
    error: FieldError;
  } & any,
): JSX.Element => (
  <FlexBox.Column fullWidth>
    <FlexBox alignItems="center" fullWidth>
      <InputWithLabel
        label={props.label}
        labelColor={props.labelColor}
        InputComponent={
          <EmailInput
            onChangeText={props.onChange}
            value={props.value}
            placeholder={props.placeholder}
            hasError={props.error && props.error.hasError}
            {...props}
          />
        }
      />
    </FlexBox>
    <FormValidationError
      text={props.error && props.error.text}
      hasError={props.error && props.error.hasError}
    />
  </FlexBox.Column>
);

export const FormNumberField = (props: {
  label: string;
  labelColor: any;
  placeholder: string;
  error: any;
  value: string;
  onChange: any;
}): JSX.Element => (
  <FlexBox.Column fullWidth>
    <FlexBox alignItems="center" fullWidth>
      <InputWithLabel
        label={props.label}
        labelColor={props.labelColor}
        InputComponent={
          <TextInput
            type="number"
            placeholder={props.placeholder}
            hasError={props.error.hasError}
            value={props.value}
            onChangeText={(e: string) =>
              props.onChange(handleUpdateNumericInput(e))
            }
          />
        }
      />
    </FlexBox>
    <FormValidationError
      text={props.error.text}
      hasError={props.error.hasError}
    />
  </FlexBox.Column>
);
