import React, { useState } from 'react';
import { Box, FlexBox, Paragraph } from '../../../components';
import ReactTooltip from 'react-tooltip';
import styles from './index.module.scss';

export const CustomConnectorBox: React.FC<{
  connectorName: string;
  connectorDesc: string;
  logoUrl: string;
  onSelectConnectorType: any;
  resourceTypes?: any;
}> = ({
  connectorName,
  connectorDesc,
  logoUrl,
  onSelectConnectorType,
  resourceTypes,
}) => {
  const [select, setSelect] = useState(false);
  const titleCase = (s: any) =>
    s.replace(/^_*(.)|_+(.)/g, (s: any, c: string, d: string) =>
      c ? c.toUpperCase() : ' ' + d.toUpperCase(),
    );
  return (
    <Box
      paddingHorizontal="sm2"
      paddingVertical="sm2"
      className={styles.customConnectorBox}
      onMouseEnter={() => setSelect(true)}
      onMouseLeave={() => setSelect(false)}
      style={{ background: select ? '#443E99' : '#fff' }}
      onClick={onSelectConnectorType}
    >
      <Box className={styles.imageContainer}>
        <img src={logoUrl} alt="imageAddIcon" />
      </Box>

      <Box style={{ marginTop: '12px' }}>
        <Paragraph
          className={styles.connectorName}
          style={{ color: select ? '#fff' : '#443E99' }}
        >
          {titleCase(connectorName)}
        </Paragraph>
      </Box>

      <Box marginTop="sm2">
        <Paragraph
          className={styles.connectorDesc}
          style={{ color: select ? '#D8C6FC' : '#A8A8A8' }}
        >
          {connectorDesc.length < 35
            ? `${connectorDesc}`
            : `${connectorDesc.substring(0, 30)}...`}
        </Paragraph>
      </Box>

      <Box marginTop="sm2">
        <FlexBox.Row>
          {resourceTypes?.map((e: any) => (
            <Box marginLeft="sm" className={styles.resourceImages}>
              <div data-tip data-for={e?.name}>
                <img src={e?.logo_url} alt={e?.name} />
              </div>
              <ReactTooltip id={e?.name} place="top" effect="solid">
                <Paragraph color="white">{e?.name}</Paragraph>
              </ReactTooltip>
            </Box>
          ))}
        </FlexBox.Row>
      </Box>
    </Box>
  );
};
