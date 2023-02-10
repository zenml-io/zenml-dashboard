import React from 'react';

import { CollapseTable } from '../../../common/CollapseTable';
import { useHistory, useLocationPath, useSelector } from '../../../../hooks';
import { routePaths } from '../../../../../routes/routePaths';

import { useService } from './useService';

import { camelCaseToParagraph } from '../../../../../utils';
// import { DEFAULT_WORKSPACE_NAME } from '../../../../../constants';
import {
  workspaceSelectors,
  stackComponentSelectors,
} from '../../../../../redux/selectors';
import { Box, FlexBox, FullWidthSpinner } from '../../../../components';

interface Props {
  // filter: any;
  // pagination?: boolean;
  // id?: string;
  // isExpended?: boolean;
}

export const ListForAll: React.FC<Props> = ({}: // filter,
// pagination,
// isExpended,
// id,
// isExpended = false,
Props) => {
  const locationPath = useLocationPath();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const stackComponentsPaginated = useSelector(
    stackComponentSelectors.mystackComponentsPaginated,
  );

  // const [selectedComponentId, setSelectedComponentId] = useState('');

  const history = useHistory();
  const { fetching, allFlavors, setAllFlavors } = useService();
  if (fetching) {
    return <FullWidthSpinner color="black" size="md" />;
  }
  return (
    <FlexBox.Column>
      <FlexBox> orchestrator</FlexBox>

      <FlexBox>
        {allFlavors
          .filter((fl) => fl.type === 'orchestrator')
          .map((item) => {
            return <Box marginHorizontal={'md'}>{item.name}</Box>;
          })}
      </FlexBox>
      <FlexBox> Artifact Store</FlexBox>

      <FlexBox>
        {allFlavors
          .filter((fl) => fl.type === 'artifact_store')
          .map((item) => {
            return <Box marginHorizontal={'md'}>{item.name}</Box>;
          })}
      </FlexBox>
      <FlexBox> Alerter</FlexBox>

      <FlexBox>
        {allFlavors
          .filter((fl) => fl.type === 'alerter')
          .map((item) => {
            return <Box marginHorizontal={'md'}>{item.name}</Box>;
          })}
      </FlexBox>
    </FlexBox.Column>
  );
};
