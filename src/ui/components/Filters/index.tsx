import React, { forwardRef, useState } from 'react';
import {
  Box,
  FlexBox,
  FormDropdownField,
  FormTextField,
  icons,
  Paragraph,
} from '../../components';
import { iconColors, iconSizes } from '../../../constants';
import { formatDateToDisplay } from '../../../utils';
import DatePicker from 'react-datepicker';

import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './filter.module.scss';
import 'react-datepicker/dist/react-datepicker.css';

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
          value: 'userName',
          label: 'Owner',
          type: 'string',
        },
        {
          value: 'isShared',
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
          value: 'start_with',
          label: 'Start With',
          type: 'string',
        },
        {
          value: 'end_with',
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
          value: 'greater',
          label: 'Greater than',
          type: 'date',
        },
        {
          value: 'less',
          label: 'Less than',
          type: 'date',
        },
        {
          value: 'equal_date',
          label: 'Equal',
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
          value: 'userName',
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
          value: 'start_with',
          label: 'Start With',
          type: 'string',
        },
        {
          value: 'end_with',
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
          value: 'greater',
          label: 'Greater than',
          type: 'date',
        },
        {
          value: 'less',
          label: 'Less than',
          type: 'date',
        },
        {
          value: 'equal_date',
          label: 'Equal',
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
          value: 'pipelineName',
          label: 'Pipeline Name',
          type: 'string',
        },
        {
          value: 'status',
          label: 'Status',
          type: 'status',
        },
        {
          value: 'stackName',
          label: 'Stack Name',
          type: 'string',
        },
        {
          value: 'userName',
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
          value: 'start_with',
          label: 'Start With',
          type: 'string',
        },
        {
          value: 'end_with',
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
          value: 'greater',
          label: 'Greater than',
          type: 'date',
        },
        {
          value: 'less',
          label: 'Less than',
          type: 'date',
        },
        {
          value: 'equal_date',
          label: 'Equal',
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
  const [applyFilter, setApplyFilter] = useState(false);

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
  }

  function handleChangeForStatus(filter: any, value: string) {
    //  handleValueFieldChange(filter, value)

    filter['contains'].selectedValue = filter['contains'].statusOption.filter(
      (option: any) => option.value === value,
    )[0];

    filter.filterValue = value;

    setFilter([...filters]);
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
  }

  function handleValueFieldChange(field: any, value: string) {
    field.filterValue = value;

    setFilter([...filters]);
  }

  function addAnotherFilter() {
    setFilter([...filters, getInitials()]);
  }

  function hanldeDelete(index: number) {
    filters.splice(index, 1);
    setFilter([...filters]);
  }

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
              style={{ borderRadius: 0, width: '146px', fontSize: '12px', color: '#424240' }}
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
              <div>{value}</div>
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
              onChange={(value: any) => handleValueFieldChange(filter, value)}
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
              style={{ borderRadius: 0, width: '146px', fontSize: '12px', color: '#424240' }}
            />
          </Box>
        );
    }
  };

  function getSecondColumnOptions(options: any, type: any) {
    return options.filter((o: any) => o.type === type);
  }

  return (
    <FlexBox.Column fullWidth>
      <FlexBox className="border border-primary rounded rounded-4 p-2 align-item-center mb-3">
        <Box
          onClick={() => setApplyFilter(!applyFilter)}
          style={{
            width: '33px',
            height: '28px',
            background: '#431D93',
            borderRadius: '4px',
          }}
        >
          <icons.funnelFill
            style={{ padding: '5px 0px 0px 7px' }}
            size={iconSizes.sm}
            color={iconColors.white}
          />
        </Box>

        <Box
          style={{ padding: '5px 0px 0px 7px', display: 'flex' }}
          className="text-muted h5"
        >
          {/* Filter your stack */}
          {!applyFilter && !filters[0]?.column?.selectedValue?.label
            ? <Paragraph className={styles.filterplaceholder}>Filter list</Paragraph>
            : filters[0]?.column?.selectedValue.label && !applyFilter
            ? filters.map((filter: any, index: number) => {
                return (
                  <FlexBox.Row key={index} className={styles.tile}>
                    <Box onClick={() => hanldeDelete(index)}>
                      {`${filter.column.selectedValue.label} ${
                        typeof filter.filterValue === 'string'
                          ? filter.filterValue
                          : formatDateToDisplay(filter.filterValue)
                      }`}
                    </Box>

                    <Box onClick={() => hanldeDelete(index)}>
                      <icons.closeWithBorder
                        style={{ paddingLeft: '7px' }}
                        size={iconSizes.sm}
                        color={iconColors.grey}
                      />
                    </Box>
                  </FlexBox.Row>
                );
              })
            : <Paragraph className={styles.filterplaceholder}>Filter list</Paragraph>}
          {!applyFilter &&
          !filters[0]?.column?.selectedValue?.label ? null : filters[0]?.column
              ?.selectedValue.label && !applyFilter ? (
            <Box
              onClick={() => {
                setFilter([]);
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
      {applyFilter && (
        <Box className="mb-4 mt-19" style={{ marginLeft: '20px', width: '530px' }}>
            <Paragraph className="h3 text-muted" color="black" style={{ fontSize: '16px' }}>
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
                      onChange={(value: string) =>
                        handleChange(filter, 'column', value)
                      }
                      placeholder={'Column Name'}
                      value={filter.column.selectedValue.value}
                      options={filter.column.options}
                      style={{
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                        width: '146px',
                        fontSize: '12px',
                        color: '#424240',
                      }}
                    />
                  </Box>
                  {/* <Box style={{ width: '146px' }}> */}
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
                  ) : filter?.column?.selectedValue?.value === 'isShared' ? (
                    <>
                      <FlexBox.Row className="mb-1">
                        <FormTextField
                          label={''}
                          placeholder={''}
                          disabled
                          value={'is'}
                          style={{
                            borderRadius: 0,
                            width: '146px',
                            fontSize: '12px',
                            color: '#424240',
                          }}
                        />
                        <FormDropdownField
                          label={''}
                          disabled={!filter?.column?.selectedValue?.type}
                          placeholder={'category'}
                          style={{
                            borderRadius: 0,
                            width: '146px',
                            fontSize: '12px',
                            color: '#424240',
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
                          }}
                        />
                        {valueField(filter)}
                      </FlexBox.Row>
                    </>
                  )}
                  {/* </Box> */}

                  <Box
                    onClick={() => hanldeDelete(index)}
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
            <FlexBox.Row className="mt-5" justifyContent='end' onClick={addAnotherFilter}>
              <icons.simplePlus
                size={iconSizes.md}
                color={iconColors.darkGrey}
              />
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
