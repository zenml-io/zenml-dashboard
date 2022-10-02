import queryString from 'query-string';

export const getSearchParam = (
  location: any,
  paramName: string,
): string | null => {
  if (!location) return null;

  const params = new URLSearchParams(location.search);
  return params.get(paramName);
};

export const updateQueryParams = (queryParamsToUpdate: {
  [key: string]: string | number | any | null;
}): string => {
  const newQueryParams = {
    ...queryString.parse(window.location.search),
    ...queryParamsToUpdate,
  };
  for (const key in queryParamsToUpdate) {
    if (queryParamsToUpdate.hasOwnProperty(key)) {
      if (queryParamsToUpdate[key] === null) delete newQueryParams[key];
    }
  }

  return queryString.stringify(newQueryParams);
};
