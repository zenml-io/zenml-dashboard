import React, { useState } from 'react';

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
import {
  Box,
  FlexBox,
  FullWidthSpinner,
  Paragraph,
  SearchInputField,
} from '../../../../components';
import { PaginationWithPageSize } from '../../../common/PaginationWithPageSize';
import { FlavourBox } from '../../../common/FlavourBox';
import { CustomFlavourBox } from '../../../common/CustomFlavourBox';
import { callActionForFlavorsForPagination } from '../useService';
import { Popup } from '../../../common/Popup';
import { SidePopup } from '../../../common/SidePopup';

interface Props {
  type: string;
  // filter: any;
  // pagination?: boolean;
  // id?: string;
  // isExpended?: boolean;
}

export const ListForAll: React.FC<Props> = ({ type }: Props) => {
  const locationPath = useLocationPath();
  const { dispatchFlavorsData } = callActionForFlavorsForPagination();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const flavorsPaginated = useSelector(flavorSelectors.myFlavorsPaginated);
  const [text, setText] = useState('');
  const [selectedFlavor, setSelectedFlavor] = useState();
  // const [selectedComponentId, setSelectedComponentId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();
  const { fetching, allFlavors, setAllFlavors } = useService();

  function handleValueFieldChangeOnSearch(value: string) {
    dispatchFlavorsData(1, flavorsPaginated.size, type, value);
  }
  const onSelectFlavor = (flavor: any) => {
    setSelectedFlavor(flavor);
    setShowModal(true);
  };
  return (
    <>
      <FlexBox.Column fullWidth>
        <SearchInputField
          placeholder={'Search'}
          value={text}
          // disabled={applyFilter || showInBar}
          onChange={(value: string) => {
            setText(value);
            handleValueFieldChangeOnSearch(`${'contains:' + value}`);
          }}
        />
        {fetching ? (
          <FullWidthSpinner color="black" size="md" />
        ) : allFlavors.length ? (
          <>
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
                          onSelectFlavor={() => onSelectFlavor(item)}
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
          </>
        ) : (
          <FlexBox.Column fullWidth>
            <Paragraph>“{text}” Not found. </Paragraph>
            <iframe
              style={{
                border: '0px',
                height: '100vh',
                width: '100%',
              }}
              src="https://zenml.hellonext.co/embed/roadmap?no_header=true"
            />
          </FlexBox.Column>
        )}
      </FlexBox.Column>
      {showModal && (
        <SidePopup
          flavor={selectedFlavor}
          onClose={() => setShowModal(false)}
        ></SidePopup>
      )}
    </>
  );
};
