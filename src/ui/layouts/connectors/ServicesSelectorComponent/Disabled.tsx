import React from 'react';
import styles from './index.module.scss';
import { FlexBox, Box, Paragraph, icons } from '../../../components';
import { iconColors } from '../../../../constants';

const Index: React.FC<any> = ({ data }) => {
  const resourceType = data?.connectorType?.resource_types?.filter(
    (e: any) => e.resource_type === data?.resourceTypes[0],
  );

  return (
    <Box>
      <Box paddingBottom="sm">
        <Paragraph size="body" style={{ color: 'black' }}>
          <label style={{ display: 'flex', flexDirection: 'row' }}>
            Connect to resource
            <span style={{ color: '#C8C8C8', marginLeft: '4px' }}>
              (Optional)
            </span>
            <span style={{ marginLeft: '8px' }}>
              <icons.info color={iconColors.darkGrey} size="xs" />
            </span>
          </label>
        </Paragraph>
      </Box>

      <Box
        className={styles.service_selector}
        style={{
          justifyContent: 'start',
          backgroundColor: 'rgba(168, 168, 168, 0.05)',
          borderWidth: '0px',
          cursor: 'auto',
        }}
      >
        {resourceType?.map((e: any) => (
          <FlexBox className={styles.service_selector_selected}>
            <Box marginRight="sm">
              <img
                className={styles.service_selector_image}
                src={e?.logo_url}
                alt={e?.name}
              />
            </Box>
            <Paragraph>
              {e?.name}-
              {data?.resourceId === null ? (
                <>&#91;all&#93;</>
              ) : (
                <>&#91;{data?.resourceId}&#93;</>
              )}
            </Paragraph>
          </FlexBox>
        ))}
      </Box>
    </Box>
  );
};

export default Index;
