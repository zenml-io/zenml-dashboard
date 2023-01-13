import moment from 'moment';
export const filterObjectForParam = (filters: any): object => {
  console.log(filters, 'filterObjectForParam');
  const UTCformatter = (preDate: any) => moment.utc(preDate).toDate();
  return filters?.reduce(
    (obj: any, item: any) =>
      Object.assign(obj, {
        // [item.column.value]: item.column.value === 'created'  ? item.type.value + ':' + item.value,
        [item.column.value]:
          item.column.value === 'created'
            ? item.type.value === 'equal_date'
              ? 'equals' +
                ':' +
                moment(UTCformatter(item.value)).format('YYYY-MM-DD HH:mm:ss')
              : item.type.value +
                ':' +
                moment(UTCformatter(item.value)).format('YYYY-MM-DD HH:mm:ss')
            : item.type.type === 'status' || item.type.type === 'boolean'
            ? item.type.value
            : item.type.value + ':' + item.value,
      }),
    {},
  );
};
