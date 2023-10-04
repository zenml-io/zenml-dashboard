import React, { PropsWithChildren, useEffect, useState } from 'react';
import styles from './index.module.scss';
import { Paragraph } from '../../../components';
import { useLocation } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { sessionSelectors } from '../../../../redux/selectors';
import { endpoints } from '../../../../api/endpoints';
import { apiUrl } from '../../../../api/apiUrl';
import { Device } from '../../../../api/types';
import { showToasterAction } from '../../../../redux/actions';
import { toasterTypes } from '../../../../constants';
import { DeviceInfo } from './DeviceInfo';
import { DeviceVerifySuccess } from './DeviceVerifySuccess';

export default function VerifyDevicesPage() {
  const dispatch = useDispatch();
  const authToken = useSelector(sessionSelectors.authenticationToken);
  const { search } = useLocation();
  const [deviceInfo, setDeviceInfo] = useState<Device | null>(null);
  const [isTrusted, setIsTrusted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const params = new URLSearchParams(search);

  const userCode = params.get('user_code');
  const deviceId = params.get('device_id');

  async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    if (!userCode || !deviceId) return;
    try {
      await axios.put(
        apiUrl(endpoints.devices.verify(deviceId)),
        {
          user_code: userCode,
          trusted_device: isTrusted,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      );
      setSuccess(true);
    } catch (error) {
      setError(true);
      //check if error is AxiosError
      dispatch(
        showToasterAction({
          description: (error as AxiosError).response?.data?.detail[1],
          type: toasterTypes.failure,
        }),
      );
    }
  }

  useEffect(() => {
    if (!userCode || !deviceId) {
      return;
    }
    const fetchDeviceDetails = async () => {
      try {
        const response = await axios.get<Device>(
          `${apiUrl(
            endpoints.devices.getDetails(deviceId),
          )}?user_code=${userCode}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          },
        );
        setDeviceInfo(response.data);
      } catch (error) {
        setError(true);
        dispatch(
          showToasterAction({
            description: (error as AxiosError).response?.data?.detail[1],
            type: toasterTypes.failure,
          }),
        );
      }
    };

    fetchDeviceDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!userCode || !deviceId) {
    return (
      <Wrapper>
        <Paragraph>Invalid request</Paragraph>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {success ? (
        <DeviceVerifySuccess />
      ) : (
        <DeviceInfo
          disabled={submitted || success || error}
          submitHandler={submitHandler}
          deviceInfo={deviceInfo}
          isTrusted={isTrusted}
          setIsTrusted={setIsTrusted}
        />
      )}
    </Wrapper>
  );
}

function Wrapper({ children }: PropsWithChildren<{}>) {
  return (
    <div className={styles.verifyContainer}>
      <div className={styles.contentBox}>{children}</div>
    </div>
  );
}
