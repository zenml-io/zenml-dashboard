import React, { useState } from 'react';

// import { CollapseTable } from '../../../common/CollapseTable';
import { useSelector } from '../../../../hooks';
import { useHistory } from 'react-router-dom';
import { routePaths } from '../../../../../routes/routePaths';

// import { useService } from './useService';

// import { camelCaseToParagraph } from '../../../../../utils';
// import { DEFAULT_WORKSPACE_NAME } from '../../../../../constants';
import {
  workspaceSelectors,
  // stackComponentSelectors,
  flavorSelectors,
} from '../../../../../redux/selectors';
import {
  Box,
  // Box,
  FlexBox,
  FullWidthSpinner,
  Row,
  // FullWidthSpinner,
  // Paragraph,
  SearchInputField,
  // Row,
} from '../../../../components';
import { PaginationWithPageSize } from '../../../common/PaginationWithPageSize';
// import { FlavourBox } from '../../../common/FlavourBox';
// import { CustomConnectorBox } from '../../../common/CustomConnectorBox';
import { callActionForConnectorsTypesForPagination } from '../useService';
import { SidePopup } from '../SidePopup';
import { useService } from './useService';
import { CustomConnectorBox } from '../../../common/CustomConnectorBox';
// import { routePaths } from '../../../../../routes/routePaths';

interface Props {
  type: string;
  // filter: any;
  // pagination?: boolean;
  // id?: string;
  // isExpended?: boolean;
}

export const ListForAll: React.FC<Props> = ({ type }: Props) => {
  const {
    dispatchConnectorsTypesData,
  } = callActionForConnectorsTypesForPagination();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const flavorsPaginated = useSelector(flavorSelectors.myFlavorsPaginated);
  const [text, setText] = useState('');
  // eslint-disable-next-line
  const [selectedType, setSelectedType] = useState() as any;
  // const [selectedComponentId, setSelectedComponentId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();
  const { fetching, allConnectorsTypes } = useService();

  function handleValueFieldChangeOnSearch(value: string) {
    dispatchConnectorsTypesData(1, flavorsPaginated.size, type, value);
  }
  const onSelectConnectorType = (connectorType: any) => {
    setSelectedType(connectorType);
    setShowModal(true);
  };
  const handleSelectedType = (selectedType: any) => {
    setShowModal(false);
    // debugger;
    history.push(
      routePaths.connectors.registerConnectors(
        // selectedFlavor?.connectorType,
        selectedType.connectorType,
        selectedWorkspace,
      ),
    );
  };

  // const textStyle = {
  //   color: 'rgba(66, 66, 64, 0.5)',
  //   fontSize: '18px',
  //   lineHeight: '22px',
  // };
  const routeExsiting = () => {
    setShowModal(false);
    history.push(routePaths.stackComponents.base(type, selectedWorkspace), {
      state: selectedType.name,
    });
  };

  if (fetching) {
    return <FullWidthSpinner color="black" size="md" />;
  }

  return (
    <>
      <FlexBox.Column fullWidth>
        <SearchInputField
          fromRegisterComponent={true}
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
        ) : (
          allConnectorsTypes?.length && (
            <>
              <FlexBox>
                <Row>
                  {allConnectorsTypes?.map((item: any, index: number) => {
                    return (
                      <Row key={index} style={{ marginLeft: '15px' }}>
                        <Box marginVertical={'sm'} marginHorizontal={'md'}>
                          <CustomConnectorBox
                            connectorDesc={item.description}
                            connectorName={item.name}
                            logoUrl={item.logoUrl}
                            onSelectConnectorType={() =>
                              onSelectConnectorType(item)
                            }
                            resourceTypes={item?.resourceTypes}
                          />
                        </Box>
                      </Row>
                    );
                  })}
                </Row>
              </FlexBox>
              <div style={{ marginTop: '-10px' }}>
                <PaginationWithPageSize
                  flavors={allConnectorsTypes}
                  type={type}
                  paginated={flavorsPaginated}
                  pagination={allConnectorsTypes?.length ? true : false}
                ></PaginationWithPageSize>
              </div>
            </>
          )
        )}
      </FlexBox.Column>
      {showModal && (
        <SidePopup
          onSeeExisting={() => routeExsiting()}
          onSelectType={() => handleSelectedType(selectedType)}
          connectorType={selectedType}
          onClose={() => setShowModal(false)}
        ></SidePopup>
      )}
    </>
  );
};
