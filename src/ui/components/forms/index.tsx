import React, { useEffect, useRef, useState } from 'react';
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
  autoFocus?: any;
  label: string;
  labelColor?: any;
  placeholder: string;
  value: string;
  onChange?: any;
  error?: FieldError;
  disabled?: boolean;
  type?: string;
  required?: string;
  name?: string;
  style?: any;
}): JSX.Element => (
  <FlexBox.Column fullWidth>
    <FlexBox alignItems="center" fullWidth>
      <InputWithLabel
        optional={props.required}
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
    showTokField: any;
  } & any,
): any => {
  const [copied, setCopied] = useState(false);
  const handleClick = () => {
    navigator.clipboard.writeText(props.value);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <FlexBox.Column fullWidth style={{ height: '70px' }}>
      <FlexBox alignItems="center" fullWidth style={{ position: 'relative' }}>
        <InputWithLabel
          name={props.name}
          label={props.label}
          labelColor={props.labelColor}
          InputComponent={
            props.showTokField ? (
              <TextInput
                {...props}
                style={{
                  background: 'rgba(168, 168, 168, 0.2)',
                  border: '1px solid #C9CBD0',
                }}
                value={`${props.value.slice(0, 30)}...`}
                placeholder={props.placeholder}
              />
            ) : (
              <TextInput
                {...props}
                style={{
                  background: 'rgba(168, 168, 168, 0.2)',
                  border: '1px solid #C9CBD0',
                }}
                value="Token"
                placeholder={props.placeholder}
              />
            )
          }
        />

        {props.showTokField && (
          <LinkBox
            style={{ position: 'absolute', right: '10px', top: '30px' }}
            onClick={handleClick}
          >
            <icons.copy color={iconColors.grey} />
          </LinkBox>
        )}
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

export const EditField = (
  props: {
    label: string;
    labelColor: any;
    placeholder: any;
    value: string;
    defaultValue?: string;
    optional: boolean;
  } & any,
): JSX.Element => {
  return (
    <FlexBox.Column fullWidth>
      <FlexBox alignItems="center" fullWidth style={{ position: 'relative' }}>
        <InputWithLabel
          name={props.name}
          label={props.label}
          optional={props.optional}
          labelColor={props.labelColor}
          InputComponent={
            <TextInput
              {...props}
              style={{
                backgroundColor: props.disabled && '#E9EAEC',
                borderWidth: props.disabled && '0px',
              }}
              defaultValue={props?.defaultValue}
              value={props.value}
              placeholder={props.placeholder}
            />
          }
        />
        {!props.disabled && (
          <Box style={{ position: 'absolute', right: '10px', top: '35px' }}>
            <icons.pen color={iconColors.grey} />
          </Box>
        )}
      </FlexBox>
    </FlexBox.Column>
  );
};

export const EditFieldSettings = (
  props: {
    inputRef: any;
    label: string;
    labelColor: any;
    placeholder: any;
    value: string;
    defaultValue?: string;
    optional: boolean;
  } & any,
): JSX.Element => {
  const [disabled, setDisabled] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current && !disabled) {
      inputRef.current.focus();
    }
  }, [disabled]);

  return (
    <FlexBox.Column fullWidth>
      <FlexBox alignItems="center" fullWidth style={{ position: 'relative' }}>
        <InputWithLabel
          name={props.name}
          label={props.label}
          optional={props.optional}
          labelColor={props.labelColor}
          InputComponent={
            <TextInput
              {...props}
              inputRef={inputRef}
              defaultValue={props?.defaultValue}
              value={props.value}
              placeholder={props.placeholder}
              disabled={disabled}
              autoFocus={!disabled}
              onRemoveFocus={() => setDisabled(!disabled)}
              // onFocus={(e: any) => e.currentTarget.select()}
            />
          }
        />
        {!props.disabled && (
          <Box
            onClick={() => {
              setDisabled(!disabled);

              setTimeout(() => {
                props.inputRef?.current?.focus();
              }, 10);
            }}
            style={{
              position: 'absolute',
              right: '10px',
              top: '35px',
              cursor: 'pointer',
            }}
          >
            {console.log(disabled, 'disableddisabled')}
            <icons.pen color={iconColors.grey} />
          </Box>
        )}
      </FlexBox>
    </FlexBox.Column>
  );
};

