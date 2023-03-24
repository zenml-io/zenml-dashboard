// import React from 'react';
import axios from 'axios';




export const fetchStepData = async (selectedNode: any, authToken: any) => {

    // console.log("__UNAUTH type : __STEP");
    const data = axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/steps/${selectedNode.execution_id}`,
        {
            headers: {
                Authorization: `bearer ${authToken}`,
            },
        },
    ).then((response) => {
        // console.log("__UNAUTH fetchMetaData Sidebar", response)
        localStorage.setItem("__STEP", JSON.stringify(response.data))
        return response?.data//Setting the response into state
    })
    return data;


};
export const fetchArtifactData = async (selectedNode: any, authToken: any) => {


    // console.log("__UNAUTH type : __STEP");
    const data = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/artifacts/${selectedNode.execution_id}`,
        {
            headers: {
                Authorization: `bearer ${authToken}`,
            },
        },
    ).then((response) => {

        // console.log("__UNAUTH fetchMetaData Sidebar artifact", response.data)
        localStorage.setItem("__ARTIFACT", JSON.stringify(response.data))
        return response.data
    })
    return data

};