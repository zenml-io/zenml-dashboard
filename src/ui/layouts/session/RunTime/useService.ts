/* eslint-disable */

import { useState, useEffect } from 'react';

interface ServiceInterface {
  endDate: Date | null;
}

export const useService = ({ run }: { run: TRun }): ServiceInterface => {
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [intervalId, setIntervalId] = useState<any>();

  useEffect(() => {
    if (!run.kubeflowEndTime) {
      const intervalId = setInterval(() => {
        const newDate = new Date();
        newDate.setSeconds(newDate.getSeconds() + 1);
        setEndDate(newDate);
      }, 1000);
      setIntervalId(intervalId);
    } else {
      clearInterval(intervalId);
      setEndDate(run.kubeflowEndTime);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [run.id]);

  return { endDate };
};
