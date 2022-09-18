import React, { useState } from 'react';
import { translate } from './translate';
import { List } from './List';
import { BasePage } from '../BasePage';
import { routePaths } from '../../../../routes/routePaths';
import { WorkspaceDropdown } from './WorkspaceDropdown';
import { useService } from './useService';
import {
  Box,
  Container,
  FlexBox,
  FormDropdownField,
  FormTextField,
  icons,
} from '../../../components';
import 'bootstrap/dist/css/bootstrap.min.css';
import { iconColors, iconSizes } from '../../../../constants';
import styles from './WorkspaceDropdown.module.scss';

const FilterComponent = () => {
  const [applyFilter, setApplyFilter] = useState(false);

  const [filter, setFilter] = useState({
    where: {
      column: {
        selectedValue: '',
        options: [
          {
            value: 'name',
            label: 'Stack Name',
          },
          {
            value: 'userName',
            label: 'Owner',
          },
          {
            value: 'created_at',
            label: 'Created at',
          },
        ],
      },
      contains: {
        selectedValue: '',
        options: [
          {
            value: 'contains',
            label: 'contains',
          },
          {
            value: 'equal',
            label: 'equal',
          },
        ],
      },
      filterValue: '',
    },
  });

  function handleChange(field: any, value: string) {
    field.selectedValue = value;
    setFilter({
      ...filter,
    });
  }

  function handleValueFieldChange(field: any, value: string) {
    field.filterValue = value;
    setFilter({
      ...filter,
    });
  }

  const valueField = (selectedValue: string) => {
    switch (selectedValue) {
      case 'contains':
        return (
          <FormTextField
            label={''}
            placeholder={''}
            value={filter.where.filterValue}
            onChange={(value: string) =>
              handleValueFieldChange(filter.where, value)
            }
          />
        );
      case 'equal':
        return (
          <div className={`${styles.datePickerField} justify-content-end`}>
            <icons.calendar size={iconSizes.md} color={iconColors.grey} />
          </div>
        );
      default:
        return (
          <FormTextField
            label={''}
            placeholder={''}
            disabled
            value={filter.where.filterValue}
          />
        );
    }
  };

  function getFilter(value: any) {
    return {
      column: value.where.column.selectedValue,
      type: value.where.contains.selectedValue,
      value: value.where.filterValue,
    };
  }

  return (
    <FlexBox.Column fullWidth>
      <FlexBox
        fullWidth
        className="border border-primary rounded rounded-4 p-2 align-item-center mb-3"
      >
        <Box
          onClick={() => setApplyFilter(!applyFilter)}
          style={{
            width: '33px',
            height: '28px',
            background: '#8045FF',
            borderRadius: '4px',
          }}
        >
          <icons.funnelFill
            style={{ padding: '5px 0px 0px 7px' }}
            size={iconSizes.sm}
            color={iconColors.white}
          />
        </Box>
        <Box style={{ padding: '5px 0px 0px 7px' }} className="text-muted h5">
          {' '}
          Filter your stack
        </Box>
      </FlexBox>
      {applyFilter && (
        <Box className="mb-4">
          <Container>
            <p className="h3 text-muted">Custom Filtering</p>
            <FlexBox.Row className="align-items-center mb-1">
              <Box className="mr-4 mt-5 h4 text-muted">Where</Box>
              <FormDropdownField
                label={''}
                onChange={(value: string) =>
                  handleChange(filter.where['column'], value)
                }
                placeholder={'Column Name'}
                value={filter.where.column.selectedValue}
                options={filter.where.column.options}
              />
              <FormDropdownField
                label={''}
                disabled={filter.where.column.selectedValue ? false : true}
                placeholder={'category'}
                onChange={(value: string) =>
                  handleChange(filter.where['contains'], value)
                }
                value={filter.where.contains.selectedValue}
                options={filter.where.contains.options}
              />
              {valueField(filter.where.contains.selectedValue)}

              <Box
                style={{
                  marginTop: '23px',
                  width: '130px',
                  height: '40px',
                  border: '1px solid #c9cbd0',
                  borderRadius: '4px',
                }}
              >
                <icons.delete
                  style={{ padding: '7px 0px 0px 7px' }}
                  size={iconSizes.md}
                  color={iconColors.grey}
                />
              </Box>
            </FlexBox.Row>
            <FlexBox.Row className="mt-5">
              <icons.simplePlus
                size={iconSizes.lg}
                color={iconColors.darkGrey}
              />
              <span className="h3 text-muted ml-1 mt-2">Add Condition</span>
            </FlexBox.Row>
          </Container>
        </Box>
      )}
      <List filter={getFilter(filter)} />
    </FlexBox.Column>
  );
};

const PAGES = [
  {
    text: translate('tabs.stacks.text'),
    Component: FilterComponent,
    path: routePaths.stacks.list,
  },
  // {
  //   text: translate('tabs.allRuns.text'),
  //   Component: AllRuns,
  //   path: routePaths.stacks.allRuns,
  // },
];

const BREADCRUMBS = [
  // {
  //   name: translate('header.breadcrumbs.dashBoard.text'),
  //   clickable: true,
  //   to: routePaths.home,
  // },
  {
    name: translate('header.breadcrumbs.stacks.text'),
    clickable: true,
    to: routePaths.stacks.list,
  },
];

export const Stacks: React.FC = () => {
  const {
    setFetching,
    setCurrentWorkspace,
    currentWorkspace,
    workspaces,
  } = useService();

  return (
    <BasePage
      tabPages={PAGES}
      tabBasePath={routePaths.stacks.base}
      breadcrumbs={BREADCRUMBS}
      headerWithButtons
      renderHeaderRight={() => (
        <WorkspaceDropdown
          workspaces={workspaces}
          currentWorkspace={currentWorkspace}
          setCurrentWorkspace={(workspace: TWorkspace): void => {
            if (currentWorkspace && workspace.id !== currentWorkspace.id) {
              setFetching(true);
            }
            setCurrentWorkspace(workspace);
          }}
        />
      )}
    />
  );
};

export default Stacks;
