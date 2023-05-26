import React, { useState } from 'react';
import styles from './index.module.scss';
import { FlexBox, Box, icons, Paragraph } from '../../../components';
import { iconColors, iconSizes } from '../../../../constants';

type ServicesSelector = {
  name: string;
  setName: any;
  selectMethods: Array<any>;
  setSelectMethods: any;
  data: Array<any>;
};

const Index: React.FC<ServicesSelector> = ({
  name,
  setName,
  selectMethods,
  setSelectMethods,
  data,
}) => {
  const [showServices, setShowServices] = useState(false);
  const [showMethods, setShowMethods] = useState(false);
  const [selectService, setSelectService] = useState('');

  const handleShow = (service_name: string) => {
    setName(service_name);
    setShowMethods(!showMethods);
  };

  const handleSelectMethods = (method: string) => {
    if (selectMethods?.includes(method)) {
      setSelectMethods(selectMethods?.filter((e) => e !== method));
    } else {
      setSelectMethods([...selectMethods, method]);
    }
  };

  const handleSelectService = (name: string) => {
    if (selectService === '') {
      setSelectService(name);
    } else {
      setSelectService('');
    }
  };

  return (
    <Box>
      <Box
        className={styles.service_selector}
        onClick={() => setShowServices(!showServices)}
      >
        <Box>
          {selectService ? (
            <Box className={styles.service_selector_selected}>
              <Paragraph>
                {selectService} -{' '}
                {selectMethods.length === 0 ? (
                  <>&#91;all&#93;</>
                ) : (
                  selectMethods?.map((e) => <>&#91;{e}&#93; </>)
                )}
              </Paragraph>
            </Box>
          ) : (
            <Box>
              <Paragraph>Select Resource</Paragraph>
            </Box>
          )}
        </Box>
        <Box>
          <icons.chevronDown color={iconColors.black} size={iconSizes.xs} />
        </Box>
      </Box>

      {showServices && (
        <Box className={styles.services_container}>
          {data?.map((e: any) => (
            <>
              <FlexBox className={styles.services}>
                <Box>
                  <img src={e.logo_url} alt={e.name} />
                </Box>
                <Box
                  marginLeft="sm"
                  marginRight="xl"
                  className={styles.servicesName}
                  onClick={() => handleShow(e?.name)}
                >
                  <Paragraph>{e.name}</Paragraph>
                </Box>
                <Box>
                  <input
                    type="checkbox"
                    className={styles.selectedBoxCheckbox}
                    onClick={() => handleSelectService(e?.name)}
                    disabled={selectService !== '' && selectService !== e?.name}
                  />
                </Box>
              </FlexBox>

              <Box style={{ position: 'relative' }}>
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-5px',
                    width: '5px',
                    height: '5px',
                    borderRadius: '100%',
                    backgroundColor: 'rgba(68, 62, 153, 0.3)',
                    marginLeft: '5px',
                  }}
                ></div>

                <div
                  style={{
                    borderLeft: '1px solid rgba(68, 62, 153, 0.3)',
                    marginLeft: '7px',
                  }}
                >
                  {showMethods &&
                    e?.name === name &&
                    e?.auth_methods?.map((method: any) => (
                      <FlexBox marginVertical="md">
                        <div
                          style={{
                            marginTop: '10px',
                            width: '50px',
                            borderTop: '1px solid rgba(68, 62, 153, 0.3)',
                          }}
                        ></div>
                        <div
                          style={{
                            marginTop: '3px',
                            marginRight: '5px',
                            marginLeft: '-2px',
                            color: 'rgba(68, 62, 153, 0.3)',
                          }}
                        >
                          &#x27A4;
                        </div>

                        <Box marginLeft="sm" marginRight="xl">
                          <Paragraph>{method}</Paragraph>
                        </Box>
                        <Box>
                          <input
                            type="checkbox"
                            className={styles.selectedBoxCheckbox}
                            onClick={() => handleSelectMethods(method)}
                            disabled={
                              selectService !== '' && selectService !== e?.name
                            }
                          />
                        </Box>
                      </FlexBox>
                    ))}
                </div>
              </Box>
            </>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Index;
