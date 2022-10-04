import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

const SaveUserEmail = ({
  userId,
  email,
  email_opted_in,
  authenticationToken,
}: {
  userId: string,
  email: string,
  email_opted_in: any,
  authenticationToken: string,
}): Promise<TUser> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.userEmail(userId)),
    method: httpMethods.put,
    authenticationToken,
    headers: {
      'Content-Type': 'application/json',
    },
    data: { email, email_opted_in },
  });

export default SaveUserEmail;