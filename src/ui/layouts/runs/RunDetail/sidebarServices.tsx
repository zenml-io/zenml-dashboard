import axios from 'axios';

interface MyData {
    // Define the interface for your data here
    type: string
    value: string
}


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


export async function artifactHTML(artifactId: any, authToken: any, flag: boolean) {

    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    let _flag = false;
    const response = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/artifacts/${artifactId}/visualize`,
        {
            headers: {
                Authorization: `bearer ${authToken}`,
            },
            onDownloadProgress: progressEvent => {
                const contentLength = progressEvent.total;
                const loadedBytes = progressEvent.loaded;
                console.log(`API response size: ${contentLength} bytes, loaded: ${loadedBytes} bytes`);
                if (loadedBytes > 1 * 1024 * 1024) {
                    if (_flag == false) {
                        const confirmed = window.confirm('The API response size exceeds 5MB. Do you want to continue?');
                        _flag = confirmed;
                    }
                    // console.log("__confirmed", confirmed)
                    if (_flag == false) {
                        source.cancel(`API response size exceeds 5MB`);
                    }
                }
            },
            cancelToken: source.token
        },
    ).then((response) => {
        return response
    }).catch(error => {
        if (axios.isCancel(error)) {
            console.log("error.message", error.message);
            // return error
        } else {
            console.error('API request failed', error);
            return error
            // Your code to handle the error goes here
        }
    });
    return response;
}
// export async function artifactHTML(artifactId: any, authToken: any, flag: boolean) {
//     return fetch(`${process.env.REACT_APP_BASE_API_URL}/artifacts/${artifactId}/visualize`, {
//         headers: {
//             Authorization: `bearer ${authToken}`,
//         }
//     }).then((response: any) => {
//         const contentLength = response.headers.get('content-length');
//         console.log('API_response_size: ', contentLength);
//         const reader = response.body.getReader();
//         let receivedLength = 0;
//         reader.read().then(function processResult(result: any) {
//             if (result.done) {
//                 console.log('API response fully received!');
//                 return;
//             }
//             receivedLength += result.value.length;
//             console.log(`___Received ${receivedLength} bytes of API response so far. flag ${flag}`);
//             // if (receivedLength == 5242880 || flag == false) {
//             //     return ({ msg: "resposne greater then 5MB do you want to continue" })
//             // }
//             return reader.read().then(processResult);
//         });
//         // return response.json(); // if the response is JSON data
//         return response // if the response is JSON data
//     }).then(data => {
//         console.log("__UNAUTH_HTML__DATA", data)
//         return data
//         // Do something with the API response data
//     })
//         .catch(error => {
//             console.error('API request failed: ', error);
//         });
// }