// import React, { useEffect, useRef, useState } from 'react';
import React from 'react'
import { Bar, Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { sessionSelectors } from '../../../../redux/selectors';
import { FullWidthSpinner } from '../../spinners';
import { artifactHtml } from './artifactVisualizationService';
const Chart = require('chart.js/auto');

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    },
    {
      label: 'My First Dataset',
      data: [6, 9, 28, 18, 65, 55, 45],
      backgroundColor: 'rgba(205, 99, 132, 0.2)',
      borderColor: 'rgba(0, 0, 0, 1)',
      borderWidth: 1,
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
      <div>
        {/* <Line data={data} options={options} /> */}
        ArtifactVisualization
      </div>
    )
}

export default ArtifactVisualization
