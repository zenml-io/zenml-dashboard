import React, { useState } from 'react';

import { useSelector } from '../../../../hooks';
import { useHistory } from 'react-router-dom';
import { routePaths } from '../../../../../routes/routePaths';

import {
  workspaceSelectors,
  flavorSelectors,
} from '../../../../../redux/selectors';
import {
  Box,
  FlexBox,
  FullWidthSpinner,
  H3,
  Row,
  SearchInputField,
} from '../../../../components';
import { PaginationWithPageSize } from '../../../common/PaginationWithPageSize';

import { callActionForConnectorsTypesForPagination } from '../useService';
import { SidePopup } from '../SidePopup';
import { useService } from './useService';
import { CustomConnectorBox } from '../../../common/CustomConnectorBox';

interface Props {
  type: string;
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

    history.push(
      routePaths.connectors.registerConnectors(
        selectedType.connectorType,
        selectedWorkspace,
      ),
    );
  };

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
          autoFocus
          onChange={(value: string) => {
            setText(value);
            if (value) {
              handleValueFieldChangeOnSearch(value);
            } else {
              dispatchConnectorsTypesData(1, flavorsPaginated.size, type);
            }
          }}
        />
        {fetching ? (
          <FullWidthSpinner color="black" size="md" />
        ) : allConnectorsTypes?.length ? (
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
        ) : (
          <Box
            style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}
            paddingVertical="xxl"
          >
            <H3>
              {
                'We are sorry! We could not find anything for your filter set. Please change your filters and try again.'
              }
            </H3>
          </Box>
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
