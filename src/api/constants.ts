export const httpMethods = {
  post: 'POST',
  get: 'GET',
  patch: 'PATCH',
  put: 'PUT',
  delete: 'DELETE',
};

export const BASE_API_URL = process.env.REACT_APP_BASE_API_URL as string;
export const HUB_API_URL = process.env.REACT_APP_HUB_API_URL as string;

// https://appserver.zenml.io/api/v1
// http://localhost:8080/api/v1
