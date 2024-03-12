import React, { useState } from 'react';

import { useSelector } from '../../../../hooks';
import { useHistory } from 'react-router-dom';

import { useService } from './useService';

import {
  workspaceSelectors,
  flavorSelectors,
} from '../../../../../redux/selectors';
import {
  Box,
  FlexBox,
  FullWidthSpinner,
  Paragraph,
  SearchInputField,
  Row,
} from '../../../../components';
import { PaginationWithPageSize } from '../../../common/PaginationWithPageSize';

import { CustomFlavourBox } from '../../../common/CustomFlavourBox';
import { callActionForFlavorsForPagination } from '../useService';
import { SidePopup } from '../../../common/SidePopup';
import { routePaths } from '../../../../../routes/routePaths';
import { sanitizeUrl } from '../../../../../utils/url';
// import { flavorsActions } from '../../../../../redux/actions';
// import { Flavor } from '../../../../../api/types';

interface Props {
  type: string;
}

export const ListForAll: React.FC<Props> = ({ type }: Props) => {
  // const dispatch = useDispatch();
  const { dispatchFlavorsData } = callActionForFlavorsForPagination();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const flavorsPaginated = useSelector(flavorSelectors.myFlavorsPaginated);
  const [text, setText] = useState('');
  const [selectedFlavor, setSelectedFlavor] = useState() as any;

  const [showModal, setShowModal] = useState(false);
  const history = useHistory();
  const { fetching, allFlavors, version } = useService();

  function handleValueFieldChangeOnSearch(value: string) {
    dispatchFlavorsData(1, flavorsPaginated.size, type, value);
  }
  const onSelectFlavor = (flavor: any) => {
    setSelectedFlavor(flavor);
    setShowModal(true);
    // dispatch(
    //   flavorsActions.getById({
    //     flavorId: flavor.id,
    //     onSuccess: (res: Flavor) => {
    //       setSelectedFlavor(res);
    //       setShowModal(true);
    //     },
    //     onFailure: () => {},
    //   }),
    // );
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

  const textStyle = {
    color: 'rgba(66, 66, 64, 0.5)',
    fontSize: '18px',
    lineHeight: '22px',
  };
  const routeExsiting = () => {
    setShowModal(false);
    history.push(routePaths.stackComponents.base(type, selectedWorkspace), {
      state: selectedFlavor.name,
    });
  };

  return (
    <>
      <FlexBox.Column fullWidth>
        <SearchInputField
          fromRegisterComponent={true}
          placeholder={'Search'}
          value={text}
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
              <Row>
                {allFlavors.map((item: any, index) => {
                  return (
                    <Row key={index} style={{ marginLeft: '15px' }}>
                      <Box marginVertical={'sm'} marginHorizontal={'md'}>
                        <CustomFlavourBox
                          flavourDesc={
                            item?.metadata.config_schema?.description
                          }
                          flavourName={item?.name}
                          logoUrl={sanitizeUrl(item?.body.logo_url)}
                          onSelectFlavor={() => onSelectFlavor(item)}
                        />
                      </Box>
                    </Row>
                  );
                })}
              </Row>
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
            <Box marginVertical="md">
              <Paragraph style={textStyle}>“{text}” Not found. </Paragraph>
              <Paragraph style={textStyle}>
                But don’t worry we have noted your search and it soon will be
                available
              </Paragraph>
              <Paragraph style={textStyle}>
                In meanwhile You can always{' '}
                <span style={{ color: '#443E99', textDecoration: 'underline' }}>
                  create your own stack components
                </span>{' '}
                to integrate tools easily with ZenML
              </Paragraph>
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
          version={version}
          onSeeExisting={() => routeExsiting()}
          onSelectFlavor={() => handleSelectedFlavor(selectedFlavor)}
          flavor={selectedFlavor}
          onClose={() => setShowModal(false)}
        ></SidePopup>
      )}
    </>
  );
};
