/* eslint-disable */
import React, { useState } from 'react';
import cn from 'classnames';
import styles from './index.module.scss'
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
import { useSelector, useDispatch } from '../../../../hooks';
import { Popup } from '../../../common/Popup';
import { projectsActions, pipelinesActions, pipelinePagesActions, runPagesActions, stackPagesActions } from '../../../../../redux/actions';
import { sessionSelectors, projectSelectors } from '../../../../../redux/selectors';
import axios from 'axios';

export const ProjectPopup: React.FC<{
  setPopupOpen: (attr: boolean) => void;
}> = ({ setPopupOpen }) => {
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  
  const dispatch = useDispatch();
  const authToken = useSelector(sessionSelectors.authenticationToken);
  const projects = useSelector(projectSelectors.myProjects);

  const startLoad = () => {
    dispatch(pipelinePagesActions.setFetching({ fetching: true }))
    dispatch(runPagesActions.setFetching({ fetching: true }));
    dispatch(stackPagesActions.setFetching({ fetching: true }));
  }

  const stopLoad = () => {
    dispatch(pipelinePagesActions.setFetching({ fetching: false }))
    dispatch(runPagesActions.setFetching({ fetching: false }))
    dispatch(stackPagesActions.setFetching({ fetching: false }));  
  }

  const handleCreateProject = async () => {
      setSubmitting(true);
      await axios.post(`${process.env.REACT_APP_BASE_API_URL}/projects`, { name, description }, { headers: { Authorization: `Bearer ${authToken}` }})
            .then(async () => {
             
              startLoad()
              await dispatch(projectsActions.getSelectedProject({
                allProjects: projects,
                seletecdProject: name,                          
              }))
              await dispatch(projectsActions.getMy({ selectDefault: false }));
              await dispatch(pipelinesActions.getMy({ project: name,
                onSuccess: () => stopLoad(),
                onFailure: () => stopLoad(),
              })) 
           
              setSubmitting(false);
              setPopupOpen(false)
            }).catch(async (err) => {
              await dispatch(
                  showToasterAction({
                    description: err?.response?.data?.detail, 
                    type: toasterTypes.failure,
                  }),
                );
                setSubmitting(false);
                setPopupOpen(false)
            });
    }


  return (
    <Popup
      onClose={() => {
        setPopupOpen(false);
      }}
    >
      <FlexBox.Row alignItems="center" justifyContent="space-between">
        <H3 bold color="darkGrey">Create a project</H3>
      </FlexBox.Row>
        
      <Box>
        <Box marginTop="md" >
          <FormTextField
            label='Project Name'
            labelColor="#000"
            placeholder='Project Name'
            value={name}
            onChange={(val: string) => setName(val)}
            error={{
              hasError: false,
              text: '',
            }}
            type='textarea'
          />
        </Box>
        <Box marginTop="md" style={{ width: '100%' }}>
            <FlexBox.Column fullWidth>
              <Box paddingBottom="xs">
                <Paragraph
                  size="body"
                  style={{ color: 'black' }}
                >
                <label htmlFor='desc'>Project Description</label>
                </Paragraph>
              </Box>

              <textarea name="desc" placeholder='Project Description'  value={description} onChange={(val: any) => setDescription(val.target.value)}
              className={cn(styles.inputText)}></textarea>
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
              onClick={handleCreateProject}
            >Create
            </PrimaryButton>
          </Box>
        </FlexBox>
        
      </Box>
    </Popup>
  );
};