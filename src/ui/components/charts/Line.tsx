import React from 'react';
import { XYPlot, LineSeries } from 'react-vis';
import 'react-vis/dist/style.css';
import styles from './charts.module.scss';

export const LineChart: React.FC<{ data: number[] }> = ({ data }) => {
  const xyData = data.map((d, i) => ({ x: i, y: d }));

  return (
    <XYPlot height={40} width={150} margin={0}>
      <LineSeries data={xyData} className={styles.primary} />
    </XYPlot>
  );
};
