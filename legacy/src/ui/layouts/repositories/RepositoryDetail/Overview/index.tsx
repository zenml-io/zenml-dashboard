import React from 'react';
import { FullWidthSpinner } from '../../../../components';
import { useSelector } from 'react-redux';
import { repositorySelectors } from '../../../../../redux/selectors';
import { DisplayMarkdown } from '../../../../components/richText/DisplayMarkdown';
import { translate } from '../translate';

interface DetailOverviewProps {
  isLoading: boolean;
  repositoryID: string;
}

function DetailOverview({ isLoading, repositoryID }: DetailOverviewProps) {
  const repository = useSelector(
    repositorySelectors.repositoryByID(repositoryID),
  );
  return (
    <div style={{ width: '100%' }}>
      {isLoading ? (
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <FullWidthSpinner color="black" size="md" />
        </div>
      ) : (
        <DisplayMarkdown
          markdown={
            repository.description
              ? repository.description
              : translate('noDescription.text')
          }
        />
      )}
    </div>
  );
}

export default DetailOverview;
