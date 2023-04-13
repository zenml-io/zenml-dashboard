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

export async function artifactVisulizationService(artifactId: any, authToken: any) {

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
                    if (_flag === false) {
                        const confirmed = window.confirm('The API response size exceeds 5MB. Do you want to continue?');
                        _flag = confirmed;
                    }
                    if (_flag === false) {
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
            // return error
        } else {
            return error
        }
    });
    return response;
}
