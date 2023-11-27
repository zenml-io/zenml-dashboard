import React, { useState } from 'react';
import DetailCard from '../DetailCard';
import styles from '../index.module.scss';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { workspaceSelectors } from '../../../../redux/selectors';
import { Paragraph } from '../../typographies';
import { routePaths } from '../../../../routes/routePaths';
import { formatDateToDisplay } from '../../../../utils';
import { Run } from '../../../../api/types';
import { Box, FlexBox } from '../../boxes';
import { CustomToolTip } from '../../../layouts/common/CustomToolTip';
import { icons } from '../../icons';
import { iconColors, iconSizes } from '../../../../constants';

interface GeneralInformationCardProps {
  run: Run;
}

const innerBoxStyleEnable = {
  border: '2px solid #f0ebfc',
  borderRadius: '5px',
  display: 'flex',
  paddingLeft: '8px',
  paddingRight: '8px',
  backgroundColor: '#f0ebfc',
  justifyContent: 'center',
  alignItems: 'center',
  height: '24px',
};

const customToolTip = {
  border: '2px solid #f0ebfc',
  borderRadius: '5px',
  display: 'flex',
  padding: 16,
  height: 130,
  // justifyContent: 'center',
  // alignItems: 'center',
  zIndex: 1000,
  backgroundColor: 'white',
  position: 'absolute',

  bottom: 430,
};

const innerBoxStyleDisable = {
  // height: '30px',
  height: '24px',
  border: '2px solid #f0ebfc',
  borderRadius: '5px',
  display: 'flex',
  paddingLeft: '8px',
  paddingRight: '8px',
  justifyContent: 'center',
  alignItems: 'center',
};
const GeneralInformationCard = ({ run }: GeneralInformationCardProps) => {
  const history = useHistory();
  const [showToolTip, setShowToolTip] = useState(false);
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const handleIdToHover = () => {
    setShowToolTip(true);
  };
  const handleIdToLeave = () => {
    setShowToolTip(false);
  };

  return (
    <DetailCard isInitiallyOpen={true} heading="General Information">
      <div>
        <Paragraph className={styles.card__key}>Name</Paragraph>
        <Paragraph className={styles.card__value}>{run.name}</Paragraph>
      </div>
      <div>
        <Paragraph className={styles.card__key}>Pipeline</Paragraph>
        <FlexBox
          // alignItems="center"
          onMouseEnter={() => handleIdToHover()}
          onMouseLeave={() => handleIdToLeave()}
        >
          {!run.body?.pipeline?.permission_denied ? (
            <Box style={innerBoxStyleEnable}>
              <Paragraph
                size="small"
                style={{
                  color: '#3e238e',
                  // textDecoration: 'underline',
                  zIndex: 100,
                }}
                onClick={(event) => {
                  event.stopPropagation();
                  history.push(
                    routePaths.pipeline.configuration(
                      run?.body?.pipeline?.id as string,
                      selectedWorkspace,
                    ),
                  );
                }}
              >
                {run.body?.pipeline?.name && `${run.body?.pipeline?.name}`}
                {/* `${run?.body?.pipeline?.name} ( v${run?.pipeline?.version} )`} */}
              </Paragraph>
            </Box>
          ) : (
            <>
              {showToolTip && (
                <CustomToolTip
                  customStyle={customToolTip}
                  name={run.body?.pipeline?.name}
                />
              )}

              <Box style={innerBoxStyleDisable}>
                <icons.lock2
                  style={{ paddingRight: '5px' }}
                  color={iconColors.grey}
                  size={iconSizes.sml}
                />
                <Paragraph
                  size="small"
                  style={{
                    color: '#666c78',
                    // textDecoration: 'underline',
                    // zIndex: 100,
                  }}
                >
                  {run.body?.pipeline?.name && `${run.body?.pipeline?.name}`}
                  {/* `${run?.body?.pipeline?.name} ( v${run?.pipeline?.version} )`} */}
                </Paragraph>
              </Box>
            </>
          )}
        </FlexBox>
        {/* </Link> */}
      </div>
      <div>
        <Paragraph className={styles.card__key}>User</Paragraph>
        <Paragraph className={styles.card__value}>
          {run.body?.user?.name}
        </Paragraph>
      </div>
      <div>
        <Paragraph className={styles.card__key}>Start Time</Paragraph>
        <Paragraph className={styles.card__value}>
          {/* @ts-ignore */}
          {formatDateToDisplay(run.metadata.start_time)}
        </Paragraph>
      </div>
      <div>
        <Paragraph className={styles.card__key}>End Time</Paragraph>
        <Paragraph className={styles.card__value}>
          {/* @ts-ignore */}
          {formatDateToDisplay(run.metadata.end_time)}
        </Paragraph>
      </div>
      <div>
        <Paragraph className={styles.card__key}>Status</Paragraph>
        <Paragraph className={styles.card__value}>{run.body?.status}</Paragraph>
      </div>
      <div>
        <Paragraph className={styles.card__key}>Schedule</Paragraph>
        <Paragraph className={styles.card__value}>
          {/* @ts-ignore */}
          {run.deployment?.schedule || 'n/a'}
        </Paragraph>
      </div>
      <div>
        <Paragraph className={styles.card__key}>Run Name Template</Paragraph>
        <Paragraph className={styles.card__value}>
          {/* @ts-ignore */}
          {run.deployment?.run_name_template || 'n/a'}
        </Paragraph>
      </div>
    </DetailCard>
  );
};

export default GeneralInformationCard;
