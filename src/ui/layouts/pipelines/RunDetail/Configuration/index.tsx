import React from 'react';

// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {
  // Box,
  FlexBox,
  //  H4, GhostButton, icons
} from '../../../../components';

// import { useDispatch } from '../../../../hooks';
// import { showToasterAction } from '../../../../../redux/actions';
// import { toasterTypes } from '../../../../../constants';
// import { iconColors, iconSizes } from '../../../../../constants';

// import styles from './index.module.scss';
import { useService } from './useService';
import { NonEditableRunConfig } from '../../../NonEditableRunConfig';

export const Configuration: React.FC<{ runId: TId }> = ({ runId }) => {
  const { run } = useService({ runId });
  // const [hover, setHover] = useState(false);
  // const dispatch = useDispatch();
  // const handleCopy = () => {
  //   navigator.clipboard.writeText(pipelineConfig);
  //   dispatch(
  //     showToasterAction({
  //       description: 'Config copied to clipboard',
  //       type: toasterTypes.success,
  //     }),
  //   );
  // };

  return (
    <FlexBox.Column fullWidth>
      <NonEditableRunConfig
        runConfiguration={run.pipelineConfiguration}
      ></NonEditableRunConfig>
      {/* <FlexBox
        marginBottom="md"
        alignItems="center"
        justifyContent="space-between"
      >
        <H4 bold>YAML Configuration</H4>
        <Box>
          <GhostButton
            style={{ marginRight: '10px' }}
            onClick={downloadYamlFile}
          >
            Download
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
      </FlexBox>
      <FlexBox className={styles.code}>
        <SyntaxHighlighter
          customStyle={{ width: '100%' }}
          wrapLines={true}
          language="yaml"
          style={okaidia}
        >
          {pipelineConfig}
        </SyntaxHighlighter>
      </FlexBox> */}
    </FlexBox.Column>
  );
};
