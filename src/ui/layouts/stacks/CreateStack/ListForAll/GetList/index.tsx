import React, { useEffect, useState } from 'react';

import { Box, FlexBox, H3, FullWidthSpinner } from '../../../../../components';
import { SidePopup } from '../SidePopup';

import { StackBox } from '../../../../common/StackBox';
import { CustomStackBox } from '../../../../common/CustomStackBox';

import { workspaceSelectors } from '../../../../../../redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { stackComponentsActions } from '../../../../../../redux/actions';

import { titleCase } from '../../../../../../utils';
import { useHistory, useLocation } from '../../../../../hooks';
import { routePaths } from '../../../../../../routes/routePaths';
import { NonEditableConfig } from '../../../../NonEditableConfig';

interface Props {
  type: string;
  flavourList?: any;
  selectedStack: any;
  setSelectedStack: any;
}

export const GetList: React.FC<Props> = ({
  type,
  flavourList,
  selectedStack,
  setSelectedStack,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const locationPath = useLocation() as any;
  const [fetching, setFetching] = useState(false);
  const [list, setlist] = useState([]);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [selectedStackBox, setSelectedStackBox] = useState<any>();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);

  useEffect(() => {
    setFetching(true);
    if (flavourList.length) {
      dispatch(
        stackComponentsActions.getMy({
          workspace: selectedWorkspace
            ? selectedWorkspace
            : locationPath.split('/')[2],
          type: type,
          page: 1,
          size: 50,

          onSuccess: (res) => {
            const updatedList = res.items.map((item: any) => {
              const temp: any = flavourList.find(
                (fl: any) => fl.name === item.flavor && fl.type === item.type,
              );
              if (temp) {
                return {
                  ...item,
                  logoUrl: temp.logo_url,
                  // flavor: {
                  //   logoUrl: temp.logo_url,
                  //   name: item.flavor,
                  // },
                };
              }
              return item;
            });

            setlist(updatedList);
            setFetching(false);
          },

          onFailure: () => setFetching(false),
        }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flavourList, selectedWorkspace]);

  if (fetching) {
    return <FullWidthSpinner color="black" size="md" />;
  }
  const helperTextStyle = {
    fontFamily: 'Rubik',
    fontSize: '16px',
    color: '#A8A8A8',
    marginLeft: '10px',
    marginTop: '-3px',
  };

  return (
    <>
      <FlexBox.Row alignItems="center">
        <H3 style={{ fontWeight: 'bold' }}>{titleCase(type)}</H3>
        <span style={helperTextStyle}>&#40;{list.length} Components&#41;</span>
      </FlexBox.Row>
      <FlexBox.Row>
        <Box style={{ width: '171px' }}>
          <div
            onClick={() => {
              history.push(
                routePaths.stackComponents.registerComponents(
                  type,
                  selectedWorkspace,
                ),
              );
            }}
          >
            <StackBox stackName="Register Component" stackDesc="" />
          </div>
        </Box>
        {list?.map((item: any) => {
          const checkboxValue = selectedStack.filter((s: any) => {
            return s.id === item.id;
          });

          return (
            <Box
              marginLeft="md"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setShowPopup(true);
                setSelectedStackBox(item);
              }}
            >
              {console.log(selectedStack, 'selectedStackselectedStack')}
              <CustomStackBox
                image={item?.logoUrl}
                stackName={item.name}
                stackDesc={item?.flavor}
                value={checkboxValue?.length > 0 ? true : false}
                onCheck={(e: any) => {
                  e.stopPropagation();
                  var index = selectedStack.findIndex(function (s: any) {
                    return s.id === item.id;
                  });
                  if (index !== -1) {
                    selectedStack.splice(index, 1);
                    setSelectedStack([...selectedStack]);
                  } else {
                    if (selectedStack.map((t: any) => t.type === item.type)) {
                      let filterSelectedStack = selectedStack.filter(
                        (st: any) => st.type !== item.type,
                      );
                      setSelectedStack([...filterSelectedStack, item]);
                    } else {
                      setSelectedStack([...selectedStack, item]);
                    }
                  }
                }}
              />
            </Box>
          );
        })}
      </FlexBox.Row>

      {showPopup && (
        <SidePopup
          isCreate={false}
          canSelect={true}
          onSelect={() => {
            var index = selectedStack.findIndex(function (s: any) {
              return s.id === selectedStackBox.id;
            });
            if (index !== -1) {
              selectedStack.splice(index, 1);
              setSelectedStack([...selectedStack]);
            } else {
              if (
                selectedStack.map((t: any) => t.type === selectedStackBox.type)
              ) {
                let filterSelectedStack = selectedStack.filter(
                  (st: any) => st.type !== selectedStackBox.type,
                );
                setSelectedStack([...filterSelectedStack, selectedStackBox]);
              } else {
                setSelectedStack([...selectedStack, selectedStackBox]);
              }
            }
            setShowPopup(false);
          }}
          selectedStackBox={selectedStackBox}
          selectedStack={selectedStack}
          onSeeExisting={() => {
            // debugger;
            dispatch(
              stackComponentsActions.getMy({
                workspace: selectedWorkspace
                  ? selectedWorkspace
                  : locationPath.split('/')[2],
                type: selectedStackBox.type,

                page: 1,
                size: 1,
                id: selectedStackBox.id,
                onSuccess: () => {
                  setFetching(false);
                  history.push(
                    routePaths.stackComponents.configuration(
                      selectedStackBox.type,
                      selectedStackBox.id,
                      selectedWorkspace,
                    ),
                  );
                },
                onFailure: () => setFetching(false),
              }),
            );
          }}
          onClose={() => setShowPopup(false)}
        >
          <Box marginTop="md" paddingBottom={'xxxl'}>
            <NonEditableConfig details={selectedStackBox}></NonEditableConfig>
            {console.log(selectedStackBox, 'selectedStackBox')}
          </Box>
        </SidePopup>
      )}
    </>
  );
};
