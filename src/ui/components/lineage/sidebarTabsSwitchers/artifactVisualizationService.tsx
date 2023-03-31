import React from 'react'; //eslint-disable-line
import axios from 'axios';


export async function artifactService(artifactId:any, authToken:any){

    const response = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/artifacts/${artifactId}/visualize`,
        {
            headers: {
                Authorization: `bearer ${authToken}`,
            },
        },
    ).then((response) => {
        return response
    })
        return response;

}


