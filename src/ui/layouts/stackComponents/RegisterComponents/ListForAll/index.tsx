import React, { useState } from 'react';

// import { CollapseTable } from '../../../common/CollapseTable';
import { useHistory, useSelector } from '../../../../hooks';
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
import { SidePopup } from '../../../common/SidePopup';
import { routePaths } from '../../../../../routes/routePaths';

interface Props {
  type: string;
  // filter: any;
  // pagination?: boolean;
  // id?: string;
  // isExpended?: boolean;
}

export const ListForAll: React.FC<Props> = ({ type }: Props) => {
  const { dispatchFlavorsData } = callActionForFlavorsForPagination();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const flavorsPaginated = useSelector(flavorSelectors.myFlavorsPaginated);
  const [text, setText] = useState('');
  const [selectedFlavor, setSelectedFlavor] = useState();
  // const [selectedComponentId, setSelectedComponentId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();
  const { fetching, allFlavors } = useService();

  function handleValueFieldChangeOnSearch(value: string) {
    dispatchFlavorsData(1, flavorsPaginated.size, type, value);
  }
  const onSelectFlavor = (flavor: any) => {
    setSelectedFlavor(flavor);
    setShowModal(true);
  };
  const handleSelectedFlavor = (selectedFlavor: any) => {
    setShowModal(false);
    history.push(
      routePaths.stackComponents.configureComponent(
        type,
        selectedWorkspace,
        selectedFlavor?.id,
      ),
    );
  };

  const textStyle = { color: 'rgba(66, 66, 64, 0.5)', fontSize: '18px', lineHeight: '22px' }

  return (
    <>
      <FlexBox.Column fullWidth>
      <div style={{ marginBottom: "-30px" }} >
        <SearchInputField
          placeholder={'Search'}
          value={text}
          // disabled={applyFilter || showInBar}
          onChange={(value: string) => {
            setText(value);
            handleValueFieldChangeOnSearch(`${'contains:' + value}`);
          }}
        />
        </div>
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
                <Box marginVertical={'sm'} marginHorizontal={'md'}>
                  <FlavourBox
                    flavourDesc={'Configure and create a custom flavor'}
                    flavourName={'Create Custom Flavour'}
                  />
                </Box>

                {allFlavors.map((item, index) => {
                  return (
                    <div>
                      <Box marginVertical={'sm'} marginHorizontal={'md'}>
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
            <div style={{ marginTop: '-10px' }}>
              <PaginationWithPageSize
                flavors={allFlavors}
                type={type}
                paginated={flavorsPaginated}
                pagination={allFlavors.length ? true : false}
              ></PaginationWithPageSize>
            </div>
          </>
        ) : (
          <FlexBox.Column fullWidth>
            <Box marginVertical='md' >
              <Paragraph style={textStyle}>“{text}” Not found. </Paragraph>
              <Paragraph style={textStyle}>But don’t worry we have noted your search and it soon will be available</Paragraph>
              <Paragraph style={textStyle}>In meanwhile You can always <span style={{ color: '#443E99', textDecoration: 'underline' }}>create your own stack components</span> to integrate tools easily with ZenML</Paragraph>
              <Paragraph style={textStyle}>Or check our roadmap</Paragraph>
            </Box>

            <iframe
              title="Zenml"
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
          onSelectFlavor={() => handleSelectedFlavor(selectedFlavor)}
          flavor={selectedFlavor}
          onClose={() => setShowModal(false)}
        ></SidePopup>
      )}
    </>
  );
};
