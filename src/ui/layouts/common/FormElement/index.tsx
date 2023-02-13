import React, { useState } from 'react';
import { EditField, Paragraph } from '../../../components';
import styles from './index.module.scss';
export function Form(props: any) {
  return <div {...props}>{props.children}</div>;
}

export function TextField(props: any) {
  const { name, label, placeholder, onHandleChange } = props;
  const [text, setText] = useState('');

  return (
    <>
      {/* {label && <label for={name}>{label}</label>} */}
      {/* <input {...rest}></input> */}
      <EditField
        onChangeText={(e: any) => {
          setText(e);
          onHandleChange(name, e);
        }}
        label={label}
        optional={false}
        value={props.default ? props.default : text}
        hasError={false}
        // {...rest}
        // className={styles.field}
      />
      {/* <ErrorMessage name={name} render={msg => <div style={{ color: 'red' }} >{msg}</div>} /> */}
    </>
  );
}

export function ToggleField(props: any) {
  const { name, label, placeholder, onHandleChange } = props;
  const CheckBox = () => (
    <label>
      <input type="checkbox" />
      <span></span>
    </label>
  );
  console.log(props.default, 'propspropspropsprops');
  return (
    <>
      <Paragraph>{name}</Paragraph>
      <label className={styles.switch}>
        <input
          type="checkbox"
          onChange={(event) => onHandleChange(name, event.target.checked)}
        />
        <span className={`${styles.slider} ${styles.round}`}></span>
      </label>
    </>
  );
}

export function SubmitButton(props: any) {
  const { title, ...rest } = props;
  console.log(props, 'asdasdasdasd222221111');
  // const { isSubmitting } = useFormikContext();

  return (
    <button type="submit" {...rest}>
      {title}
    </button>
  );
}
