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
  flavorSelectors,
} from '../../../../../redux/selectors';
import { Box, FlexBox, FullWidthSpinner } from '../../../../components';
import { PaginationWithPageSize } from '../../../common/PaginationWithPageSize';

interface Props {
  type: string;
  // filter: any;
  // pagination?: boolean;
  // id?: string;
  // isExpended?: boolean;
}

export const ListForAll: React.FC<Props> = ({ type }: Props) => {
  const locationPath = useLocationPath();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const flavorsPaginated = useSelector(flavorSelectors.myFlavorsPaginated);

  // const [selectedComponentId, setSelectedComponentId] = useState('');

  const history = useHistory();
  const { fetching, allFlavors, setAllFlavors } = useService();
  if (fetching) {
    return <FullWidthSpinner color="black" size="md" />;
  }
  console.log(flavorsPaginated, 'flavorsPaginated');
  return (
    <>
      <FlexBox.Column>
        <FlexBox>
          {allFlavors.map((item) => {
            return <Box marginHorizontal={'md'}>{item.name}</Box>;
          })}
        </FlexBox>
        <PaginationWithPageSize
          flavors={allFlavors}
          type={type}
          paginated={flavorsPaginated}
          pagination={allFlavors.length ? true : false}
        ></PaginationWithPageSize>
      </FlexBox.Column>
    </>
  );
};
