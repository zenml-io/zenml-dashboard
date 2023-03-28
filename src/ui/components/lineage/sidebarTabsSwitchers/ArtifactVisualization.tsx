// import React, { useEffect, useRef, useState } from 'react';
import React from 'react' //eslint-disable-line
import {  Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { sessionSelectors } from '../../../../redux/selectors';
// import { FullWidthSpinner } from '../../spinners';
import { artifactHtml } from './artifactVisualizationService';
import style from './ArtifactVisualization.module.scss';

const Chart = require('chart.js/auto'); //eslint-disable-line
// color:#443E99
const data = {
  labels: ['', '', '', '', '', '', ''],
  datasets: [
    {
      label: '',
      data: [65, 59, 80, 81, 56, 55, 40],
      // backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: '#443E99',
      borderWidth: 2,
    },
    {
      label: '',
      data: [6, 9, 28, 18, 65, 55, 45],
      // backgroundColor: 'rgba(205, 99, 132, 0.2)',
      borderColor: '#443E9950',
      borderWidth: 2,
    },
  ],
};

const options = {
  scales: {
    y: {
      beginAtZero: false,
    },
  },
};
const ArtifactVisualization = ({ artifactId }: { artifactId: any }) => {

  const authToken = useSelector(sessionSelectors.authenticationToken);

  console.log("__UNAUTH_ARTIFACT_ID", artifactId)

  const html = artifactHtml(artifactId, authToken);
  
  console.log("__UNAUTH_HTML ", html)
  // if (html ==) {
  //   return <FullWidthSpinner color="black" size="md" />;
  // }

    return (
      <div className={`${style.mainContainer}`}>
        <Line data={data} options={options} />
        {/* ArtifactVisualization */}
      </div>
    )
}

export default ArtifactVisualization
