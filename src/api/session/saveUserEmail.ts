import { fetchApi } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

const SaveUserEmail = ({
  userId,
  email,
}: {
  userId: string,
  email: string
}): Promise<TUser> =>
  fetchApi({
    url: apiUrl(endpoints.userEmail(userId)),
    method: httpMethods.put,
    headers: {
      'Content-Type': 'application/json',
    },
    data: { email, email_opted_in: true },
  });

export default SaveUserEmail;