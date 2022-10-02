export const getContent = ({
  pageIndex,
  items,
  itemsPerPage,
}: {
  pageIndex: number;
  items: any;
  itemsPerPage: any;
}) =>
  items.slice(
    pageIndex * itemsPerPage,
    pageIndex * itemsPerPage + itemsPerPage,
  );
