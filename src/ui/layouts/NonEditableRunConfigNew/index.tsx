import React from 'react';
import { Box, FlexBox, Paragraph, icons } from '../../components';
import styles from './index.module.scss';
import { titleCase } from '../../../utils';
import { ToggleField } from '../common/FormElement';
import JSONPretty from 'react-json-pretty';
import { useDispatch } from '../../hooks';
import { showToasterAction } from '../../../redux/actions';
import { iconColors, iconSizes, toasterTypes } from '../../../constants';

export const NonEditableRunConfig: React.FC<{ runConfiguration: any }> = ({
  runConfiguration,
}) => {
  const dispatch = useDispatch();
  const getFormElement: any = (elementName: any, elementSchema: any) => {
    if (typeof elementSchema === 'object' && elementSchema !== null) {
      const handleCopy = () => {
        navigator.clipboard.writeText(JSON.stringify(elementSchema));

        dispatch(
          showToasterAction({
            description: 'Config copied to clipboard',
            type: toasterTypes.success,
          }),
        );
      };
      return (
        <Box marginTop="lg" style={{ width: '90%', overflowY: 'hidden' }}>
          <Paragraph size="body" style={{ color: 'black' }}>
            <label htmlFor={elementName}>{titleCase(elementName)}</label>
          </Paragraph>
          <Box marginTop={'sm'} padding={'md'} className={styles.JSONPretty}>
            <icons.copy
              className={styles.copy}
              onClick={handleCopy}
              color={iconColors.black}
              size={iconSizes.sm}
            />
            <JSONPretty
              style={{
                fontSize: '16px',
                fontFamily: 'Rubik',
              }}
              data={elementSchema}
            ></JSONPretty>
          </Box>
        </Box>
      );
    }

    if (typeof elementSchema === 'boolean' || elementSchema === null) {
      return (
        <Box marginTop={'lg'} style={{ width: '90%' }}>
          <ToggleField
            value={elementSchema}
            onHandleChange={() => {}}
            label={titleCase(elementName)}
            disabled={true}
          />
        </Box>
      );
    }
  };

  return (
    <FlexBox.Column marginLeft="md">
      {Object.keys(runConfiguration).map((key, ind) => (
        <>{getFormElement(key, runConfiguration[key])}</>
      ))}
    </FlexBox.Column>
  );
};
