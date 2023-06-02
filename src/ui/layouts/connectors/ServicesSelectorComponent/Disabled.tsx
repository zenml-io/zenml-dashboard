import React from 'react';
import styles from './index.module.scss';
import { FlexBox, Box, Paragraph } from '../../../components';

const Index: React.FC<any> = ({ data }) => {
  // const dat = data?.connectorType?.resource_types?.filter(
  //   (e: any, index: number) => {
  //     if (e.resource_type === data?.resourceTypes[index]) {
  //       return e;
  //     }

  //     console.log(
  //       e.resource_type,
  //       data?.resourceTypes[index],
  //       index,
  //       '123123123123sdsdwdwdwd',
  //     );
  //   },
  // );

  const resourceType = data?.connectorType?.resource_types?.filter(
    (e: any) => e.resource_type === data?.resourceTypes[0],
  );

  return (
    <Box>
      <Box
        className={styles.service_selector}
        style={{ justifyContent: 'start' }}
      >
        {resourceType?.map((e: any) => (
          <FlexBox marginLeft="sm" className={styles.service_selector_selected}>
            <Box marginRight="sm">
              <img src={e?.logo_url} alt={e?.name} />
            </Box>
            <Paragraph>
              {e?.name}-<>&#91;all&#93;</>
              {/* {data?.resourceId?.length === 0 || data?.resourceId === null ? (
                <>&#91;all&#93;</>
              ) : (
                data?.resourceId?.map((e: string) => <>&#91;{e}&#93; </>)
              )} */}
            </Paragraph>
          </FlexBox>
        ))}

        {/* {data?.resourceTypes?.map((e: any) => (
          <FlexBox marginLeft="sm" className={styles.service_selector_selected}>
            <Paragraph>{e}</Paragraph>
          </FlexBox>
        ))} */}

        {/* {dat?.map((e: any) => (
          <FlexBox className={styles.service_selector_selected}>
            <Box marginRight="sm">
              <img src={e?.logo_url} alt={e?.name} />
            </Box>
            <Paragraph>{e?.name}</Paragraph>
          </FlexBox>
        ))} */}
      </Box>
    </Box>
  );
};

export default Index;