export const IconInputField = ({
  value,
  onChange,
  placeholder,
  clearable = true,
  disabled = false,
  iconName = 'search',
  iconColor = iconColors.grey,
}: {
  value: string;
  onChange: (s: string) => void;
  placeholder?: string;
  clearable?: boolean;
  disabled?: boolean;
  iconName?: keyof typeof icons;
  iconColor?: iconColors;
}): JSX.Element => {
  const Icon = icons[iconName];

  return (
    <FlexBox fullWidth style={{ position: 'relative' }}>
      {/* icon */}
      <Box style={{ position: 'absolute', left: '7px', top: '8px' }}>
        <Icon color={iconColor} />
      </Box>

      {/* input */}
      <TextInput
        style={{
          paddingLeft: '40px',
          paddingRight: '35px',
          backgroundColor: disabled && '#E9EAEC',
          borderWidth: disabled && '0px',
        }}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
      />

      {/* clear */}
      {clearable && value?.length > 0 && (
        <Box style={{ position: 'absolute', right: '7px', top: '8px' }}>
          <icons.close color={iconColors.grey} />
        </Box>
      )}
    </FlexBox>
  );
};

export const SearchInputField = (
  props: {
    fromRegisterComponent: boolean;
    label?: string;
    labelColor?: any;
    placeholder: any;
    onChange?: any;
    value: string;
  } & any,
): JSX.Element => {
  return (
    <FlexBox.Column
      fullWidth
      style={{
        height: props.fromRegisterComponent ? '50px' : '100px',
        marginTop: '-10px',
      }}
    >
      <FlexBox alignItems="center" fullWidth style={{ position: 'relative' }}>
        <LinkBox
          style={{ position: 'absolute', left: '7px', top: '35px' }}
          onClick={() => {}}
        >
          <icons.search
            style={{ position: 'relative', top: '-27px' }}
            color={iconColors.grey}
          />
        </LinkBox>
        <TextInput
          // type="search"
          {...props}
          style={{
            paddingLeft: '40px',
            paddingRight: '35px',
            backgroundColor: props.disabled && '#E9EAEC',
            borderWidth: props.disabled && '0px',
          }}
          value={props.value}
          onChangeText={props.onChange}
          placeholder={props.placeholder}
        />
        {props?.value?.length > 0 && (
          <LinkBox
            style={{ position: 'absolute', right: '7px', top: '35px' }}
            onClick={() => props.onChange('')}
          >
            <icons.close
              style={{ position: 'relative', top: '-27px' }}
              color={iconColors.grey}
            />
          </LinkBox>
        )}
        {/* <InputWithLabel
          name={props.name}
          label={props.label}
          labelColor={props.labelColor}
          InputComponent={
            <TextInput
              type="search"
              {...props}
              style={{ paddingLeft: '40px' }}
              value={props.value}
              onChangeText={props.onChange}
              placeholder={props.placeholder}
            />
          }
        /> */}
      </FlexBox>
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
            style={{ position: 'absolute', right: '10px', top: '36px' }}
            onClick={(event: any) => {
              if (!event) return null;
              setShowPassword(!showPassword);
            }}
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

export const Tag = ({
  text,
  onRemove,
}: {
  text: string;
  onRemove?: () => void;
}): JSX.Element => (
  <FlexBox
    backgroundColor="#F4F4F4"
    marginRight="sm"
    style={{ borderRadius: '10px', padding: '4px 9px 4px 9px' }}
    flexDirection="row"
    alignItems="center"
  >
    <Paragraph
      style={{
        fontSize: '14px',
        color: '#828282',
        marginRight: onRemove && '6px',
      }}
    >
      {text}
    </Paragraph>

    {onRemove && (
      <Box padding="xs" onClick={onRemove} style={{ cursor: 'pointer' }}>
        <icons.closeWithoutBorder color={iconColors.darkGrey} size="xs" />
      </Box>
    )}
  </FlexBox>
);

export const TagsInputField = ({
  value,
  onChangeText,
  tags,
  onChangeTags,
  placeholder,
  label = 'Tags',
  helperText = 'Add tags',
}: {
  value: string;
  onChangeText: (s: string) => void;
  tags: string[];
  onChangeTags: (t: string[]) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
}): JSX.Element => (
  <Box style={{ marginTop: '16px', marginBottom: '16px' }}>
    {/* label and helper text */}
    <FlexBox style={{ alignItems: 'center', marginBottom: '8px' }}>
      {label && (
        <Paragraph style={{ fontSize: '14px', marginRight: '4px' }}>
          {label}
        </Paragraph>
      )}
      {helperText && (
        <icons.info color={iconColors.darkGrey} title={helperText} size="xs" />
      )}
    </FlexBox>

    {/* input */}
    <Box style={{ position: 'relative' }}>
      <TextInput
        style={{ paddingRight: '88px' }}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            if (!tags.includes(value)) onChangeTags([...tags, value]);
            onChangeText('');
          }
        }}
      />

      {/* Enter and icon */}
      <FlexBox
        style={{
          position: 'absolute',
          right: '7px',
          top: '8px',
          opacity: 0.3,
          alignItems: 'center',
        }}
        flexDirection="row"
      >
        <Paragraph style={{ marginRight: '8px' }}>Enter</Paragraph>
        <icons.keyboardReturn color={iconColors.black} />
      </FlexBox>
    </Box>

    {/* tags */}
    <Box marginTop="md">
      <Paragraph style={{ fontSize: '14px', color: '#A1A4AB' }}>Tags</Paragraph>

      <FlexBox marginTop="sm">
        {tags.map((t) => (
          <Tag
            key={t}
            text={t}
            onRemove={() => onChangeTags(tags.filter((tag) => tag !== t))}
          />
        ))}
      </FlexBox>
    </Box>
  </Box>
);

