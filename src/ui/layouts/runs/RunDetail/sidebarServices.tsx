import axios from 'axios';

export const fetchStepData = async (selectedNode: any, authToken: any) => {
    const data = axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/steps/${selectedNode.execution_id}`,
        {
            headers: {
                Authorization: `bearer ${authToken}`,
            },
        },
    ).then((response) => {
        return response?.data;
    }).catch(err => {
        return null;
    })

    return data;
};

export const fetchStepLogs = async (selectedNode: any, authToken: any) => {
    const logs = axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/steps/${selectedNode.execution_id}/logs`,
        {
            headers: {
                Authorization: `bearer ${authToken}`,
            },
        },
    ).then((response) => {
        return response?.data;
    }).catch(err => {
        return null;
    })
    return logs;
}

export const fetchArtifactData = async (selectedNode: any, authToken: any) => {
    const data = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/artifacts/${selectedNode.execution_id}`,
        {
            headers: {
                Authorization: `bearer ${authToken}`,
            },
        },
    ).then((response) => {
        return response.data
    }).catch(err => {
        return null;
    })
    return data;
};

export async function artifactService(artifactId: any, authToken: any) {

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


export async function artifactHTML(artifactId: any, authToken: any) {
    fetch(`${process.env.REACT_APP_BASE_API_URL}/artifacts/${artifactId}/visualize`,{
        headers:{
            Authorization: `bearer ${authToken}`,
        }
    })
        .then((response:any) => {
            const contentLength = response.headers.get('content-length');
            console.log('API response size: ', contentLength);
            const reader = response.body.getReader();
            let receivedLength = 0;
            reader.read().then(function processResult(result:any) {
                if (result.done) {
                    console.log('API response fully received!');
                    return;
                }
                receivedLength += result.value.length;
                console.log(`Received ${receivedLength} bytes of API response so far.`);
                return reader.read().then(processResult);
            });
            return response.json(); // if the response is JSON data
        })
        .then(data => {
            // Do something with the API response data
        })
        .catch(error => {
            console.error('API request failed: ', error);
        });
}