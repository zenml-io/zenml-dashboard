import React, { MouseEvent, useEffect, useState } from 'react';
import BasePage from '../repository-layout';
import { routePaths } from '../../../../routes/routePaths';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
  sessionSelectors,
  userSelectors,
  workspaceSelectors,
} from '../../../../redux/selectors';
import styles from './repository-create.module.scss';
import { useHistory, useLocationPath } from '../../../hooks';
import {
  Box,
  EditFieldSettings,
  FlexBox,
  FormPasswordField,
  InputWithLabel,
  PrimaryButton,
  TextInput,
  ValidatedTextField,
} from '../../../components';
import { toasterTypes } from '../../../../constants';
import { showToasterAction } from '../../../../redux/actions';

function CreateRepositoryBody() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [repoURL, setRepoURL] = useState('');
  const [repoURLStatus, setRepoURLStatus] = useState({
    status: 'editing',
  } as { status: 'disabled' } | { status: 'editing' } | { status: 'error'; message: string } | { status: 'success' });
  const [owner, setOwner] = useState('');
  const [repo, setRepo] = useState('');
  const [token, setToken] = useState('');
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const workspaces = useSelector(workspaceSelectors.myWorkspaces);
  const user = useSelector(userSelectors.myUser);
  const history = useHistory();

  const authToken = useSelector(sessionSelectors.authenticationToken);

  useEffect(() => {
    try {
      const pathname = new URL(repoURL).pathname;
      setOwner(pathname.split('/')[1]);
      setRepo(pathname.split('/')[2]);
      setRepoURLStatus({ status: 'success' });
    } catch {
      return;
    }
  }, [repoURL]);

  async function submitHandler(
    e: MouseEvent<HTMLButtonElement> | MouseEvent<HTMLDivElement>,
  ) {
    e.preventDefault();
    await axios
      .post(
        `${process.env.REACT_APP_BASE_API_URL}/workspaces/${selectedWorkspace}/code_repositories`,
        {
          user: user?.id,
          workspace: workspaces.find((ws) => ws.name === selectedWorkspace)?.id,
          name,
          config: {
            owner,
            repository: repo,
            token,
          },
          // TODO check if this is correct
          source: {
            module:
              'zenml.integrations.github.code_repositories.github_code_repository',
            type: 'internal',
          },
        },
        { headers: { Authorization: `Bearer ${authToken}` } },
      )
      .then((data) => {
        dispatch(
          showToasterAction({
            description: 'Repository has been created successfully',
            type: toasterTypes.success,
          }),
        );
        history.push(routePaths.repositories.list(selectedWorkspace));
      })
      .catch((e) => {
        dispatch(
          showToasterAction({
            description: e.data,
            type: toasterTypes.failure,
          }),
        );
      });
  }

  return (
    <div className={styles.create}>
      <h2 className={styles.create__heading}>Add your repository</h2>
      <form className={styles.create__form}>
        <InputWithLabel
          label="Unique Name *"
          InputComponent={<TextInput value={name} onChangeText={setName} />}
        />
        <div>
          <ValidatedTextField
            placeholder="https://github.com/zenml-io/zenml"
            label="Package Name *"
            value={repoURL}
            onChange={(p: string) => {
              if (
                !/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/.test(
                  p,
                )
              ) {
                setRepoURLStatus({
                  status: 'error' as const,
                  message: 'Please insert a valid URL',
                });
              } else {
                setRepoURLStatus({ status: 'editing' });
              }
              setRepoURL(p);
            }}
            status={repoURLStatus}
          />
        </div>
        {repoURLStatus.status === 'success' && owner && repo && (
          <>
            <EditFieldSettings
              disabled={true}
              label="Owner *"
              labelColor="#828282"
              value={owner}
              onChangeText={setOwner}
            />
            <EditFieldSettings
              disabled={true}
              label="Repo *"
              labelColor="#828282"
              value={repo}
              onChangeText={setRepo}
            />
            <FormPasswordField
              label="Token *"
              placeholder="Token"
              value={token}
              onChange={(val: string) => setToken(val)}
              error={{}}
              showPasswordOption
            />
          </>
        )}
        <FlexBox
          style={{
            position: 'fixed',
            right: '0',
            bottom: '0',
            marginRight: '45px',
          }}
        >
          <Box marginBottom="lg">
            <PrimaryButton
              disabled={
                !(
                  repoURLStatus.status === 'success' &&
                  owner &&
                  repo &&
                  token &&
                  name
                )
              }
              type="submit"
              onClick={(e: any) => {
                submitHandler(e);
              }}
            >
              Create
            </PrimaryButton>
          </Box>
        </FlexBox>
      </form>
    </div>
  );
}

function CreateRepository() {
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const locationPath = useLocationPath();
  return (
    <BasePage
      tabPages={[
        {
          text: 'Create Repository',
          Component: CreateRepositoryBody,
          path: routePaths.repositories.create(
            selectedWorkspace ? selectedWorkspace : locationPath.split('/')[2],
          ),
        },
      ]}
      tabBasePath={routePaths.repositories.list(selectedWorkspace)}
      breadcrumbs={[
        {
          name: 'Repositories',
          clickable: true,
          to: routePaths.repositories.list(selectedWorkspace),
        },
      ]}
      title="Repositories"
      headerWithButtons
      renderHeaderRight={() => <></>}
    />
  );
}

export default CreateRepository;
