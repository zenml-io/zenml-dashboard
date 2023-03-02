import React, { useState } from 'react';

// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {
  FlexBox,
  Box,
  // H4,
  // GhostButton,
  // icons,
  Row,
  FullWidthSpinner,
  // Container,
  EditField,
  // Paragraph,
} from '../../../../components';
// import { iconColors, iconSizes } from '../../../../../constants';

// import { useDispatch } from '../../../../hooks';
// import { showToasterAction } from '../../../../../redux/actions';
// import { toasterTypes } from '../../../../../constants';

// import { translate } from '../translate';

import styles from './index.module.scss';
import { useService } from './useService';
import { StackBox } from '../../../common/StackBox';
import { SidePopup } from '../../CreateStack/ListForAll/SidePopup';
import { NonEditableConfig } from '../../../NonEditableConfig';
import {
  useDispatch,
  useHistory,
  useLocation,
  useSelector,
} from '../../../../hooks';
import {
  sessionSelectors,
  userSelectors,
  workspaceSelectors,
} from '../../../../../redux/selectors';
import {
  showToasterAction,
  stackComponentsActions,
  stacksActions,
} from '../../../../../redux/actions';
import { toasterTypes } from '../../../../../constants';
import axios from 'axios';
import { routePaths } from '../../../../../routes/routePaths';
import { ToggleField } from '../../../common/FormElement';
// import { SidePopup } from '../../../common/SidePopup';

export const Configuration: React.FC<{
  stackId: TId;
  tiles?: any;
  fetching?: boolean;
}> = ({ stackId, tiles, fetching = false }) => {
  // const dispatch = useDispatch();
  const { stack } = useService({ stackId });
  const user = useSelector(userSelectors.myUser);
  const authToken = useSelector(sessionSelectors.authenticationToken);
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const workspaces = useSelector(workspaceSelectors.myWorkspaces);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const locationPath = useLocation() as any;
  // const { dispatchStackData } = callActionForStacksForPagination();
  const history = useHistory();
  // const [hover, setHover] = useState(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [selectedStackBox, setSelectedStackBox] = useState<any>();
  // const handleCopy = () => {
  //   navigator.clipboard.writeText(stackConfig);
  //   dispatch(
  //     showToasterAction({
  //       description: 'Config copied to clipboard',
  //       type: toasterTypes.success,
  //     }),
  //   );
  // };
  if (fetching) {
    return <FullWidthSpinner color="black" size="md" />;
  }
  if (loading) {
    return <FullWidthSpinner color="black" size="md" />;
  }
  const onCallApi = (name?: string, toggle?: boolean) => {
    // ;
    const { id }: any = workspaces.find(
      (item) => item.name === selectedWorkspace,
    );

    const body = {
      user: user?.id,
      workspace: id,
      is_shared: toggle,
      name: name,
    };
    setLoading(true);
    axios
      .put(
        `${process.env.REACT_APP_BASE_API_URL}/stacks/${stackId}`,
        // @ts-ignore
        body,
        { headers: { Authorization: `Bearer ${authToken}` } },
      )
      .then((response: any) => {
        // const id = response.data.id;

        // setLoading(false);
        dispatch(
          showToasterAction({
            description: 'Stack has been updated successfully.',
            type: toasterTypes.success,
          }),
        );

        dispatch(
          stacksActions.stackForId({
            stackId: stackId,
            onSuccess: () => setLoading(false),
            onFailure: () => setLoading(false),
          }),
        );
      })
      .catch((err) => {
        setLoading(false);
        // ;

        dispatch(
          showToasterAction({
            description: err?.response?.data?.detail[0],
            type: toasterTypes.failure,
          }),
        );
      });
  };

  const onPressEnter = (event?: any, defaultValue?: any) => {
    if (event.key === 'Enter') {
      onCallApi(event.target.value);
    }
  };

  return (
    <FlexBox.Column fullWidth>
      {/* <FlexBox
        marginBottom="md"
        alignItems="center"
        justifyContent="space-between"
      >
        <H4 bold>{translate('configuration.title.text')}</H4>
        <Box>
          <GhostButton
            style={{ marginRight: '10px' }}
            onClick={downloadYamlFile}
          >
            {translate('configuration.button.text')}
          </GhostButton>
          <GhostButton
            onMouseEnter={() => {
              setHover(true);
            }}
            onMouseLeave={() => {
              setHover(false);
            }}
            onClick={handleCopy}
          >
            <icons.copy
              color={hover ? iconColors.white : iconColors.black}
              size={iconSizes.sm}
            />
          </GhostButton>
        </Box>
      </FlexBox> */}
      <FlexBox.Row marginLeft="md" marginTop="lg">
        {/* <Container> */}
        <Box style={{ width: '30%' }}>
          <EditField
            disabled
            onKeyDown={(e: any) => onPressEnter(e, stack.is_shared)}
            onChangeText={(e: any) => onPressEnter(e, stack.is_shared)}
            label={'Stack Name'}
            optional={false}
            defaultValue={stack.name}
            // value={stack.name}
            placeholder=""
            hasError={false}
            className={styles.field}
          />
        </Box>
        <Box marginLeft="xxl2">
          <ToggleField
            name="Share Component with public"
            value={stack.isShared}
            onHandleChange={() => onCallApi(stack.name, !stack.isShared)}
            label="Share Component with public"
            disabled={true}
          />
        </Box>
        {/* <FlexBox
          marginLeft="xxl2"
          justifyContent="space-between"
          style={{ width: '20%' }}
        >
          <Paragraph>Share Component with public</Paragraph>

          <label className={styles.switch}>
            <input
              type="checkbox"
              defaultChecked={stack.isShared}
              // checked={stack.isShared}
              onChange={() => onCallApi(stack.name, !stack.isShared)}
            />
            <span className={`${styles.slider} ${styles.round}`}></span>
          </label>
        </FlexBox> */}
        {/* </Container> */}
      </FlexBox.Row>
      <Box margin="md">
        <Row>
          {tiles &&
            tiles.map((tile: any, index: number) => (
              <Box
                key={index}
                style={{ cursor: 'pointer' }}
                className={styles.tile}
                marginTop="md"
                marginLeft="md"
                onClick={() => {
                  setShowPopup(true);
                  setSelectedStackBox(tile);
                }}
              >
                <StackBox
                  image={tile.logo}
                  stackName={tile.name}
                  stackDesc={tile.type}
                />
              </Box>
            ))}
        </Row>
      </Box>
      {/* <FlexBox className={styles.code}>
        <SyntaxHighlighter
          customStyle={{ width: '100%' }}
          wrapLines={true}
          language="yaml"
          style={okaidia}
        >
          {stackConfig}
        </SyntaxHighlighter>
      </FlexBox> */}

      {showPopup && (
        <SidePopup
          // registerStack={() => {
          //   onCreateStack();
          // }}
          isCreate={false}
          onSeeExisting={() => {
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
                  // setFetching(false);
                  history.push(
                    routePaths.stackComponents.configuration(
                      selectedStackBox.type,
                      selectedStackBox.id,
                      selectedWorkspace,
                    ),
                  );
                },
                onFailure: () => {},
              }),
            );
          }}
          onClose={() => {
            setShowPopup(false);
            setSelectedStackBox(null);
          }}
        >
          <Box marginTop="md" paddingBottom={'xxxl'}>
            <NonEditableConfig details={selectedStackBox}></NonEditableConfig>
          </Box>
        </SidePopup>
      )}
    </FlexBox.Column>
  );
};
