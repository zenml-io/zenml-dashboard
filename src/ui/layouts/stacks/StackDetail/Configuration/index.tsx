import React, { useState } from 'react';

// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {
  FlexBox,
  Box,
  // H4,
  // GhostButton,
  // icons,
  Row,
  FullWidthSpinner,
  // Container,
  EditField,
  Paragraph,
} from '../../../../components';
// import { iconColors, iconSizes } from '../../../../../constants';

// import { useDispatch } from '../../../../hooks';
// import { showToasterAction } from '../../../../../redux/actions';
// import { toasterTypes } from '../../../../../constants';

// import { translate } from '../translate';

import styles from './index.module.scss';
import { useService } from './useService';
import { StackBox } from '../../../common/StackBox';
import { SidePopup } from '../../CreateStack/ListForAll/SidePopup';
import { NonEditableConfig } from '../../../NonEditableConfig';
// import { SidePopup } from '../../../common/SidePopup';

export const Configuration: React.FC<{
  stackId: TId;
  tiles?: any;
  fetching?: boolean;
}> = ({ stackId, tiles, fetching = false }) => {
  // const dispatch = useDispatch();
  const { stack } = useService({ stackId });
  // const [hover, setHover] = useState(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [selectedStackBox, setSelectedStackBox] = useState<any>();
  // const handleCopy = () => {
  //   navigator.clipboard.writeText(stackConfig);
  //   dispatch(
  //     showToasterAction({
  //       description: 'Config copied to clipboard',
  //       type: toasterTypes.success,
  //     }),
  //   );
  // };
  if (fetching) {
    return <FullWidthSpinner color="black" size="md" />;
  }

  return (
    <FlexBox.Column fullWidth>
      {/* <FlexBox
        marginBottom="md"
        alignItems="center"
        justifyContent="space-between"
      >
        <H4 bold>{translate('configuration.title.text')}</H4>
        <Box>
          <GhostButton
            style={{ marginRight: '10px' }}
            onClick={downloadYamlFile}
          >
            {translate('configuration.button.text')}
          </GhostButton>
          <GhostButton
            onMouseEnter={() => {
              setHover(true);
            }}
            onMouseLeave={() => {
              setHover(false);
            }}
            onClick={handleCopy}
          >
            <icons.copy
              color={hover ? iconColors.white : iconColors.black}
              size={iconSizes.sm}
            />
          </GhostButton>
        </Box>
      </FlexBox> */}
      <FlexBox.Row marginLeft="md" marginTop="lg">
        {/* <Container> */}
        <Box style={{ width: '30%' }}>
          <EditField
            disabled
            onChangeText={() => console.log('')}
            label={'Stack Name'}
            optional={false}
            value={stack.name}
            placeholder=""
            hasError={false}
            className={styles.field}
          />
        </Box>
        <FlexBox
          marginLeft="xxl2"
          justifyContent="space-between"
          style={{ width: '20%' }}
        >
          <Paragraph>Share Component with public</Paragraph>

          <label className={styles.switch}>
            <input type="checkbox" checked={stack.isShared} />
            <span className={`${styles.slider} ${styles.round}`}></span>
          </label>
        </FlexBox>
        {/* </Container> */}
      </FlexBox.Row>
      <Box margin="md">
        <Row>
          {tiles &&
            tiles.map((tile: any, index: number) => (
              <Box
                key={index}
                className={styles.tile}
                marginTop="md"
                marginLeft="md"
                onClick={() => {
                  setShowPopup(true);
                  setSelectedStackBox(tile);
                }}
              >
                <StackBox
                  image={tile.logo}
                  stackName={tile.name}
                  stackDesc={tile.type}
                />
              </Box>
            ))}
        </Row>
      </Box>
      {/* <FlexBox className={styles.code}>
        <SyntaxHighlighter
          customStyle={{ width: '100%' }}
          wrapLines={true}
          language="yaml"
          style={okaidia}
        >
          {stackConfig}
        </SyntaxHighlighter>
      </FlexBox> */}

      {showPopup && (
        <SidePopup
          // registerStack={() => {
          //   onCreateStack();
          // }}
          isCreate={false}
          onSeeExisting={() => {}}
          onClose={() => {
            setShowPopup(false);
            setSelectedStackBox(null);
          }}
        >
          <Box marginTop="md" paddingBottom={'xxxl'}>
            <NonEditableConfig details={selectedStackBox}></NonEditableConfig>
          </Box>
        </SidePopup>
      )}
    </FlexBox.Column>
  );
};
