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

  const formatIconColor = (item: any) => {
    return selectedComp === item ? iconColors.white : iconColors.primary;
  };

  const Element = ({ item, icon }: { item: string; icon: React.ReactNode }) => (
    <FlexBox
      onClick={() => selectSection(item)}
      style={{
        width: '100%',
        padding: '15px 29px 11px 23px',
        alignItems: 'center',
        borderRadius: '4px',
        cursor: 'pointer',
        backgroundColor:
          selectedComp === item ? 'rgba(68, 62, 153, 0.7)' : '#fff',
      }}
      marginTop="sm"
    >
      <Box>{icon}</Box>
      <Box>
        <Paragraph
          style={{
            color: selectedComp === item ? '#fff' : '#443E99',
            fontSize: '16px',
            marginLeft: '13px',
          }}
        >
          {formatText(item)}
        </Paragraph>
      </Box>
    </FlexBox>
  );

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
              <Element
                item={item}
                icon={
                  <icons.artifact_store
                    color={formatIconColor(item)}
                    size={iconSizes.md}
                  />
                }
              />
            )}
            {item === 'alerter' && (
              <Element
                item={item}
                icon={
                  <icons.alerter
                    color={formatIconColor(item)}
                    size={iconSizes.md}
                  />
                }
              />
            )}
            {item === 'annotator' && (
              <Element
                item={item}
                icon={
                  <icons.annotator
                    color={formatIconColor(item)}
                    size={iconSizes.md}
                  />
                }
              />
            )}
            {item === 'container_registry' && (
              <Element
                item={item}
                icon={
                  <icons.container_registry
                    color={formatIconColor(item)}
                    size={iconSizes.md}
                  />
                }
              />
            )}
            {item === 'experiment_tracker' && (
              <Element
                item={item}
                icon={
                  <icons.experiment_tracker
                    color={formatIconColor(item)}
                    size={iconSizes.md}
                  />
                }
              />
            )}
            {item === 'feature_store' && (
              <Element
                item={item}
                icon={
                  <icons.feature_store
                    color={formatIconColor(item)}
                    size={iconSizes.md}
                  />
                }
              />
            )}
            {item === 'model_deployer' && (
              <Element
                item={item}
                icon={
                  <icons.model_deployer
                    color={formatIconColor(item)}
                    size={iconSizes.md}
                  />
                }
              />
            )}
            {item === 'secrets_manager' && (
              <Element
                item={item}
                icon={
                  <icons.secrets_manager
                    color={formatIconColor(item)}
                    size={iconSizes.md}
                  />
                }
              />
            )}
            {item === 'orchestrator' && (
              <Element
                item={item}
                icon={
                  <icons.orchestrator
                    color={formatIconColor(item)}
                    size={iconSizes.md}
                  />
                }
              />
            )}
            {item === 'step_operator' && (
              <Element
                item={item}
                icon={
                  <icons.step_operator
                    color={formatIconColor(item)}
                    size={iconSizes.md}
                  />
                }
              />
            )}
            {item === 'data_validator' && (
              <Element
                item={item}
                icon={
                  <icons.data_validator
                    color={formatIconColor(item)}
                    size={iconSizes.md}
                  />
                }
              />
            )}
            {item === 'model_registry' && (
              <Element
                item={item}
                icon={
                  <icons.model_registry
                    color={formatIconColor(item)}
                    size={iconSizes.md}
                  />
                }
              />
            )}
            {item === 'image_builder' && (
              <Element
                item={item}
                icon={
                  <icons.image_builder
                    color={formatIconColor(item)}
                    size={iconSizes.md}
                  />
                }
              />
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
                <Element
                  item={item}
                  icon={
                    <icons.stackComponent
                      color={formatIconColor(item)}
                      size={iconSizes.md}
                    />
                  }
                />
              )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Component;
