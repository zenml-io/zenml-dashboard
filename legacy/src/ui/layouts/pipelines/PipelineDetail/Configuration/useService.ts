import axios from 'axios';

export const fetchSchedule = async (schedule_id: any, authToken: any) => {
  const data = axios
    .get(`${process.env.REACT_APP_BASE_API_URL}/schedules/${schedule_id}`, {
      headers: {
        Authorization: `bearer ${authToken}`,
      },
    })
    .then((response) => {
      return response?.data;
    })
    .catch((err) => {
      return null;
    });

  return data;
};

export const useService = async () => {
  return 0;
};