export const CheckboxInput = ({
  label,
  value,
  setValue,
}: {
  label: string;
  value: boolean;
  setValue: (b: boolean) => void;
}): JSX.Element => (
  <FlexBox flexDirection="row">
    {/* checkbox */}
    <div
      role="checkbox"
      aria-checked={value}
      tabIndex={0}
      onClick={() => setValue(!value)}
      onKeyPress={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          setValue(!value);
          e.preventDefault();
        }
      }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '18px',
        height: '18px',
        borderRadius: '0.25rem',
        border: `2px solid ${value ? '#443E99' : '#A7A7A7'}`,
        cursor: 'pointer',
        background: value ? '#443E99' : 'white',
        marginRight: '12px',
        flexShrink: 0,
        flexGrow: 0,
      }}
    >
      {value && <icons.checkbox color={iconColors.white} size="md" />}
    </div>

    {/* label */}
    <div
      tabIndex={0}
      onClick={() => setValue(!value)}
      style={{ cursor: 'pointer' }}
    >
      <Paragraph>{label}</Paragraph>
    </div>
  </FlexBox>
);

export const ValidatedTextField = ({
  label,
  value,
  onChange,
  status,
  placeholder,
  helperText = label,
}: {
  label: string;
  value: string;
  onChange?: any;
  status:
    | { status: 'disabled' }
    | { status: 'editing' }
    | { status: 'error'; message: string }
    | { status: 'success' };
  placeholder?: string;
  helperText?: string;
}): JSX.Element => (
  <>
    <InputWithLabel
      label={label}
      helperText={helperText}
      InputComponent={
        <Box style={{ position: 'relative' }}>
          <TextInput
            style={{ paddingRight: status.status === 'success' ? '35px' : 0 }}
            placeholder={placeholder}
            hasError={status.status === 'error'}
            value={value}
            onChangeText={onChange}
          />

          {status.status === 'success' && (
            <Box style={{ position: 'absolute', right: '7px', top: '8px' }}>
              <icons.checkCircleFilled color={iconColors.green} />
            </Box>
          )}
        </Box>
      }
    />

    {status.status === 'error' && (
      <FormValidationError hasError={true} text={status.message} />
    )}
  </>
);
