/* eslint-disable */
import React, { useState } from 'react';
import cn from 'classnames';
import styles from './index.module.scss';
import { toasterTypes } from '../../../../../constants';
import { showToasterAction } from '../../../../../redux/actions';
import {
  Box,
  FlexBox,
  FormTextField,
  H3,
  Paragraph,
  GhostButton,
  PrimaryButton,
} from '../../../../components';
import {
  useSelector,
  useDispatch,
  useHistory,
  usePushRoute,
} from '../../../../hooks';
import { Popup } from '../../Popup';
import {
  workspacesActions,
  pipelinesActions,
  pipelinePagesActions,
  runPagesActions,
  stackPagesActions,
} from '../../../../../redux/actions';
import {
  sessionSelectors,
  workspaceSelectors,
} from '../../../../../redux/selectors';
import axios from 'axios';
import { routePaths } from '../../../../../routes/routePaths';

export const WorkspacePopup: React.FC<{
  setPopupOpen: (attr: boolean) => void;
}> = ({ setPopupOpen }) => {
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const { push } = usePushRoute();
  const history = useHistory();
  const dispatch = useDispatch();
  const authToken = useSelector(sessionSelectors.authenticationToken);
  const workspaces = useSelector(workspaceSelectors.myWorkspaces);

  const startLoad = () => {
    dispatch(pipelinePagesActions.setFetching({ fetching: true }));
    dispatch(runPagesActions.setFetching({ fetching: true }));
    dispatch(stackPagesActions.setFetching({ fetching: true }));
  };

  const stopLoad = () => {
    dispatch(pipelinePagesActions.setFetching({ fetching: false }));
    dispatch(runPagesActions.setFetching({ fetching: false }));
    dispatch(stackPagesActions.setFetching({ fetching: false }));
  };

  const handleCreateWorkspace = async () => {
    setSubmitting(true);
    await axios
      .post(
        `${process.env.REACT_APP_BASE_API_URL}/workspaces`,
        { name, description }, //payload
        { headers: { Authorization: `Bearer ${authToken}` } },
      )
      .then(async () => {
        startLoad();
        await dispatch(
          workspacesActions.getSelectedWorkspace({
            allWorkspaces: workspaces,
            seletecdWorkspace: name,
          }),
        );
        await dispatch(
          workspacesActions.getMy({
            selectDefault: false,
            selectedWorkspace: name,
            onSuccess: () => push(routePaths.dashboard(name)),
          }),
        );
        // await dispatch(
        //   pipelinesActions.getMy({
        //     workspace: name,
        //     onSuccess: () => stopLoad(),
        //     onFailure: () => stopLoad(),
        //   }),
        // );

        setSubmitting(false);
        setPopupOpen(false);
      })
      .catch(async (err) => {
        await dispatch(
          showToasterAction({
            description: err?.response?.data?.detail,
            type: toasterTypes.failure,
          }),
        );
        setSubmitting(false);
        setPopupOpen(false);
      });
  };

  return (
    <Popup
      onClose={() => {
        setPopupOpen(false);
      }}
    >
      <FlexBox.Row alignItems="center" justifyContent="space-between">
        <H3 bold color="darkGrey">
          Create a workspace
        </H3>
      </FlexBox.Row>

      <Box>
        <Box marginTop="md">
          <FormTextField
            label="Workspace Name"
            labelColor="#000"
            placeholder="Workspace Name"
            value={name}
            onChange={(val: string) => setName(val)}
            error={{
              hasError: false,
              text: '',
            }}
            type="textarea"
          />
        </Box>
        <Box marginTop="md" style={{ width: '100%' }}>
          <FlexBox.Column fullWidth>
            <Box paddingBottom="xs">
              <Paragraph size="body" style={{ color: 'black' }}>
                <label htmlFor="desc">Workspace Description</label>
              </Paragraph>
            </Box>

            <textarea
              name="desc"
              placeholder="Workspace Description"
              value={description}
              onChange={(val: any) => setDescription(val.target.value)}
              className={cn(styles.inputText)}
            ></textarea>
          </FlexBox.Column>
        </Box>

        <FlexBox justifyContent="end" marginTop="md" flexWrap>
          <Box marginRight="sm" marginBottom="md">
            <GhostButton onClick={() => setPopupOpen(false)}>
              Cancel
            </GhostButton>
          </Box>
          <Box marginLeft="sm" marginRight="sm" marginBottom="md">
            <PrimaryButton
              disabled={name === '' || submitting}
              loading={submitting}
              onClick={handleCreateWorkspace}
            >
              Create
            </PrimaryButton>
          </Box>
        </FlexBox>
      </Box>
    </Popup>
  );
};
