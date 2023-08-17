import React, { useEffect, useState } from 'react';
import { routePaths } from '../../../routes/routePaths';
import { Box, FlexBox, icons, Paragraph } from '../../components';
import { iconSizes, iconColors } from '../../../constants';
import { useSelector, useDispatch, useHistory } from '../../hooks';
import {
  workspaceSelectors,
  stackComponentSelectors,
} from '../../../redux/selectors';
import { stackComponentsActions } from '../../../redux/actions';

const Component = (props: any) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const stackComponentsTypes: any[] = useSelector(
    stackComponentSelectors.stackComponentTypes,
  );
  const [selectedComp, setSelectedComp] = useState('');
  const typeName = window.location.href.split('/')[6].split('?')[0];

  useEffect(() => {
    dispatch(stackComponentsActions.getTypes());
  }, [dispatch]);

  useEffect(() => {
    setSelectedComp(typeName);
  }, [typeName]);

  const sectionStyle = {
    width: '100%',
    padding: '15px 29px 11px 23px',
    alignItems: 'center',
    borderRadius: '4px',
    cursor: 'pointer',
  };
  const textStyle = { fontSize: '16px', marginLeft: '13px' };

  const selectSection = (item: any) => {
    setSelectedComp(item);
    if (props?.fromRegisterComponent) {
      history.push(
        routePaths.stackComponents.registerComponents(item, selectedWorkspace),
      );
    } else {
      history.push(routePaths.stackComponents.base(item, selectedWorkspace));
    }
  };

  const formatText = (text: string) => {
    const removeUnderscore = text.replace('_', ' ');
    return removeUnderscore.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
      letter.toUpperCase(),
    );
  };

  const formatSectionColor = (text: string) => {
    return selectedComp === text ? 'rgba(68, 62, 153, 0.7)' : '#fff';
  };

  const formatTextColor = (text: string) => {
    return selectedComp === text ? '#fff' : '#443E99';
  };

  return (
    <Box
      style={{
        height: '100%',
        width: '20%',
        overflow: 'hidden',
        scrollBehavior: 'smooth',
        overflowY: 'scroll',
        borderRight: '1px solid rgba(168, 168, 168, 0.2)',
        padding: '0 50px 0 5px',
        marginTop: '4.2rem',

        zIndex: 2,
      }}
    >
      <Box style={{}}>
        {stackComponentsTypes?.map((item: any, index: number) => (
          <Box key={index}>
            {item === 'artifact_store' && (
              <FlexBox
                onClick={() => selectSection(item)}
                style={{
                  ...sectionStyle,
                  backgroundColor: formatSectionColor(item),
                }}
                marginTop="sm"
              >
                <Box>
                  <icons.artifact_store
                    color={
                      selectedComp === item
                        ? iconColors.white
                        : iconColors.primary
                    }
                    size={iconSizes.md}
                  />
                </Box>
                <Box>
                  <Paragraph
                    style={{ color: formatTextColor(item), ...textStyle }}
                  >
                    {formatText(item)}
                  </Paragraph>
                </Box>
              </FlexBox>
            )}
            {item === 'alerter' && (
              <FlexBox
                onClick={() => selectSection(item)}
                style={{
                  ...sectionStyle,
                  background: formatSectionColor(item),
                }}
                marginTop="sm"
              >
                <Box>
                  <icons.alerter
                    color={
                      selectedComp === item
                        ? iconColors.white
                        : iconColors.primary
                    }
                    size={iconSizes.md}
                  />
                </Box>
                <Box>
                  <Paragraph
                    style={{ color: formatTextColor(item), ...textStyle }}
                  >
                    {formatText(item)}
                  </Paragraph>
                </Box>
              </FlexBox>
            )}
            {item === 'annotator' && (
              <FlexBox
                onClick={() => selectSection(item)}
                style={{
                  ...sectionStyle,
                  background: formatSectionColor(item),
                }}
                marginTop="sm"
              >
                <Box>
                  <icons.annotator
                    color={
                      selectedComp === item
                        ? iconColors.white
                        : iconColors.primary
                    }
                    size={iconSizes.md}
                  />
                </Box>
                <Box>
                  <Paragraph
                    style={{ color: formatTextColor(item), ...textStyle }}
                  >
                    {formatText(item)}
                  </Paragraph>
                </Box>
              </FlexBox>
            )}
            {item === 'container_registry' && (
              <FlexBox
                onClick={() => selectSection(item)}
                style={{
                  ...sectionStyle,
                  background: formatSectionColor(item),
                }}
                marginTop="sm"
              >
                <Box>
                  <icons.container_registry
                    color={
                      selectedComp === item
                        ? iconColors.white
                        : iconColors.primary
                    }
                    size={iconSizes.md}
                  />
                </Box>
                <Box>
                  <Paragraph
                    style={{ color: formatTextColor(item), ...textStyle }}
                  >
                    {formatText(item)}
                  </Paragraph>
                </Box>
              </FlexBox>
            )}
            {item === 'experiment_tracker' && (
              <FlexBox
                onClick={() => selectSection(item)}
                style={{
                  ...sectionStyle,
                  background: formatSectionColor(item),
                }}
                marginTop="sm"
              >
                <Box>
                  <icons.experiment_tracker
                    color={
                      selectedComp === item
                        ? iconColors.white
                        : iconColors.primary
                    }
                    size={iconSizes.md}
                  />
                </Box>
                <Box>
                  <Paragraph
                    style={{ color: formatTextColor(item), ...textStyle }}
                  >
                    {formatText(item)}
                  </Paragraph>
                </Box>
              </FlexBox>
            )}

            {item === 'feature_store' && (
              <FlexBox
                onClick={() => selectSection(item)}
                style={{
                  ...sectionStyle,
                  background: formatSectionColor(item),
                }}
                marginTop="sm"
              >
                <Box>
                  <icons.feature_store
                    color={
                      selectedComp === item
                        ? iconColors.white
                        : iconColors.primary
                    }
                    size={iconSizes.md}
                  />
                </Box>
                <Box>
                  <Paragraph
                    style={{ color: formatTextColor(item), ...textStyle }}
                  >
                    {formatText(item)}
                  </Paragraph>
                </Box>
              </FlexBox>
            )}
            {item === 'model_deployer' && (
              <FlexBox
                onClick={() => selectSection(item)}
                style={{
                  ...sectionStyle,
                  background: formatSectionColor(item),
                }}
                marginTop="sm"
              >
                <Box>
                  <icons.model_deployer
                    color={
                      selectedComp === item
                        ? iconColors.white
                        : iconColors.primary
                    }
                    size={iconSizes.md}
                  />
                </Box>
                <Box>
                  <Paragraph
                    style={{ color: formatTextColor(item), ...textStyle }}
                  >
                    {formatText(item)}
                  </Paragraph>
                </Box>
              </FlexBox>
            )}
            {item === 'secrets_manager' && (
              <FlexBox
                onClick={() => selectSection(item)}
                style={{
                  ...sectionStyle,
                  background: formatSectionColor(item),
                }}
                marginTop="sm"
              >
                <Box>
                  <icons.secrets_manager
                    color={
                      selectedComp === item
                        ? iconColors.white
                        : iconColors.primary
                    }
                    size={iconSizes.md}
                  />
                </Box>
                <Box>
                  <Paragraph
                    style={{ color: formatTextColor(item), ...textStyle }}
                  >
                    {formatText(item)}
                  </Paragraph>
                </Box>
              </FlexBox>
            )}
            {item === 'orchestrator' && (
              <FlexBox
                onClick={() => selectSection(item)}
                style={{
                  ...sectionStyle,
                  background: formatSectionColor(item),
                }}
              >
                <Box>
                  <icons.orchestrator
                    color={
                      selectedComp === item
                        ? iconColors.white
                        : iconColors.primary
                    }
                    size={iconSizes.md}
                  />
                </Box>
                <Box>
                  <Paragraph
                    style={{ color: formatTextColor(item), ...textStyle }}
                  >
                    {formatText(item)}
                  </Paragraph>
                </Box>
              </FlexBox>
            )}
            {item === 'step_operator' && (
              <FlexBox
                onClick={() => selectSection(item)}
                style={{
                  ...sectionStyle,
                  background: formatSectionColor(item),
                }}
                marginTop="sm"
              >
                <Box>
                  <icons.step_operator
                    color={
                      selectedComp === item
                        ? iconColors.white
                        : iconColors.primary
                    }
                    size={iconSizes.md}
                  />
                </Box>
                <Box>
                  <Paragraph
                    style={{ color: formatTextColor(item), ...textStyle }}
                  >
                    {formatText(item)}
                  </Paragraph>
                </Box>
              </FlexBox>
            )}
            {item === 'data_validator' && (
              <FlexBox
                onClick={() => selectSection(item)}
                style={{
                  ...sectionStyle,
                  background: formatSectionColor(item),
                }}
                marginTop="sm"
              >
                <Box>
                  <icons.data_validator
                    color={
                      selectedComp === item
                        ? iconColors.white
                        : iconColors.primary
                    }
                    size={iconSizes.md}
                  />
                </Box>
                <Box>
                  <Paragraph
                    style={{ color: formatTextColor(item), ...textStyle }}
                  >
                    {formatText(item)}
                  </Paragraph>
                </Box>
              </FlexBox>
            )}
            {item === 'model_registry' && (
              <FlexBox
                onClick={() => selectSection(item)}
                style={{
                  ...sectionStyle,
                  background: formatSectionColor(item),
                }}
                marginTop="sm"
              >
                <Box>
                  <icons.model_registry
                    color={
                      selectedComp === item
                        ? iconColors.white
                        : iconColors.primary
                    }
                    size={iconSizes.md}
                  />
                </Box>
                <Box>
                  <Paragraph
                    style={{ color: formatTextColor(item), ...textStyle }}
                  >
                    {formatText(item)}
                  </Paragraph>
                </Box>
              </FlexBox>
            )}
            {item === 'image_builder' && (
              <FlexBox
                onClick={() => selectSection(item)}
                style={{
                  ...sectionStyle,
                  background: formatSectionColor(item),
                }}
                marginTop="sm"
              >
                <Box>
                  <icons.image_builder
                    color={
                      selectedComp === item
                        ? iconColors.white
                        : iconColors.primary
                    }
                    size={iconSizes.md}
                  />
                </Box>
                <Box>
                  <Paragraph
                    style={{ color: formatTextColor(item), ...textStyle }}
                  >
                    {formatText(item)}
                  </Paragraph>
                </Box>
              </FlexBox>
            )}

            {item !== 'data_validator' &&
              item !== 'step_operator' &&
              item !== 'orchestrator' &&
              item !== 'secrets_manager' &&
              item !== 'model_deployer' &&
              item !== 'model_deployer' &&
              item !== 'feature_store' &&
              item !== 'experiment_tracker' &&
              item !== 'container_registry' &&
              item !== 'annotator' &&
              item !== 'alerter' &&
              item !== 'image_builder' &&
              item !== 'artifact_store' &&
              item !== 'model_registry' && (
                <FlexBox
                  onClick={() => selectSection(item)}
                  style={{
                    ...sectionStyle,
                    background: formatSectionColor(item),
                  }}
                  marginTop="sm"
                >
                  <Box>
                    <icons.stackComponent
                      color={
                        selectedComp === item
                          ? iconColors.white
                          : iconColors.primary
                      }
                      size={iconSizes.md}
                    />
                  </Box>
                  <Box>
                    <Paragraph
                      style={{ color: formatTextColor(item), ...textStyle }}
                    >
                      {formatText(item)}
                    </Paragraph>
                  </Box>
                </FlexBox>
              )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Component;
