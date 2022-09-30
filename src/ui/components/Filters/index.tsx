import React, { forwardRef, useState } from 'react';
import {
  Box,
  Container,
  FlexBox,
  FormDropdownField,
  FormTextField,
  icons,
} from '../../components';
import { iconColors, iconSizes } from '../../../constants';
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
          label: 'false',
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
          label: 'false',
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
      options: [
        {
          value: 'name',
          label: 'Run Name',
          type: 'string',
        },
        {
          value: 'name',
          label: 'Pipeline Name',
          type: 'string',
        },
        {
          value: 'name',
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
          label: 'false',
          type: 'boolean',
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
          <FormTextField
            label={''}
            placeholder={''}
            value={filter.filterValue}
            onChange={(value: string) => handleValueFieldChange(filter, value)}
          />
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
          <DatePicker
            selected={filter.filterValue}
            onChange={(value: any) => handleValueFieldChange(filter, value)}
            customInput={<ExampleCustomInput />}
          />
        );
      default:
        return (
          <FormTextField
            label={''}
            placeholder={''}
            disabled
            value={filter.filterValue}
          />
        );
    }
  };

  function getSecondColumnOptions(options: any, type: any) {
    return options.filter((o: any) => o.type === type);
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
            {filters.map((filter: any, index: number) => {
              return (
                <FlexBox.Row key={index} className="align-items-center mb-1">
                  <Box className="mr-4 mt-5 h4 text-muted">
                    {index === 0 ? 'Where' : 'And'}
                  </Box>
                  <FormDropdownField
                    label={''}
                    onChange={(value: string) =>
                      handleChange(filter, 'column', value)
                    }
                    placeholder={'Column Name'}
                    value={filter.column.selectedValue.value}
                    options={filter.column.options}
                  />
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
                  />
                  {valueField(filter)}

                  <Box
                    onClick={() => hanldeDelete(index)}
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
              );
            })}
            <FlexBox.Row className="mt-5" onClick={addAnotherFilter}>
              <icons.simplePlus
                size={iconSizes.lg}
                color={iconColors.darkGrey}
              />
              <span className="h3 text-muted ml-1 mt-2">Add Condition</span>
            </FlexBox.Row>
          </Container>
        </Box>
      )}
      {children}
    </FlexBox.Column>
  );
};

export default FilterComponent;
