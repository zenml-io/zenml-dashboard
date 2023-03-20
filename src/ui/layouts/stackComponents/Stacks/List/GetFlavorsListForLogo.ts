import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from '../../../../hooks';
import { sessionSelectors } from '../../../../../redux/selectors';

export const GetFlavorsListForLogo = () => {
  const authToken = useSelector(sessionSelectors.authenticationToken);
  const [fetching, setFetching] = useState(false);
  const [flavourList, setFlavourList] = useState([]);
  useEffect(() => {
    fetchFlavourList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchFlavourList = async () => {
    setFetching(true);
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_API_URL}/flavors?size=1000`,
      {
        headers: {
          Authorization: `bearer ${authToken}`,
        },
      },
    );

    setFlavourList(response?.data?.items);
    setFetching(false);
    //Setting the response into state
  };

  return {
    fetching,
    flavourList,
  };
};

export const GetFlavorsListForLogoByNameAndType = (type: any, name: any) => {
  const authToken = useSelector(sessionSelectors.authenticationToken);
  const [fetching, setFetching] = useState(false);
  const [flavourListBytype, setFlavourList] = useState([]);
  useEffect(() => {
    fetchFlavourList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchFlavourList = async () => {
    setFetching(true);
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_API_URL}/flavors?type=${type}&name=${name}`,
      {
        headers: {
          Authorization: `bearer ${authToken}`,
        },
      },
    );

    setFlavourList(response?.data?.items);
    setFetching(false);

    //Setting the response into state
  };

  return {
    fetching,
    flavourListBytype,
  };
};
