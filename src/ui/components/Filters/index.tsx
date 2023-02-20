import React, { forwardRef, useState } from 'react';
import {
  Box,
  FlexBox,
  FormDropdownField,
  SearchInputField,
  FormTextField,
  icons,
  Paragraph,
} from '../../components';
import { iconColors, iconSizes } from '../../../constants';
import { formatDateToDisplayWithoutTime } from '../../../utils';
import DatePicker from 'react-datepicker';

import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './filter.module.scss';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import { useDispatch, useSelector } from '../../hooks';
import {
  organizationSelectors,
  pipelineSelectors,
  workspaceSelectors,
  stackSelectors,
} from '../../../redux/selectors';
import {
  organizationActions,
  pipelinesActions,
  stacksActions,
} from '../../../redux/actions';

// TODO: Dev please note: getInitialFilterState is for stack inital filter value for any other component you need to modify it
export const getInitialFilterState = () => {
  const initialFilterState = {
    column: {
      selectedValue: {
        value: '',
        label: '',
        type: '',
      },
      options: [
        {
          value: 'id',
          label: 'ID',
          type: 'string',
        },
        {
          value: 'name',
          label: 'Name',
          type: 'string',
        },
        {
          value: 'flavor',
          label: 'Flavor',
          type: 'string',
        },
        {
          value: 'user_id',
          label: 'Author',
          type: 'string',
        },
        {
          value: 'is_shared',
          label: 'Shared',
          type: 'boolean',
        },
        {
          value: 'created',
          label: 'Created at',
          type: 'date',
        },
      ],
    },
    contains: {
      selectedValue: {},
      options: [
        {
          value: 'contains',
          label: 'Contains',
          type: 'string',
        },
        {
          value: 'startswith',
          label: 'Start With',
          type: 'string',
        },
        {
          value: 'endswith',
          label: 'End With',
          type: 'string',
        },
        {
          value: 'equals',
          label: 'Equal',
          type: 'string',
        },
        {
          value: 'not_equal',
          label: 'Not Equal',
          type: 'string',
        },
        {
          value: 'gt',
          label: 'Greater than',
          type: 'date',
        },
        {
          value: 'lt',
          label: 'Less than',
          type: 'date',
        },
        {
          value: 'gte',
          label: 'Greater than and Equal',
          type: 'date',
        },
        {
          value: 'lte',
          label: 'Less than and Equal',
          type: 'date',
        },
        {
          value: 'equal_date',
          label: 'Equals',
          type: 'date',
        },
        {
          value: 'true',
          label: 'True',
          type: 'boolean',
        },
        {
          value: 'false',
          label: 'False',
          type: 'boolean',
        },
      ],
    },
    filterValue: '',
  };
  return JSON.parse(JSON.stringify(initialFilterState));
};
export const getInitialFilterStateForPipeline = () => {
  const initialFilterState = {
    column: {
      selectedValue: {
        value: '',
        label: '',
        type: '',
      },
      options: [
        {
          value: 'id',
          label: 'ID',
          type: 'string',
        },
        {
          value: 'name',
          label: 'Name',
          type: 'string',
        },
        {
          value: 'version',
          label: 'Version',
          type: 'string',
        },
        {
          value: 'user_id',
          label: 'Author',
          type: 'string',
        },
        // {
        //   value: 'isShared',
        //   label: 'Shared',
        //   type: 'boolean',
        // },
        {
          value: 'created',
          label: 'Created at',
          type: 'date',
        },
      ],
    },
    contains: {
      selectedValue: {},
      options: [
        {
          value: 'contains',
          label: 'Contains',
          type: 'string',
        },
        {
          value: 'startswith',
          label: 'Start With',
          type: 'string',
        },
        {
          value: 'endswith',
          label: 'End With',
          type: 'string',
        },
        {
          value: 'equals',
          label: 'Equal',
          type: 'string',
        },
        // {
        //   value: 'not_equal',
        //   label: 'Not Equal',
        //   type: 'string',
        // },
        {
          value: 'gt',
          label: 'Greater than',
          type: 'date',
        },
        {
          value: 'lt',
          label: 'Less than',
          type: 'date',
        },
        {
          value: 'gte',
          label: 'Greater than and Equal',
          type: 'date',
        },
        {
          value: 'lte',
          label: 'Less than and Equal',
          type: 'date',
        },
        {
          value: 'equal_date',
          label: 'Equals',
          type: 'date',
        },
        {
          value: 'true',
          label: 'True',
          type: 'boolean',
        },
        {
          value: 'false',
          label: 'False',
          type: 'boolean',
        },
      ],
    },
    filterValue: '',
  };
  return JSON.parse(JSON.stringify(initialFilterState));
};
export const getInitialFilterStateForRuns = () => {
  const initialFilterState = {
    column: {
      selectedValue: {
        value: '',
        label: '',
        type: '',
      },
      statusOption: [
        {
          value: 'completed',
          label: 'Completed',
          type: 'status',
        },
        {
          value: 'failed',
          label: 'Failed',
          type: 'status',
        },
        {
          value: 'running',
          label: 'Running',
          type: 'status',
        },
        {
          value: 'cached',
          label: 'Cached',
          type: 'status',
        },
      ],
      options: [
        {
          value: 'id',
          label: 'Run ID',
          type: 'string',
        },
        {
          value: 'name',
          label: 'Run Name',
          type: 'string',
        },
        {
          value: 'pipeline_id',
          label: 'Pipeline',
          type: 'string',
        },
        {
          value: 'status',
          label: 'Status',
          type: 'status',
        },
        {
          value: 'stack_id',
          label: 'Stack Name',
          type: 'string',
        },
        {
          value: 'user_id',
          label: 'Author',
          type: 'string',
        },
        // {
        //   value: 'isShared',
        //   label: 'Shared',
        //   type: 'boolean',
        // },
        {
          value: 'created',
          label: 'Created at',
          type: 'date',
        },
      ],
    },
    contains: {
      selectedValue: {},
      statusOption: [
        {
          value: 'completed',
          label: 'Completed',
          type: 'status',
        },
        {
          value: 'failed',
          label: 'Failed',
          type: 'status',
        },
        {
          value: 'running',
          label: 'Running',
          type: 'status',
        },
        {
          value: 'cached',
          label: 'Cached',
          type: 'status',
        },
      ],
      options: [
        {
          value: 'contains',
          label: 'Contains',
          type: 'string',
        },
        {
          value: 'startswith',
          label: 'Start With',
          type: 'string',
        },
        {
          value: 'endswith',
          label: 'End With',
          type: 'string',
        },
        {
          value: 'equal',
          label: 'Equal',
          type: 'string',
        },
        {
          value: 'not_equal',
          label: 'Not Equal',
          type: 'string',
        },
        {
          value: 'gt',
          label: 'Greater than',
          type: 'date',
        },
        {
          value: 'lt',
          label: 'Less than',
          type: 'date',
        },
        {
          value: 'gte',
          label: 'Greater than and Equal',
          type: 'date',
        },
        {
          value: 'lte',
          label: 'Less than and Equal',
          type: 'date',
        },
        {
          value: 'equal_date',
          label: 'Equals',
          type: 'date',
        },
        {
          value: 'true',
          label: 'True',
          type: 'boolean',
        },
        {
          value: 'false',
          label: 'False',
          type: 'boolean',
        },
        {
          value: 'completed',
          label: 'Completed',
          type: 'status',
        },
        {
          value: 'running',
          label: 'Running',
          type: 'status',
        },
        {
          value: 'failed',
          label: 'Failed',
          type: 'status',
        },
        {
          value: 'cached',
          label: 'Cached',
          type: 'status',
        },
      ],
    },
    filterValue: '',
  };
  return JSON.parse(JSON.stringify(initialFilterState));
};
const FilterComponent = ({
  children,
  filters,
  setFilter,
  getInitials,
}: any) => {
  const dispatch = useDispatch();
  const [applyFilter, setApplyFilter] = useState(false);
  const [searchText, setSearchText] = useState(false);
  const [showInBar, setShowInbar] = useState(false);
  const members = useSelector(organizationSelectors.myMembers);
  const pipelines = useSelector(pipelineSelectors.myPipelines);
  const stacks = useSelector(stackSelectors.mystacks);
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  console.log(members, 'members');
  function handleChange(filter: any, key: string, value: string) {
    filter[key].selectedValue = filter[key].options.filter(
      (option: any) => option.value === value,
    )[0];
    if (key === 'contains' && (value === 'true' || value === 'false')) {
      filter.filterValue = value;
      setFilter([...filters]);
      return;
    }

    if (key === 'column') {
      filter.contains.selectedValue = { value: '', label: '', type: '' };
      filter.filterValue = '';
    }

    setFilter([...filters]);
    localStorage.setItem('logical_operator', JSON.stringify('and'));
  }

  function handleChangeForStatus(filter: any, value: string) {
    //  handleValueFieldChange(filter, value)

    filter['contains'].selectedValue = filter['contains'].statusOption.filter(
      (option: any) => option.value === value,
    )[0];

    filter.filterValue = value;

    setFilter([...filters]);
    localStorage.setItem('logical_operator', JSON.stringify('and'));
  }
  function handleChangeForShared(filter: any, key: string, value: string) {
    //  handleValueFieldChange(filter, value)

    filter[key].selectedValue = filter[key].options.filter(
      (option: any) => option.value === value,
    )[0];

    if (key === 'contains' && (value === 'true' || value === 'false')) {
      filter.filterValue = value;
      setFilter([...filters]);
      return;
    }

    setFilter([...filters]);
    localStorage.setItem('logical_operator', JSON.stringify('and'));
  }
  function handleChangeForSearchable(field: any, value: string) {
    // filter[key].selectedValue =
    field.filterValue = value;

    setFilter([...filters]);
  }
  function callActionForUsers(name: string) {
    if (name) {
      dispatch(organizationActions.getMembers({ name: 'contains:' + name }));
    } else {
      dispatch(organizationActions.getMembers({}));
    }
  }

  function callActionForPipelines(name: string) {
    if (name) {
      dispatch(
        pipelinesActions.getMy({
          workspace: selectedWorkspace,
          name: 'contains:' + name,
        }),
      );
    } else {
      dispatch(pipelinesActions.getMy({ workspace: selectedWorkspace }));
    }
  }
  function callActionForStacks(name: string) {
    if (name) {
      dispatch(
        stacksActions.getMy({
          workspace: selectedWorkspace,
          name: 'contains:' + name,
        }),
      );
    } else {
      dispatch(stacksActions.getMy({ workspace: selectedWorkspace }));
    }
  }

  function handleValueFieldChange(field: any, value: string) {
    field.filterValue = value;

    setFilter([...filters]);

    localStorage.setItem('logical_operator', JSON.stringify('and'));
  }

  function addAnotherFilter() {
    setFilter([...filters, getInitials()]);
  }

  function hanldeDelete(index: number) {
    filters.splice(index, 1);
    setFilter([...filters]);
  }

  const selectStyles = {
    control: (base: any) => ({
      width: '146px',
      borderRadius: 0,
      border: '1px solid grey',
      height: '40px',
      fontSize: '12px',
      display: 'flex',
      fontFamily: 'Rubik',

      // ...base,
    }),
    singleValue: (provided: any) => ({
      ...provided,
      fontSize: '12px',
      fontFamily: 'Rubik',
    }),
    option: (provided: any) => ({
      ...provided,
      fontSize: '12px',
      fontFamily: 'Rubik',
    }),
  };

  function checkForName(typeName: string, value: string) {
    if (typeName === 'Author') {
      const member = members.filter((item) => item.id === value);

      return member[0].name;
    }
    if (typeName === 'Pipeline') {
      const pipeline = pipelines.filter((item) => item.id === value);
      return `${pipeline[0].name} ( v${pipeline[0].version} )`;
    }
    if (typeName === 'Stack Name') {
      const stack = stacks.filter((item) => item.id === value);
      return stack[0].name;
    } else {
      return value;
    }
    // switch (typeName) {
    //   case 'Author':
    //     members.filter((item) => {
    //       if (item.id === value) {
    //         return item.name;
    //       }
    //     });
    //     break;
    //   case 'Pipeline Name':
    //     pipelines.filter((item) => {
    //       if (item.id === value) {
    //         return item.name;
    //       }
    //     });
    //     break;
    //   case 'Stack Name':
    //     stacks.filter((item) => {
    //       if (item.id === value) {
    //         return item.name;
    //       }
    //     });
    //     break;

    //   default:
    //     break;
    // }
  }
  const authorOptions = members.map((item: any) => {
    return {
      label: item.name as string,
      value: item.id as string,
    };
  }) as any;
  const pipelinesOptions = pipelines.map((item: any) => {
    return {
      label: `${item.name} ( v${item.version})` as string,
      value: item.id as string,
    };
  }) as any;
  const stacksOptions = stacks.map((item: any) => {
    return {
      label: item.name as string,
      value: item.id as string,
    };
  }) as any;
  const valueField = (filter: any) => {
    switch (filter?.contains.selectedValue.type) {
      case 'string':
        return (
          <Box style={{ width: '146px' }}>
            <FormTextField
              label={''}
              placeholder={''}
              value={filter.filterValue}
              onChange={(value: string) =>
                handleValueFieldChange(filter, value)
              }
              style={{
                borderRadius: 0,
                width: '146px',
                fontSize: '12px',
                color: '#424240',
              }}
            />
          </Box>
        );

      case 'date':
        const ExampleCustomInput = forwardRef(
          ({ value, onClick }: any, ref: any) => (
            <div
              className={`${styles.datePickerField} justify-content-between`}
              onClick={onClick}
              ref={ref}
            >
              <div
                style={{
                  fontSize: '12px',
                  fontFamily: 'Rubik',
                }}
              >
                {value}
              </div>
              <div>
                <icons.calendar size={iconSizes.md} color={iconColors.grey} />
              </div>
            </div>
          ),
        );
        // date-picker
        return (
          <Box style={{ width: '146px' }}>
            <DatePicker
              selected={filter.filterValue}
              onChange={(value: any) => {
                handleValueFieldChange(filter, value);
              }}
              customInput={<ExampleCustomInput />}
            />
          </Box>
        );
      default:
        return (
          <Box style={{ width: '146px' }}>
            <FormTextField
              label={''}
              placeholder={''}
              disabled
              value={filter.filterValue}
              style={{
                borderRadius: 0,
                width: '146px',
                fontSize: '12px',
                color: '#424240',
              }}
            />
          </Box>
        );
    }
  };

  function handleValueFieldChangeOnSearch(value: string) {
    if (value) {
      setFilter([
        {
          column: {
            selectedValue: { value: 'id', label: 'ID', type: 'string' },
          },
          contains: {
            selectedValue: {
              value: 'contains',
              label: 'Contains',
              type: 'string',
            },
          },
          filterValue: value,
        },
        {
          column: {
            selectedValue: { value: 'name', label: 'Name', type: 'string' },
          },
          contains: {
            selectedValue: {
              value: 'contains',
              label: 'Contains',
              type: 'string',
            },
          },
          filterValue: value,
        },
        {
          column: {
            selectedValue: {
              value: 'version',
              label: 'Version',
              type: 'string',
            },
          },
          contains: {
            selectedValue: {
              value: 'contains',
              label: 'Contains',
              type: 'string',
            },
          },
          filterValue: value,
        },
      ]);
      localStorage.setItem('logical_operator', JSON.stringify('or'));
    } else {
      setFilter([getInitials()]);
      localStorage.setItem('logical_operator', JSON.stringify('and'));
    }
  }

  function getSecondColumnOptions(options: any, type: any) {
    return options.filter((o: any) => o.type === type);
  }
  const validFilters = filters?.filter((item: any) => item.filterValue);

  return (
    <FlexBox.Column fullWidth>
      <div className={styles.inputRow}>
        <Box marginRight="md" marginTop="md">
          <SearchInputField
            placeholder={'Search'}
            value={searchText ? filters[0]?.filterValue : ''}
            disabled={applyFilter || showInBar}
            onChange={(value: string) => {
              setSearchText(value ? true : false);
              handleValueFieldChangeOnSearch(value);
            }}
          />
        </Box>

        <FlexBox
          fullWidth
          className="border  rounded rounded-4 p-2 align-item-center"
        >
          <Box
            onClick={() => {
              !searchText && setApplyFilter(!applyFilter);
            }}
            style={{
              width: '33px',
              height: '28px',
              background: '#fff',
              borderRadius: '4px',
            }}
          >
            <icons.funnelFill
              style={{ padding: '5px 0px 0px 7px' }}
              size={iconSizes.sm}
              color={searchText ? iconColors.grey : iconColors.primary}
            />
          </Box>
          <Box
            style={{ padding: '5px 0px 0px 7px', display: 'flex' }}
            className="text-muted h5"
          >
            {/* Filter your stack */}
            {!applyFilter && !filters[0]?.filterValue ? (
              <Paragraph className={styles.filterplaceholder}>
                Filter list
                {console.log(filters, 'filters1')}
              </Paragraph>
            ) : filters[0]?.filterValue && !applyFilter && !searchText ? (
              validFilters.map((filter: any, index: number) => {
                return (
                  <FlexBox.Row key={index} className={styles.tile}>
                    <Box
                      onClick={() => {
                        if (filters.length === 1) {
                          setShowInbar(false);
                        }
                        hanldeDelete(index);
                      }}
                    >
                      {`${filter.column.selectedValue.label} ${
                        filter.column.selectedValue.label === 'Shared' ||
                        filter.column.selectedValue.label === 'Status'
                          ? 'is'
                          : filter.column.selectedValue.label === 'Pipeline' ||
                            filter.column.selectedValue.label ===
                              'Stack Name' ||
                            filter.column.selectedValue.label === 'Author'
                          ? 'Equals'
                          : filter.contains.selectedValue.label
                      } ${
                        typeof filter.filterValue === 'string'
                          ? checkForName(
                              filter.column.selectedValue.label,
                              filter.filterValue,
                            )
                          : formatDateToDisplayWithoutTime(filter.filterValue)
                      }`}
                    </Box>

                    <Box
                      onClick={() => {
                        if (filters.length === 1) {
                          setShowInbar(false);
                        }
                        hanldeDelete(index);
                      }}
                    >
                      <icons.closeWithBorder
                        style={{ paddingLeft: '7px' }}
                        size={iconSizes.sm}
                        color={iconColors.grey}
                      />
                    </Box>
                  </FlexBox.Row>
                );
              })
            ) : (
              <Paragraph className={styles.filterplaceholder}>
                Filter list
              </Paragraph>
            )}
            {!applyFilter && !filters[0]?.filterValue ? null : filters[0]
                ?.column?.selectedValue.label &&
              !applyFilter &&
              !searchText ? (
              <Box
                onClick={() => {
                  setFilter([getInitials()]);
                  setShowInbar(false);
                }}
              >
                <icons.closeWithBorder
                  style={{ paddingLeft: '7px' }}
                  size={iconSizes.sm}
                  color={iconColors.grey}
                />
              </Box>
            ) : null}
          </Box>
        </FlexBox>
      </div>

      {applyFilter && (
        <Box
          className="mb-4 mt-19"
          style={{ marginLeft: '20px', width: '530px' }}
        >
          <Paragraph
            className="h3 text-muted"
            color="black"
            style={{ fontSize: '16px' }}
          >
            Custom Filtering
          </Paragraph>
          {filters.map((filter: any, index: number) => {
            return (
              <FlexBox.Row key={index} className="mb-1">
                <Box
                  className="mr-4 mt-5 h4 text-muted"
                  style={{
                    fontSize: '12px',
                    width: '46px',
                    color: '#424240',
                  }}
                >
                  {index === 0 ? 'Where' : 'And'}
                </Box>
                <Box style={{ width: '146px' }}>
                  <FormDropdownField
                    label={''}
                    onChange={(value: string) => {
                      setShowInbar(true);
                      handleChange(filter, 'column', value);
                    }}
                    placeholder={'Column Name'}
                    value={filter.column.selectedValue.value}
                    options={filter.column.options}
                    style={{
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                      width: '146px',
                      fontSize: '12px',
                      color: '#424240',
                      fontFamily: 'Rubik',
                    }}
                  />
                </Box>

                {filter?.column?.selectedValue?.value === 'status' ? (
                  <>
                    <FlexBox.Row key={index} className="mb-1">
                      <FormDropdownField
                        label={''}
                        disabled={!filter.column.selectedValue.type}
                        placeholder={'category'}
                        style={{
                          borderRadius: 0,
                          width: '146px',
                          fontSize: '12px',
                          color: '#424240',
                          fontFamily: 'Rubik',
                        }}
                        onChange={(value: string) =>
                          // handleChange(filter, 'contains', value)
                          handleChangeForStatus(filter, value)
                        }
                        value={filter.contains.selectedValue.value}
                        options={filter.column.statusOption}
                      />
                    </FlexBox.Row>
                  </>
                ) : filter?.column?.selectedValue?.value === 'is_shared' ||
                  filter?.column?.selectedValue?.value === 'user_id' ||
                  filter?.column?.selectedValue?.value === 'pipeline_id' ||
                  filter?.column?.selectedValue?.value === 'stack_id' ? (
                  <>
                    <FlexBox.Row className="mb-1">
                      <FormTextField
                        label={''}
                        placeholder={''}
                        disabled
                        value={
                          filter?.column?.selectedValue?.value === 'is_shared'
                            ? 'is'
                            : 'equals'
                        }
                        style={{
                          borderRadius: 0,
                          width: '146px',
                          fontSize: '12px',
                          color: '#424240',
                        }}
                      />
                      {filter?.column?.selectedValue?.value === 'is_shared' ? (
                        <FormDropdownField
                          label={''}
                          disabled={!filter?.column?.selectedValue?.type}
                          placeholder={'category'}
                          style={{
                            borderRadius: 0,
                            width: '146px',
                            fontSize: '12px',
                            color: '#424240',
                            fontFamily: 'Rubik',
                          }}
                          onChange={
                            (value: string) =>
                              handleChangeForShared(filter, 'contains', value)
                            // handleChangeForStatus(filter, value)
                          }
                          value={filter?.contains?.selectedValue?.value}
                          options={getSecondColumnOptions(
                            filter.contains.options,
                            filter.column.selectedValue.type,
                          )}
                        />
                      ) : // <></>
                      filter?.column?.selectedValue?.value === 'pipeline_id' ? (
                        <Select
                          // getOptionLabel={(option: any) => option.name}
                          // getOptionValue={(option: any) => option.id}
                          options={pipelinesOptions}
                          defaultValue={pipelinesOptions.filter((el: any) => {
                            return filters.some((f: any) => {
                              return f.filterValue === el.value;
                            });
                          })}
                          styles={selectStyles}
                          onInputChange={(e: any) => callActionForPipelines(e)}
                          onChange={(value: any) => {
                            if (value) {
                              handleChangeForSearchable(filter, value.value);
                            } else {
                              handleChangeForSearchable(filter, '');
                            }
                          }}
                          isClearable={true}
                          // value={'role'}
                          className={styles.searchableInput}
                          // classNamePrefix="select"
                        />
                      ) : filter?.column?.selectedValue?.value ===
                        'stack_id' ? (
                        <Select
                          // getOptionLabel={(option: any) => option.name}
                          // getOptionValue={(option: any) => option.id}
                          options={stacksOptions}
                          defaultValue={stacksOptions.filter((el: any) => {
                            return filters.some((f: any) => {
                              return f.filterValue === el.value;
                            });
                          })}
                          styles={selectStyles}
                          onInputChange={(e: any) => callActionForStacks(e)}
                          onChange={(value: any) => {
                            if (value) {
                              handleChangeForSearchable(filter, value.value);
                            } else {
                              handleChangeForSearchable(filter, '');
                            }
                          }}
                          isClearable={true}
                          // value={'role'}
                          className={styles.searchableInput}
                          // classNamePrefix="select"
                        />
                      ) : (
                        <Select
                          // getOptionLabel={(option: any) => option.name}
                          // getOptionValue={(option: any) => option.id}
                          options={authorOptions}
                          defaultValue={authorOptions.filter((el: any) => {
                            return filters.some((f: any) => {
                              return f.filterValue === el.value;
                            });
                          })}
                          styles={selectStyles}
                          onInputChange={(e: any) => callActionForUsers(e)}
                          onChange={(value: any) => {
                            console.log(value, 'valuevalue');
                            if (value) {
                              handleChangeForSearchable(filter, value.value);
                            } else {
                              handleChangeForSearchable(filter, '');
                            }
                          }}
                          isClearable
                          // value={'role'}
                          className={styles.searchableInput}
                          // classNamePrefix="select"
                          // isClearable={false}
                        />
                      )}
                    </FlexBox.Row>
                  </>
                ) : (
                  <>
                    <FlexBox.Row className="mb-1">
                      <FormDropdownField
                        label={''}
                        disabled={!filter.column.selectedValue.type}
                        placeholder={'category'}
                        onChange={(value: string) =>
                          handleChange(filter, 'contains', value)
                        }
                        value={filter.contains.selectedValue.value}
                        options={getSecondColumnOptions(
                          filter.contains.options,
                          filter.column.selectedValue.type,
                        )}
                        style={{
                          borderRadius: 0,
                          width: '146px',
                          fontSize: '12px',
                          color: '#424240',
                          fontFamily: 'Rubik',
                        }}
                      />
                      {valueField(filter)}
                    </FlexBox.Row>
                  </>
                )}

                <Box
                  onClick={() => {
                    if (filters.length === 1) {
                      setShowInbar(false);
                    }
                    hanldeDelete(index);
                  }}
                  className={styles.removeIcon}
                >
                  <icons.delete
                    style={{ padding: '7px 0px 0px 7px' }}
                    size={iconSizes.sm}
                    color={iconColors.grey}
                  />
                </Box>
              </FlexBox.Row>
            );
          })}
          <FlexBox.Row
            className="mt-5"
            justifyContent="end"
            onClick={addAnotherFilter}
          >
            <icons.simplePlus size={iconSizes.md} color={iconColors.darkGrey} />
            <Paragraph
              className="h3 text-muted ml-1 mt-2"
              style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#747474',
                cursor: 'pointer',
              }}
            >
              Add Condition
            </Paragraph>
          </FlexBox.Row>
        </Box>
      )}
      {children}
    </FlexBox.Column>
  );
};

export default FilterComponent;
