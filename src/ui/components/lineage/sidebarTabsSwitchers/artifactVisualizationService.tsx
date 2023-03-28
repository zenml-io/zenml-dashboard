import React from 'react';
import axios from 'axios';

// https://felix.develaws.zenml.io/api/v1/artifacts/029a0fdf-2b0f-46f6-b8c8-ef46974198ca/visualize
// REACT_APP_BASE_API_URL= https://felix.develaws.zenml.io/api/v1

export function artifactHtml(artifactId:any, authToken:any){
    console.log("__UNAUTH_AUTH_TOKEN: ",authToken);

    const data = axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/artifacts/${artifactId}/visualize`,
        {
            headers: {
                Authorization: `bearer ${authToken}`,
            },
        },
    ).then((response) => {
        return response?.data//Setting the response into state
    })
    return data;

}

// export function artifactImage(artifactId:any, authToken:any){
//     console.log("__UNAUTH_AUTH_TOKEN: ",authToken);

//     const data = axios.get(
//         `${process.env.REACT_APP_BASE_API_URL}/artifacts/${artifactId}/visualize`,
//         {
//             headers: {
//                 Authorization: `bearer ${authToken}`,
//             },
//         },
//     ).then((response) => {
//         return response?.data//Setting the response into state
//     })
//     return data;

// }

// export function artifactMarkdown(artifactId:any, authToken:any){
//     console.log("__UNAUTH_AUTH_TOKEN: ",authToken);

//     const data = axios.get(
//         `${process.env.REACT_APP_BASE_API_URL}/artifacts/${artifactId}/visualize`,
//         {
//             headers: {
//                 Authorization: `bearer ${authToken}`,
//             },
//         },
//     ).then((response) => {
//         return response?.data//Setting the response into state
//     })
//     return data;

// }