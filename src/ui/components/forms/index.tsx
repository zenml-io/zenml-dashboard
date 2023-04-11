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
  InputWithLabelIcon,
} from '..';
import { handleUpdateNumericInput } from '../../../utils/input';
import { iconColors } from '../../../constants/icons';
import ReactTooltip from 'react-tooltip';

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
            style={{ position: 'absolute', right: '10px', top: '40px' }}
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
              fontFamily: 'Rubik',
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

export const MakeSecretField = (
  props: {
    label: string;
    labelColor: any;
    placeholder: any;
    value: string;
    onChange?: any;
    secretOnChange?: any;
    handleClick?: any;
    dropdownOptions?: Array<any>;
    tooltipText?: string;
  } & any,
): any => {

  const options = props?.dropdownOptions?.filter((e: any) =>
    e?.label?.toLowerCase().includes(props?.value?.toLowerCase()),
  );

  // useEffect(() => {
  //   if (props?.value?.slice(0, 2) === '{{' && props?.value?.length < 3) {
  //     setPopup(true);
  //   } 
  //   // eslint-disable-next-line
  // }, [props?.value]);

  const handleClick = async (option: any) => {
   await props.secretOnChange(option);
  //  await setPopup(false);
  };

  return (
    <FlexBox.Column fullWidth>
      <FlexBox alignItems="center" fullWidth style={{ position: 'relative' }}>
        <InputWithLabelIcon
          name={props.name}
          label={props.label}
          labelColor={props.labelColor}
          tooltipText={props.tooltipText}
          InputComponent={
            <TextInput
              {...props}
              style={{ border: '1px solid #C9CBD0' }}
              value={props.value}
              placeholder={props.placeholder}
              onChangeText={props.onChange}
            />
          }
        />

        {props?.value?.length > 0 && props?.value?.slice(0, 2) !== '{{' && (
          <Box
            style={{
              position: 'absolute',
              right: '10px',
              top: '40px',
              display: 'flex',
              alignItems: 'center',
              background: '#fff',
              borderLeft: '1px solid grey',
              paddingLeft: '10px',
              cursor: 'pointer',
            }}
            onClick={() => props.handleClick()}
          >
            <icons.lock
              color={iconColors.primary}
              style={{ marginRight: '5px' }}
            />
            <Paragraph color="primary">Make it Secret</Paragraph>
          </Box>
        )}
          
        <If condition={props?.value?.slice(0, 2) === '{{' && props?.value?.slice(-2) !== '}}' && props?.dropdownOptions?.length > 0}>
          {() => (
          <Box
            style={{
              backgroundColor: '#fff',
              borderRadius: '4px',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
              width: '100%',
              position: 'absolute',
              zIndex: 2,
              top: '7rem',
            }}
          >
              <Box
                marginVertical="sm"
                marginHorizontal="md"
                style={{ width: '100%', height: '100%' }}
              >
                {options?.map((option: any, index: number) => (
                  <Box marginTop="md" onClick={() => {}} key={index}>
                    <div
                      data-tip
                      data-for={option.name}
                      onClick={() => handleClick(option)}
                      style={{ cursor: 'pointer' }}
                    >
                      <Paragraph>{option.label}</Paragraph>
                    </div>

                    <ReactTooltip id={option.label} place="top" effect="solid">
                      <Paragraph color="white">{option.label}</Paragraph>
                    </ReactTooltip>
                  </Box>
                ))}
              </Box>
          </Box>
          )}
         </If>
      </FlexBox>

      {/* {props?.value?.length > 0 && 
        props?.value?.slice(0, 2) !== '{{' && (
          <FlexBox marginTop='lg' alignItems="center" fullWidth style={{ position: 'relative' }}>
            <InputWithLabel
              name={props.name}
              label={props.secretLabel}
              labelColor={props.secretLabelColor}
              InputComponent={ <TextInput {...props} style={{ border: '1px solid #C9CBD0' }} value={props.secretValue} placeholder={props.secretPlaceholder} onChangeText={props.secretOnChange} />}
            />
            <Box
              style={{ 
                position: 'absolute', right: '10px', top: '40px', 
                display: 'flex', alignItems: 'center', 
                background: '#fff', borderLeft: '1px solid grey', 
                paddingLeft: '10px', cursor: 'pointer'
              }}
              onClick={handleClick}
            >
              <icons.lock color={iconColors.primary} style={{ marginRight: '5px' }} /> 
              <Paragraph color='primary'>Make it Secret</Paragraph>
            </Box>
          </FlexBox>
        )} */}
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
            <icons.pen color={iconColors.black} />
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
        {console.log(disabled, 'disableddisabled')}
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
              value={disabled ? props?.defaultValue : props.value}
              placeholder={props.placeholder}
              disabled={disabled}
              autoFocus={!disabled}
              onRemoveFocus={(e: any) => {
                setTimeout(() => {
                  if (disabled === false) setDisabled(true);
                }, 200);
              }}
            />
          }
        />
        {/* {console.log(props?.defaultValue , props.value , 'disableddisabled')} */}
        {!props.disabled && (
          <Box
            onClick={() => {
              setDisabled(!disabled);
              // setTimeout(() => {
              // props.inputRef?.current?.focus();
              // }, 1000);
            }}
            style={{
              position: 'absolute',
              right: '10px',
              top: '35px',
              cursor: 'pointer',
            }}
          >
            <icons.pen color={disabled ? iconColors.black : iconColors.grey} />
          </Box>
        )}
      </FlexBox>
    </FlexBox.Column>
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
