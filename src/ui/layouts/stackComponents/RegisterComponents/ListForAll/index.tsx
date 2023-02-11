import React from 'react';

// import { CollapseTable } from '../../../common/CollapseTable';
import { useHistory, useLocationPath, useSelector } from '../../../../hooks';
// import { routePaths } from '../../../../../routes/routePaths';

import { useService } from './useService';

// import { camelCaseToParagraph } from '../../../../../utils';
// import { DEFAULT_WORKSPACE_NAME } from '../../../../../constants';
import {
  workspaceSelectors,
  // stackComponentSelectors,
  flavorSelectors,
} from '../../../../../redux/selectors';
import { Box, FlexBox, FullWidthSpinner } from '../../../../components';
import { PaginationWithPageSize } from '../../../common/PaginationWithPageSize';
import { FlavourBox } from '../../../common/FlavourBox';
import { CustomFlavourBox } from '../../../common/CustomFlavourBox';

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
  console.log(allFlavors, 'flavorsPaginated');
  return (
    <>
      <FlexBox.Column>
        <FlexBox>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
            }}
          >
            <Box margin={'md'}>
              <FlavourBox
                flavourDesc={'Configure and create a custom flavor'}
                flavourName={'Create Custom Flavour'}
              />
            </Box>
            {allFlavors.map((item, index) => {
              return (
                <div>
                  <Box margin={'md'}>
                    <CustomFlavourBox
                      flavourDesc={item.name}
                      flavourName={'Flavour'}
                      logoUrl={item.logoUrl}
                    />
                  </Box>
                </div>
              );
            })}
          </div>
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
