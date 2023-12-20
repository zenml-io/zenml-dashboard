import React from 'react';
import DetailCard from '../DetailCard';
import styles from '../index.module.scss';
import { Paragraph } from '../../typographies';
import { useSelector } from 'react-redux';
import { workspaceSelectors } from '../../../../redux/selectors';
import { Link } from 'react-router-dom';
import { routePaths } from '../../../../routes/routePaths';
import { Run } from '../../../../api/types';
import { Box } from '../../boxes';
import { icons } from '../../icons';
import { iconColors, iconSizes } from '../../../../constants';

interface CodeCardProps {
  run: Run;
}

const innerBoxStyleDisable = {
  // height: '30px',
  border: '2px solid #f0ebfc',
  borderRadius: '5px',
  display: 'inline-flex',
  paddingLeft: '8px',
  paddingRight: '8px',
  justifyContent: 'center',
  alignItems: 'center',
};

const CodeCard = ({ run }: CodeCardProps) => {
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  return (
    <DetailCard isInitiallyOpen={true} heading="Code">
      <div>
        <Paragraph className={styles.card__key}>Code Repository</Paragraph>
        <Paragraph className={styles.card__value}>
          {/* @ts-ignore */}
          {run.body?.code_reference?.body?.code_repository?.id ? (
            <>
              {run.body?.code_reference?.permission_denied ||
              run.body?.code_reference?.body?.code_repository
                .permission_denied ? (
                <div>
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
                      }}
                    >
                      {run.body?.code_reference?.body?.code_repository?.name &&
                        `${run.body?.code_reference?.body.code_repository?.name}`}
                      {/* `${run?.body?.pipeline?.name} ( v${run?.pipeline?.version} )`} */}
                    </Paragraph>
                  </Box>
                </div>
              ) : (
                <Link
                  to={routePaths.repositories.overview(
                    selectedWorkspace,
                    // @ts-ignore
                    run.body?.code_reference?.body?.code_repository?.id,
                  )}
                >
                  {/* @ts-ignore */}
                  {run.body?.code_reference?.body?.code_repository?.name}
                </Link>
              )}
            </>
          ) : (
            'n/a'
          )}
        </Paragraph>
      </div>
      <div>
        <Paragraph className={styles.card__key}>Git SHA</Paragraph>
        <Paragraph className={styles.card__value}>
          {/* @ts-ignore */}
          {run.gitSha || 'n/a'}
        </Paragraph>
      </div>
      <div>
        <Paragraph className={styles.card__key}>Number of steps</Paragraph>
        <Paragraph className={styles.card__value}>
          {/* @ts-ignore */}
          {run.numSteps || 'n/a'}
        </Paragraph>
      </div>
    </DetailCard>
  );
};

export default CodeCard;
