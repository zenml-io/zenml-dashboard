import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import {
  Box,
  FlexBox,
  FormTextField,
  PrimaryButton,
} from '../../../../components';
import { ToggleField } from '../../../common/FormElement';

import {
  sessionSelectors,
  stackComponentSelectors,
  userSelectors,
  workspaceSelectors,
} from '../../../../../redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { GetList } from './GetList';
import { GetFlavorsListForLogo } from '../../../stackComponents/Stacks/List/GetFlavorsListForLogo';
import { SidePopup } from './SidePopup';
import {
  showToasterAction,
  stackComponentsActions,
  stacksActions,
} from '../../../../../redux/actions';
import axios from 'axios';
import { toasterTypes } from '../../../../../constants';
import { useHistory, useLocation } from '../../../../hooks';
import { routePaths } from '../../../../../routes/routePaths';
import { NonEditableConfig } from '../../../NonEditableConfig';

interface Props {}

export const ListForAll: React.FC<Props> = () => {
  const getSelectedStack: any = localStorage.getItem('persistSelectedStack');
  const paseSelectedStack = JSON.parse(getSelectedStack);
  const stackComponentsTypes: any[] = useSelector(
    stackComponentSelectors.stackComponentTypes,
  );
  const locationPath = useLocation() as any;

  const history = useHistory();
  const dispatch = useDispatch();
  const authToken = useSelector(sessionSelectors.authenticationToken);
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const user = useSelector(userSelectors.myUser);
  const workspaces = useSelector(workspaceSelectors.myWorkspaces);
  const { flavourList } = GetFlavorsListForLogo();
  const [stackName, setStackName] = useState(
    paseSelectedStack?.stackName || '',
  );
  const [isShared, setIshared] = useState(true);
  const [selectedStack, setSelectedStack] = useState<any>(
    paseSelectedStack?.selectedStack || [],
  );
  const [selectedStackBox, setSelectedStackBox] = useState<any>();
  const [showPopup, setShowPopup] = useState<boolean>(false);

  useEffect(() => {
    let stackPersist: any = {};
    stackPersist = {
      ...stackPersist,
      stackName,
      selectedStack,
    };

    return () => {
      localStorage.setItem(
        'persistSelectedStack',
        JSON.stringify(stackPersist),
      );
    };
    // eslint-disable-next-line
  }, [selectedStack, stackName]);

  const selectStack = (data: any) => {
    setShowPopup(true);
    setSelectedStackBox(data);
  };
  const onCreateStack = () => {
    if (!stackName) {
      setShowPopup(false);
      setSelectedStackBox(null);
      return dispatch(
        showToasterAction({
          description: 'Enter Stack Name',
          type: toasterTypes.failure,
        }),
      );
    }
    const components = selectedStack.map((item: any) => {
      return { [item.type]: [item.id] };
    });
    var mergedObject = components.reduce((c: any, v: any) => {
      for (var k in v) {
        c[k] = c[k] || [];
        c[k].push(v[k][0]);
      }
      return c;
    }, {});

    if (!mergedObject.hasOwnProperty('orchestrator')) {
      setShowPopup(false);
      setSelectedStackBox(null);
      return dispatch(
        showToasterAction({
          description: 'Select atleast one component from Orchestrator',
          type: toasterTypes.failure,
        }),
      );
    }
    if (!mergedObject.hasOwnProperty('artifact_store')) {
      setShowPopup(false);
      setSelectedStackBox(null);
      return dispatch(
        showToasterAction({
          description: 'Select atleast one component from Artifact Store',
          type: toasterTypes.failure,
        }),
      );
    }
    const finalData = Object.assign({}, mergedObject);
    const { id }: any = workspaces.find(
      (item) => item.name === selectedWorkspace,
    );
    const body = {
      user: user?.id,
      workspace: id,
      is_shared: isShared,
      name: stackName,
      components: finalData,
    };
    setShowPopup(false);
    setSelectedStackBox(null);
    axios
      .post(
        `${process.env.REACT_APP_BASE_API_URL}/workspaces/${selectedWorkspace}/stacks`,
        // @ts-ignore
        { ...body },
        { headers: { Authorization: `Bearer ${authToken}` } },
      )
      .then((response: any) => {
        setStackName('');

        setSelectedStack([]);

        dispatch(
          showToasterAction({
            description: 'Stack has been created successfully',
            type: toasterTypes.success,
          }),
        );
        dispatch(
          stacksActions.getMy({
            page: 1,
            size: 1,
            filtersParam: response.data.id,
            workspace: selectedWorkspace,
            onSuccess: () => {
              history.push(
                routePaths.stack.configuration(
                  response.data.id,
                  selectedWorkspace,
                ),
              );
            },
            onFailure: () => {},
          }),
        );

        history.push(
          routePaths.stack.configuration(response.data.id, selectedWorkspace),
        );
      })
      .catch((err) => {
        if (err?.response?.status === 403) {
          dispatch(
            showToasterAction({
              description: err?.response?.data?.detail,
              type: toasterTypes.failure,
            }),
          );
        } else if (err?.response?.status === 409) {
          dispatch(
            showToasterAction({
              description: err?.response?.data?.detail[0].includes('Exists')
                ? `Stack name already exists.`
                : err?.response?.data?.detail[0],
              type: toasterTypes.failure,
            }),
          );
        } else {
          dispatch(
            showToasterAction({
              description: err?.response?.data?.detail[0].includes('Exists')
                ? `Stack name already exists.`
                : err?.response?.data?.detail[0],
              type: toasterTypes.failure,
            }),
          );
        }
      });
  };

  const handleSelectedBox = (e: any, data: any) => {
    e.stopPropagation();

    var index = selectedStack.findIndex(function (s: any) {
      return s.id === data?.id;
    });
    if (index !== -1) {
      selectedStack.splice(index, 1);
      setSelectedStack([...selectedStack]);
    }
  };

  return (
    <Box style={{ width: '100%', position: 'relative' }}>
      <div className={styles.top}>
        <Box>
          <FlexBox.Row alignItems="center">
            <Box style={{ width: '30%' }}>
              <FormTextField
                autoFocus
                required={true}
                onChange={(e: any) => {
                  setStackName(e);
                }}
                placeholder="Stack Name"
                label={'Enter Stack Name'}
                value={stackName}
              />
            </Box>
            <Box marginLeft="xl" style={{ width: '30%' }}>
              <ToggleField
                label={'Share Stack with public'}
                value={isShared}
                onHandleChange={(value: any) => setIshared(!isShared)}
              />
            </Box>
          </FlexBox.Row>
        </Box>

        {selectedStack?.length >= 0 && (
          <FlexBox.Row marginTop="md">
            {selectedStack?.map((stack: any) => (
              <Box
                key={stack.id}
                onClick={() => selectStack(stack)}
                marginLeft="sm"
                style={{
                  border:
                    selectedStackBox?.id === stack.id
                      ? '2px solid green'
                      : '2px solid #fff',
                }}
                className={styles.selectedBox}
              >
                {selectedStackBox?.id !== stack.id && (
                  <input
                    type="checkbox"
                    className={styles.selectedBoxCheckbox}
                    checked
                    onClick={(e) => handleSelectedBox(e, stack)}
                  />
                )}
                <img src={stack.logoUrl} alt={stack.name} />
              </Box>
            ))}
          </FlexBox.Row>
        )}
      </div>

      <FlexBox.Column>
        {stackComponentsTypes?.map((item, index) => (
          <Box
            key={index}
            marginTop="lg"
            paddingBottom="lg"
            style={{ overflowX: 'auto' }}
            className={styles.list}
          >
            <GetList
              type={item}
              flavourList={flavourList}
              selectedStack={selectedStack}
              setSelectedStack={setSelectedStack}
            />
          </Box>
        ))}
      </FlexBox.Column>

      <Box className={styles.stackFooter}>
        <PrimaryButton
          className={styles.stackFooterButton}
          onClick={() => onCreateStack()}
        >
          Register Stack
        </PrimaryButton>
      </Box>

      {showPopup && (
        <SidePopup
          canSelect={true}
          selectedStackBox={selectedStackBox}
          selectedStack={selectedStack}
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
                let filterSelectedStack = selectedStack?.filter(
                  (st: any) => st.type !== selectedStackBox.type,
                );
                setSelectedStack([...filterSelectedStack, selectedStackBox]);
              } else {
                setSelectedStack([...selectedStack, selectedStackBox]);
              }
            }
            setShowPopup(false);
          }}
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
    </Box>
  );
};
