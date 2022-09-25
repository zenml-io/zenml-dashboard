/* eslint-disable */

import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { stackPagesActions } from '../../../../../redux/actions';
import {
  stackPagesSelectors,
  stackSelectors,
} from '../../../../../redux/selectors';
import { formatDateToDisplay } from '../../../../../utils/date';

interface ServiceInterface {
  openStackIds: TId[];
  setOpenStackIds: (ids: TId[]) => void;
  fetching: boolean;
  filteredStacks: TStack[];
  setSelectedRunIds: (ids: TId[]) => void;
}

// export const useService = (): ServiceInterface => {
interface filterValue {
  label: string;
  type: string;
  value: string;
}
export const useService = (
  filter: {
    column: filterValue;
    type: filterValue;
    value: string;
  }[],
): ServiceInterface => {
  const dispatch = useDispatch();

  const [openStackIds, setOpenStackIds] = useState<TId[]>([]);
  const [filteredStacks, setFilteredStacks] = useState<TStack[]>([]);

  const fetching = useSelector(stackPagesSelectors.fetching);

  const currentWorkspace = useSelector(stackPagesSelectors.currentWorkspace);

  const Stacks = useSelector(stackSelectors.mystacks);

  useEffect(() => {
    let orderedStacks = _.sortBy(Stacks, (stack: TStack) =>
      new Date(stack.creationDate).getTime(),
    ).reverse();

    const isValidFilter = filter.map((f) => f.value).join('');
    if (isValidFilter) {
      filter.forEach((f) => {
        if (f.column.type === 'string') {
          if (f.type.value === 'contains') {
            orderedStacks = orderedStacks.filter((os: any) => {
              if (f.column.value && f.value) {
                return os[f.column.value]
                  .toLowerCase()
                  .includes(f.value.toLowerCase());
              }
              return true;
            });
          }

          if (f.type.value === 'start_with') {
            orderedStacks = orderedStacks.filter((os: any) => {
              if (f.column.value && f.value) {
                return os[f.column.value]
                  .toLowerCase()
                  .startsWith(f.value.toLowerCase());
              }
              return true;
            });
          }

          if (f.type.value === 'end_with') {
            orderedStacks = orderedStacks.filter((os: any) => {
              if (f.column.value && f.value) {
                return os[f.column.value]
                  .toLowerCase()
                  .endsWith(f.value.toLowerCase());
              }
              return true;
            });
          }

          if (f.type.value === 'equal') {
            orderedStacks = orderedStacks.filter((os: any) => {
              if (f.column.value && f.value) {
                return (
                  os[f.column.value].toLowerCase() === f.value.toLowerCase()
                );
              }
              return true;
            });
          }
          if (f.type.value === 'not_equal') {
            orderedStacks = orderedStacks.filter((os: any) => {
              if (f.column.value && f.value) {
                return (
                  os[f.column.value].toLowerCase() !== f.value.toLowerCase()
                );
              }
              return true;
            });
          }
        }

        if (f.column.type === 'date') {
          if (f.type.value === 'greater') {
            orderedStacks = orderedStacks.filter((os: any) => {
              if (f.column.value && f.value) {
                const itemFormatedDateToCompare = formatDateToDisplay(
                  os[f.column.value],
                )
                  .split('.')
                  .join('-');
                const selectedFormatedDateToCompare = formatDateToDisplay(
                  new Date(f.value),
                )
                  .split('.')
                  .join('-');

                return (
                  selectedFormatedDateToCompare < itemFormatedDateToCompare
                );
              }
              return true;
            });
          }
          if (f.type.value === 'less') {
            orderedStacks = orderedStacks.filter((os: any) => {
              if (f.column.value && f.value) {
                const itemFormatedDateToCompare = formatDateToDisplay(
                  os[f.column.value],
                )
                  .split('.')
                  .join('-');
                const selectedFormatedDateToCompare = formatDateToDisplay(
                  new Date(f.value),
                )
                  .split('.')
                  .join('-');

                return (
                  selectedFormatedDateToCompare > itemFormatedDateToCompare
                );
              }
              return true;
            });
          }
          if (f.type.value === 'equal_date') {
            orderedStacks = orderedStacks.filter((os: any) => {
              if (f.column.value && f.value) {
                const itemFormatedDateToCompare = formatDateToDisplay(
                  os[f.column.value],
                )
                  .split('.')
                  .join('-');
                const selectedFormatedDateToCompare = formatDateToDisplay(
                  new Date(f.value),
                )
                  .split('.')
                  .join('-');

                return (
                  itemFormatedDateToCompare === selectedFormatedDateToCompare
                );
              }
              return true;
            });
          }
        }
      });
    }

    setFilteredStacks(orderedStacks);
  }, [filter]);

  const setSelectedRunIds = (runIds: TId[]) => {
    dispatch(stackPagesActions.setSelectedRunIds({ runIds }));
  };

  return {
    openStackIds,
    setOpenStackIds,
    fetching,
    filteredStacks,
    setSelectedRunIds,
  };
};
