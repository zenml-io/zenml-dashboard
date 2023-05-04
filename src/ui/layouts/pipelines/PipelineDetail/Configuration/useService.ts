import axios from 'axios';

export const fetchSchedule = async (schedule_id: any, authToken: any) => {
  // const source = axios.CancelToken.source();

  const data = axios
    .get(`${process.env.REACT_APP_BASE_API_URL}/schedules/${schedule_id}`, {
      headers: {
        Authorization: `bearer ${authToken}`,
      },
      // cancelToken: source.token
    })
    .then((response) => {
      return response?.data;
    })
    .catch((err) => {
      return null;
      // if (axios.isCancel(err)) {
      //     console.log('Request canceled');
      // } else {
      //     console.log(err);
      //     return null;
      //   }
    });

  // // Cancel the request after 5 seconds
  // setTimeout(() => {
  //     source.cancel('Request canceled due to timeout');
  // }, 5000);
  return data;
};

export const useService = async () => {
  return 0;
};
