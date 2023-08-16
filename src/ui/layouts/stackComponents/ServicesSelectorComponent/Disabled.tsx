import React from 'react';
import styles from './index.module.scss';
import { FlexBox, Box, Paragraph, Spinner } from '../../../components';
import { ID_MAX_LENGTH } from '../../../../constants';
import { truncate } from '../../../../utils';

type ServicesSelector = {
  fetching?: boolean;
  connector?: any;
  connectorResourceId?: any;
  serviceConnectorResources?: any;
};

const Index: React.FC<ServicesSelector> = ({
  fetching,
  connector,
  connectorResourceId,
  serviceConnectorResources,
}) => {
  const resourceTypeImage = serviceConnectorResources?.filter(
    (e: any) => e.id === connector,
  );

  return (
    <Box>
      <Paragraph size="body" style={{ color: '#000' }}>
        <label htmlFor="key">{'Connect to resource'}</label>
      </Paragraph>
      <Box
        marginTop="sm"
        className={styles.service_selector}
        style={{
          justifyContent: 'start',
          backgroundColor: 'rgba(168, 168, 168, 0.05)',
          borderWidth: '0px',
        }}
      >
        {connector ? (
          <FlexBox className={styles.service_selector_selected}>
            <Box marginRight="sm"></Box>
            {!fetching && (
              <Paragraph>
                <img
                  className={styles.service_selector_image}
                  src={resourceTypeImage[0]?.connector_type?.logo_url}
                  alt={resourceTypeImage[0]?.connector_type?.name}
                />{' '}
                &#91;{' '}
                {truncate(connector, ID_MAX_LENGTH) +
                  '-' +
                  resourceTypeImage[0]?.name}
                &#93; {connectorResourceId}
              </Paragraph>
            )}
          </FlexBox>
        ) : (
          <Box>
            <Paragraph>{'<not connected>'}</Paragraph>
          </Box>
        )}

        <FlexBox style={{ marginLeft: 'auto' }}>
          {fetching && <Spinner color={'black'} size={'xs'} />}
        </FlexBox>
      </Box>
    </Box>
  );
};

export default Index;
