import React, { useEffect, useState } from 'react';

import { Box, FlexBox, H3, FullWidthSpinner } from '../../../../../components';

import { StackBox } from '../../../../common/StackBox';
import { CustomStackBox } from '../../../../common/CustomStackBox';

import { workspaceSelectors } from '../../../../../../redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { stackComponentsActions } from '../../../../../../redux/actions';

import { titleCase } from '../../../../../../utils';
import { useLocation } from '../../../../../hooks';

interface Props {
  type: string;
  flavourList?: any;
}

export const GetList: React.FC<Props> = ({ type, flavourList }) => {
  const dispatch = useDispatch();
  const locationPath = useLocation() as any;
  const [fetching, setFetching] = useState(false);
  const [list, setlist] = useState([]);
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
                  flavor: {
                    logoUrl: temp.logo_url,
                    name: item.flavor,
                  },
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
          <StackBox stackName="Create" stackDesc="Create a stack" />
        </Box>
        {console.log(list, 'listlist')}
        {list?.map((item: any) => (
          <Box marginLeft="md">
            <CustomStackBox
              image={item?.flavor?.logoUrl}
              stackName={item.name}
              stackDesc={item?.flavor.name}
            />
            {console.log(item, 'item?.flavor?.logo_url')}
          </Box>
        ))}
      </FlexBox.Row>
    </>
  );
};
