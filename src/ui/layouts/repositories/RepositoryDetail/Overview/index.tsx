import React from 'react';
import { FullWidthSpinner } from '../../../../components';
import { useSelector } from 'react-redux';
import { repositorySelectors } from '../../../../../redux/selectors';
import { DisplayMarkdown } from '../../../../components/richText/DisplayMarkdown';

interface DetailOverviewProps {
  isLoading: boolean;
  repositoryID: string;
}

function DetailOverview({ isLoading, repositoryID }: DetailOverviewProps) {
  const repository = useSelector(
    repositorySelectors.repositoryByID(repositoryID),
  );
  return (
    <div>
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
              : 'No Description provided'
          }
        />
      )}
    </div>
  );
}

export default DetailOverview;
