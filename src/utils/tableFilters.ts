import { formatDateToDisplay } from './date';

export const getFilteredDataForTable = (data: any, filter: any) => {
  filter.forEach((f: any) => {
    // temporary because api format changed after filter implementation this need to be refactor
    if (f.column.label === 'Owner' || f.column.label === 'Author') {
      if (f.type.value === 'contains') {
        data = data.filter((os: any) => {
          if (f.column.value && f.value) {
            return os.user.name.toLowerCase().includes(f.value.toLowerCase());
          }
          return true;
        });
      }

      if (f.type.value === 'start_with') {
        data = data.filter((os: any) => {
          if (f.column.value && f.value) {
            return os[f.column.value]
              .toLowerCase()
              .startsWith(f.value.toLowerCase());
          }
          return true;
        });
      }

      if (f.type.value === 'end_with') {
        data = data.filter((os: any) => {
          if (f.column.value && f.value) {
            return os[f.column.value]
              .toLowerCase()
              .endsWith(f.value.toLowerCase());
          }
          return true;
        });
      }

      if (f.type.value === 'equal') {
        data = data.filter((os: any) => {
          if (f.column.value && f.value) {
            return os[f.column.value].toLowerCase() === f.value.toLowerCase();
          }
          return true;
        });
      }
      if (f.type.value === 'not_equal') {
        data = data.filter((os: any) => {
          if (f.column.value && f.value) {
            return os[f.column.value].toLowerCase() !== f.value.toLowerCase();
          }
          return true;
        });
      }
    }

    if (f.column.type === 'string' && f.column.label !== 'Owner') {
      if (f.type.value === 'contains') {
        data = data.filter((os: any) => {
          if (f.column.value && f.value) {
            return os[f.column.value]
              .toLowerCase()
              .includes(f.value.toLowerCase());
          }
          return true;
        });
      }

      if (f.type.value === 'start_with') {
        data = data.filter((os: any) => {
          if (f.column.value && f.value) {
            return os[f.column.value]
              .toLowerCase()
              .startsWith(f.value.toLowerCase());
          }
          return true;
        });
      }

      if (f.type.value === 'end_with') {
        data = data.filter((os: any) => {
          if (f.column.value && f.value) {
            return os[f.column.value]
              .toLowerCase()
              .endsWith(f.value.toLowerCase());
          }
          return true;
        });
      }

      if (f.type.value === 'equal') {
        data = data.filter((os: any) => {
          if (f.column.value && f.value) {
            return os[f.column.value].toLowerCase() === f.value.toLowerCase();
          }
          return true;
        });
      }
      if (f.type.value === 'not_equal') {
        data = data.filter((os: any) => {
          if (f.column.value && f.value) {
            return os[f.column.value].toLowerCase() !== f.value.toLowerCase();
          }
          return true;
        });
      }
    }

    if (f.column.type === 'date') {
      if (f.type.value === 'greater') {
        data = data.filter((os: any) => {
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

            return selectedFormatedDateToCompare < itemFormatedDateToCompare;
          }
          return true;
        });
      }
      if (f.type.value === 'less') {
        data = data.filter((os: any) => {
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

            return selectedFormatedDateToCompare > itemFormatedDateToCompare;
          }
          return true;
        });
      }
      if (f.type.value === 'equal_date') {
        data = data.filter((os: any) => {
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

            return itemFormatedDateToCompare === selectedFormatedDateToCompare;
          }
          return true;
        });
      }
    }

    if (f.column.type === 'boolean') {
      data = data.filter((os: any) => {
        if (f.column.value && f.value) {
          const filterValue = f.type.value === 'true' ? true : false;
          return os[f.column.value] === filterValue;
        }
        return true;
      });
    }
  });
  return data;
};
