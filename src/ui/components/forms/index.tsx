import React, { ReactNode, useEffect, useRef, useState } from 'react';
import {
  FlexBox,
  InputWithLabel,
  TextInput,
  TextAreaInput,
  If,
  Paragraph,
  PasswordInput,
  EmailInput,
  Box,
  LinkBox,
  icons,
  DropdownInput,
  InputWithLabelIcon,
  Spinner,
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
  onHandleFocus?: (s: string) => void;
  label: string;
  labelColor?: any;
  placeholder: string;
  value: string;
  onChange?: (s: string) => void;
  error?: FieldError;
  disabled?: boolean;
  type?: string;
  optional?: boolean;
  required?: boolean;
  name?: string;
  style?: any;
  onRemoveFocus?: any;
}): JSX.Element => (
  <FlexBox.Column fullWidth>
    <FlexBox alignItems="center" fullWidth>
      <InputWithLabel
        optional={props.optional}
        required={props.required}
        name={props.name}
        label={props.label}
        labelColor={props.labelColor}
        InputComponent={
          <TextInput
            {...props}
            style={{
              backgroundColor: props.disabled && 'rgba(168, 168, 168, 0.1)',
              borderWidth: props.disabled && '0px',
              ...props.style,
            }}
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
  onChange: (s: string) => void;
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
            style={{
              backgroundColor: props.disabled && 'rgba(168, 168, 168, 0.07)',
              borderWidth: props.disabled && '0px',
              ...props.style,
            }}
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
                  background: 'rgba(168, 168, 168, 0.1)',
                  border: '1px solid #A8A8A8',
                }}
                value={`${props.value.slice(0, 33)}`}
                placeholder={props.placeholder}
              />
            ) : (
              <TextInput
                {...props}
                style={{
                  background: 'rgba(168, 168, 168, 0.1)',
                  border: '1px solid #A8A8A8',
                }}
                value="Token"
                placeholder={props.placeholder}
              />
            )
          }
        />

        {props.showTokField && (
          <LinkBox
            style={{ position: 'absolute', right: '10px', top: '35px' }}
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
    required: any;
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
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === 'ArrowUp' && selectedOptionIndex > 0) {
        setSelectedOptionIndex((prevIndex) => prevIndex - 1);
        event.preventDefault();
        event.stopPropagation();
      } else if (
        event.key === 'ArrowDown' &&
        selectedOptionIndex < options.length - 1
      ) {
        setSelectedOptionIndex((prevIndex) => prevIndex + 1);
        event.preventDefault();
        event.stopPropagation();
      } else if (event.key === 'Enter') {
        handleEnterKey();
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('keydown', handleKeyDown);
      container.style.overflowY = 'hidden';

      // Scroll the selected option into view
      const selectedOption = container.querySelector(
        `[data-index="${selectedOptionIndex}"]`,
      );
      if (selectedOption) {
        selectedOption.scrollIntoView({ block: 'nearest' });
      }

      return () => {
        container.removeEventListener('keydown', handleKeyDown);
      };
    }
    // eslint-disable-next-line
  }, [selectedOptionIndex, options]);

  const handleClick = async (option: any) => {
    await props.secretOnChange(option);
  };
  const handleEnterKey = async () => {
    const selectedOption = options[selectedOptionIndex];
    // Do something with the selectedOption
    await props.secretOnChange(selectedOption);
    setTimeout(() => {
      containerRef.current?.focus();
    }, 800);
    setSelectedOptionIndex(0);
  };

  return (
    <FlexBox.Column fullWidth>
      <FlexBox
        onKeyDown={(event) => {
          if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            setSelectedOptionIndex(0);
            containerRef.current?.focus();
          }
        }}
        alignItems="center"
        fullWidth
        style={{ position: 'relative' }}
      >
        <InputWithLabelIcon
          required={props.required}
          name={props.name}
          label={props.label}
          labelColor={props.labelColor}
          tooltipText={props.tooltipText}
          InputComponent={
            <TextInput
              {...props}
              style={{ border: '1px solid #A8A8A8' }}
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
              top: '35px',
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

        <If
          condition={
            props?.value?.slice(0, 2) === '{{' &&
            props?.value?.slice(-2) !== '}}' &&
            props?.dropdownOptions?.length > 0
          }
        >
          {() => (
            <div
              style={{
                border: '0px solid black',
                backgroundColor: '#fff',
                borderRadius: '4px',

                width: '100%',
                height: '185px',
                overflowY: 'auto',
                overflowX: 'hidden',
                position: 'absolute',
                zIndex: 2,
                top: '7rem',
              }}
              onClick={(event) => event.stopPropagation()}
              tabIndex={0}
              ref={containerRef}
            >
              <Box
                marginVertical="md"
                style={{ width: '100%', height: '100%' }}
              >
                {options?.map((option: any, index: any) => (
                  <Box
                    padding={'sm'}
                    onClick={() => handleClick(option)}
                    key={index}
                    data-index={index}
                    style={{
                      backgroundColor:
                        index === selectedOptionIndex
                          ? 'lightgray'
                          : 'transparent',
                      cursor: 'pointer',
                    }}
                  >
                    <div data-tip data-for={option.name}>
                      <Paragraph>{option.label}</Paragraph>
                    </div>
                    <ReactTooltip id={option.label} place="top" effect="solid">
                      <Paragraph color="white">{option.label}</Paragraph>
                    </ReactTooltip>
                  </Box>
                ))}
              </Box>
            </div>
          )}
        </If>
      </FlexBox>
    </FlexBox.Column>
  );
};

