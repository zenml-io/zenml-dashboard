import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export { useDispatch, useSelector };

export const useRequestOnMount = (action: any, param?: any): void => {
  const dispatch = useDispatch();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!isMounted) {
      dispatch(action(param));
      setIsMounted(true);
    }
  }, [isMounted, setIsMounted, action, dispatch, param]);
};
