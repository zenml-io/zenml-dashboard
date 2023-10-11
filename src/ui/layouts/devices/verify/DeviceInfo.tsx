import React from 'react';
import styles from './index.module.scss';
import { Device } from '../../../../api/types';
import {
  CheckboxInput,
  H3,
  Paragraph,
  PrimaryButton,
} from '../../../components';

type DeviceInfoProps = {
  deviceInfo: Device | null;
  isTrusted: boolean;
  disabled: boolean;
  setIsTrusted: (value: boolean) => void;
  submitHandler: (event: React.FormEvent<HTMLFormElement>) => void;
};

export function DeviceInfo({
  deviceInfo,
  disabled,
  isTrusted,
  setIsTrusted,
  submitHandler,
}: DeviceInfoProps) {
  return (
    <>
      {' '}
      <div>
        <H3 className={styles.contentBox__heading}>Authorize a new device</H3>
        <Paragraph className={styles.contentBox__subHeading}>
          You are logging in from a new device.
        </Paragraph>
      </div>
      <div className={styles.infoBox}>
        <dl>
          <div className={styles.infoBox__keyValuePair}>
            <dt className={styles.infoBox__keyValuePair__key}>IP Address</dt>
            <dd>{deviceInfo?.ip_address}</dd>
          </div>
          {deviceInfo?.city && deviceInfo?.country && (
            <div className={styles.infoBox__keyValuePair}>
              <dt className={styles.infoBox__keyValuePair__key}>Location</dt>
              <dd>
                {deviceInfo?.city}, {deviceInfo?.country}
              </dd>
            </div>
          )}
          <div className={styles.infoBox__keyValuePair}>
            <dt className={styles.infoBox__keyValuePair__key}>Hostname</dt>
            <dd>{deviceInfo?.hostname}</dd>
          </div>
        </dl>
      </div>
      <form onSubmit={submitHandler} className={styles.form}>
        <CheckboxInput
          label={
            <div>
              <p>Trust this device</p>
              <p className={styles.form__subLabel}>
                We won’t ask you again soon on this device.
              </p>
            </div>
          }
          value={isTrusted}
          setValue={setIsTrusted}
        />

        <PrimaryButton
          disabled={disabled}
          type="submit"
          className={styles.form__button}
        >
          Authorize this device
        </PrimaryButton>
      </form>
    </>
  );
}
