import React, { MouseEvent, useEffect, useState } from 'react';
import BasePage from '../repository-layout';
import { routePaths } from '../../../../routes/routePaths';
import { useDispatch, useSelector } from 'react-redux';
import {
  sessionSelectors,
  userSelectors,
  workspaceSelectors,
} from '../../../../redux/selectors';
import styles from './repository-create.module.scss';
import { useHistory, useLocationPath } from '../../../hooks';
import { ReactComponent as Camera } from '../../../components/icons/assets/PhotoCamera.svg';
import {
  Box,
  EditFieldSettings,
  FlexBox,
  FormPasswordField,
  InputWithLabel,
  PrimaryButton,
  TextAreaInput,
  TextInput,
  ValidatedTextField,
} from '../../../components';
import { toasterTypes } from '../../../../constants';
import { showToasterAction } from '../../../../redux/actions';
import { translate } from './translate';
import axios from 'axios';
import { sanitizeUrl } from '../../../../utils/url';

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
  const [isGithub, setIsGithub] = useState(false);
  const [isGitlab, setIsGitlab] = useState(false);
  const [logoUrl, setLogoUrl] = useState('');
  const [description, setDescription] = useState('');
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const workspaces = useSelector(workspaceSelectors.myWorkspaces);
  const user = useSelector(userSelectors.myUser);
  const history = useHistory();

  const authToken = useSelector(sessionSelectors.authenticationToken);

  useEffect(() => {
    try {
      const enteredURL = new URL(repoURL);
      if (enteredURL.hostname.toLowerCase().includes('github'))
        setIsGithub(true);
      if (enteredURL.hostname.toLowerCase().includes('gitlab'))
        setIsGitlab(true);

      if (!isGithub && !isGitlab) {
        setRepoURLStatus({
          status: 'error' as const,
          message: translate('githubURL.text'),
        });
        return;
      }
      setOwner(enteredURL.pathname.split('/')[1]);
      setRepo(enteredURL.pathname.split('/')[2]);
      setRepoURLStatus({ status: 'success' });
    } catch {
      return;
    }
  }, [repoURL, isGithub, isGitlab]);

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
          logo_url: logoUrl,
          description: description,
          config: {
            owner,
            repository: repo,
            token,
          },
          // TODO check if this is correct
          source: {
            module: isGithub
              ? 'zenml.integrations.github.code_repositories.github_code_repository'
              : 'zenml.integrations.gitlab.code_repositories.gitlab_code_repository',
            type: 'internal',
            attribute: isGithub
              ? 'GitHubCodeRepository'
              : 'GitLabCodeRepository',
          },
        },
        { headers: { Authorization: `Bearer ${authToken}` } },
      )
      .then(() => {
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
            description: e.response.data.detail[1],
            type: toasterTypes.failure,
          }),
        );
      });
  }

  return (
    <div className={styles.create}>
      <div className={styles.create__container}>
        <div className={styles.create__container__imageContainer}>
          <time className={styles.create__container__imageContainer__time}>
            {new Date().toLocaleDateString()}
          </time>

          {logoUrl ? (
            <img
              className={styles.create__container__imageContainer__image}
              src={sanitizeUrl(logoUrl)}
              alt={`Logo of repository ${name}`}
            />
          ) : (
            <div
              className={styles.create__container__imageContainer__cameraIcon}
            >
              <Camera />
            </div>
          )}
        </div>
        <div className={styles.create__formContainer}>
          <h2 className={styles.create__heading}>
            {translate('addRepository.text')}
          </h2>
          <form className={styles.create__form}>
            <InputWithLabel
              label={`${translate('uniqueName.text')} *`}
              InputComponent={<TextInput value={name} onChangeText={setName} />}
            />
            <div>
              <ValidatedTextField
                placeholder="https://github.com/zenml-io/zenml"
                label={`${translate('repositoryURL.text')} *`}
                value={repoURL}
                onChange={(p: string) => {
                  if (
                    !/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/.test(
                      p,
                    )
                  ) {
                    setRepoURLStatus({
                      status: 'error' as const,
                      message: translate('validURL.text'),
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
                  label={`${translate('owner.text')} *`}
                  labelColor="#828282"
                  value={owner}
                  onChangeText={setOwner}
                />
                <EditFieldSettings
                  disabled={true}
                  label={`${translate('repo.text')} *`}
                  labelColor="#828282"
                  value={repo}
                  onChangeText={setRepo}
                />

                <ValidatedTextField
                  label={`${translate('logoURL.text')} (optional)`}
                  value={logoUrl}
                  onChange={setLogoUrl}
                  status={{ status: 'editing' }}
                />

                <InputWithLabel
                  label={`${translate('description.text')} (optional)`}
                  InputComponent={
                    <TextAreaInput
                      value={description}
                      onChangeText={setDescription}
                      placeholder="Your Description"
                      lines={6}
                    />
                  }
                />

                <FormPasswordField
                  label={`${translate('token.text')} *`}
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
                  {translate('create.text')}
                </PrimaryButton>
              </Box>
            </FlexBox>
          </form>
        </div>
      </div>
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