export const EditField = (
  props: {
    filteredSecretId?: string;
    label: string;
    labelColor: any;
    placeholder: any;
    value: string;
    defaultValue?: string;
    optional: boolean;
    viewSecretDetail?: any;
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
            <>
              {props.filteredSecretId ? (
                <Box
                  paddingLeft="md"
                  style={{
                    height: '40px',
                    width: '30vw',
                    backgroundColor:
                      props.disabled && 'rgba(168, 168, 168, 0.1)',
                    borderWidth: props.disabled && '0px',
                    borderRadius: '4px',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    display: 'flex',
                  }}
                >
                  <Paragraph
                    onClick={() => props.viewSecretDetail()}
                    style={{
                      cursor: 'pointer',
                      textAlign: 'center',
                      fontSize: '16px',
                      color: '#22BBDD',
                      textDecorationLine: 'underline',
                    }}
                  >
                    {props.defaultValue}
                  </Paragraph>
                </Box>
              ) : (
                <TextInput
                  {...props}
                  style={{
                    backgroundColor:
                      props.disabled && 'rgba(168, 168, 168, 0.1)',
                    borderWidth: props.disabled && '0px',
                  }}
                  filteredSecretId={props.filteredSecretId}
                  defaultValue={props?.defaultValue}
                  value={props.value}
                  placeholder={props.placeholder}
                />
              )}
            </>
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
    placeholder: string;
    value: string;
    optional: boolean;
    required: boolean;
    type: 'input' | 'textarea';
  } & any,
): JSX.Element => {
  const [disabled, setDisabled] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current && !disabled) {
      inputRef.current.focus();
    }
  }, [disabled]);

  const InputComponent = props.type === 'textarea' ? TextAreaInput : TextInput;

  return (
    <FlexBox.Column fullWidth>
      <FlexBox alignItems="center" fullWidth style={{ position: 'relative' }}>
        <InputWithLabel
          name={props.name}
          label={props.label}
          optional={props.optional}
          required={props.required}
          labelColor={props.labelColor}
          InputComponent={
            <InputComponent
              {...props}
              inputRef={inputRef}
              value={props.value}
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

        {!props.disabled && (
          <Box
            onClick={() => {
              setDisabled(!disabled);
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

export const IconInputField = ({
  value,
  defaultValue,
  onChange,
  placeholder,
  clearable = true,
  disabled = false,
  iconName = 'search',
  iconColor = iconColors.grey,
}: {
  value?: string;
  defaultValue?: string;
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
        defaultValue={defaultValue}
        placeholder={placeholder}
      />

      {/* clear */}
      {clearable && value && value.length > 0 && (
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
          {...props}
          style={{
            paddingLeft: '40px',
            paddingRight: '35px',
            backgroundColor: props.disabled && 'rgba(168, 168, 168, 0.1)',
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

export const FormPasswordFieldVerify = (
  props: {
    onHandleFocus?: any;
    label: string;
    labelColor: any;
    placeholder: string;
    value: string;
    onChange: any;
    required?: boolean;
    error: FieldError;
    success?: boolean;
    loading?: boolean;
  } & any,
): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <FlexBox.Column fullWidth>
      <FlexBox alignItems="center" fullWidth style={{ position: 'relative' }}>
        <InputWithLabel
          name={props.name}
          label={props.label}
          required={props.required}
          labelColor={props.labelColor}
          InputComponent={
            !showPassword ? (
              <PasswordInput
                {...props}
                onChangeText={props.onChange}
                value={props.value}
                placeholder={props.placeholder}
                hasError={props.error.hasError}
                style={{
                  backgroundColor: props.disabled && 'rgba(168, 168, 168, 0.1)',
                  borderWidth: props.disabled && '0px',
                }}
              />
            ) : (
              <TextInput
                {...props}
                onChangeText={props.onChange}
                value={props.value}
                placeholder={props.placeholder}
                hasError={props.error.hasError}
                style={{
                  backgroundColor: props.disabled && 'rgba(168, 168, 168, 0.1)',
                  borderWidth: props.disabled && '0px',
                }}
              />
            )
          }
        />
        <LinkBox
          style={{ position: 'absolute', right: '50px', top: '36px' }}
          onClick={() => {}}
        >
          {props.loading && <Spinner color={'black'} size={'xs'} />}
          {props.success && (
            <icons.checkCircleFilled color={iconColors.green} />
          )}
        </LinkBox>

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
      </FlexBox>
      <FormValidationError
        text={props.error.text}
        hasError={props.error.hasError}
      />
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
            className="absolute right-1 top-[2.4rem]"
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
  onRemove?: (e: any) => void;
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
  getTagOptions,
  label = 'Tags',
  helperText = 'Add tags',
}: {
  value: string;
  onChangeText: (s: string) => void;
  tags: string[];
  onChangeTags: (t: string[]) => void;
  getTagOptions?: (s: string) => Promise<string[]>;
  label?: string;
  placeholder?: string;
  helperText?: string;
}): JSX.Element => {
  const [tagOptions, setTagOptions] = useState([] as string[]);

  const update = (value: string) => {
    if (!tags.includes(value)) onChangeTags([...tags, value]);
    onChangeText('');
    setTagOptions([]);
  };

  return (
    <Box
      style={{ marginTop: '16px', marginBottom: '16px', position: 'relative' }}
    >
      {/* label and helper text */}
      <FlexBox style={{ alignItems: 'center', marginBottom: '8px' }}>
        {label && (
          <Paragraph style={{ fontSize: '14px', marginRight: '4px' }}>
            {label}
          </Paragraph>
        )}
        {helperText && (
          <icons.info
            color={iconColors.darkGrey}
            title={helperText}
            size="xs"
          />
        )}
      </FlexBox>

      {/* input */}
      <Box style={{ position: 'relative' }}>
        <TextInput
          style={{ paddingRight: '88px' }}
          value={value}
          onChangeText={(t) => {
            onChangeText(t);
            if (!t) setTagOptions([]);

            if (getTagOptions) {
              getTagOptions(t).then(
                (os) =>
                  // only update if the input isn't blank (blank means reset so options aren't valid any more)
                  value && setTagOptions(os.filter((o) => !tags.includes(o))),
              );
            }
          }}
          placeholder={placeholder}
          onKeyDown={(e) => {
            if (e.key === 'Enter') update(value);
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

        {tagOptions.length > 0 && (
          <Box
            padding="md"
            backgroundColor="white"
            style={{
              position: 'absolute',
              top: '100%',
              minWidth: '200px',
              maxWidth: '400px',
              boxShadow: 'var(--cardShadow)',
            }}
          >
            {tagOptions.map((t) => (
              <Box
                key={t}
                onClick={() => update(t)}
                marginVertical="sm"
                style={{ cursor: 'pointer' }}
              >
                <Paragraph>{t}</Paragraph>
              </Box>
            ))}
          </Box>
        )}
      </Box>

      {/* tags */}
      <Box marginTop="md">
        <Paragraph style={{ fontSize: '14px', color: '#A1A4AB' }}>
          Tags
        </Paragraph>

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
};

export const CheckboxInput = ({
  label,
  value,
  setValue,
}: {
  label: string | ReactNode;
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
