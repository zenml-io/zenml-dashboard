import React from 'react';
import { Box, EditField, Paragraph } from '../../components';
import styles from './index.module.scss';
import { titleCase } from '../../../utils';
import { ToggleField } from '../common/FormElement';
import JSONPretty from 'react-json-pretty';

export const NonEditableRunConfig: React.FC<{ runConfiguration: any }> = ({
  runConfiguration,
}) => {
  const getFormElement: any = (elementName: any, elementSchema: any) => {
    if (typeof elementSchema === 'string') {
      return (
        <Box marginVertical={'md'} style={{ width: '40%' }}>
          <EditField
            disabled
            // onKeyDown={(e: any) => onPressEnter(e, 'string', elementName)}
            // onChangeText={(e: any) => onPressEnter(e, 'string', elementName)}
            label={titleCase(elementName)}
            optional={false}
            defaultValue={elementSchema}
            placeholder=""
            hasError={false}
            className={styles.field}
          />
        </Box>
      );
    }

    if (typeof elementSchema === 'object' && elementSchema !== null) {
      return (
        <Box style={{ width: '40%' }}>
          <Paragraph size="body" style={{ color: 'black' }}>
            <label htmlFor={elementName}>{titleCase(elementName)}</label>
          </Paragraph>
          <Box
            padding={'md'}
            marginVertical={'md'}
            className={styles.JSONPretty}
          >
            <JSONPretty
              style={{ fontSize: '16px', fontFamily: 'Rubik' }}
              id="json-pretty"
              data={elementSchema}
            ></JSONPretty>
          </Box>
        </Box>
      );
    }

    if (typeof elementSchema === 'boolean' || elementSchema === null) {
      return (
        <Box marginVertical={'md'} style={{ width: '40%' }}>
          <Box>
            {/* {console.log(elementSchema, elementName, 'asdasdasda2222sdasd')}
            <FlexBox.Row justifyContent="space-between">
              <Paragraph>{titleCase(elementName)}</Paragraph>
              <label className={styles.switch}>
                <input
                  disabled
                  type="checkbox"
                  defaultChecked={elementSchema}
                />
                <span className={`${styles.slider} ${styles.round}`}></span>
              </label>
            </FlexBox.Row> */}
            <ToggleField 
              value={elementSchema} 
              onHandleChange={() => {}} 
              label={titleCase(elementName)} 
              disabled={true}  
            />
          </Box>
        </Box>
      );
    }
  };

  return (
    <>
      {Object.keys(runConfiguration).map((key, ind) => (
        // <Col xs={6} key={ind}>
        <>{getFormElement(key, runConfiguration[key])}</>
        // </Col>
      ))}
    </>
  );
};
