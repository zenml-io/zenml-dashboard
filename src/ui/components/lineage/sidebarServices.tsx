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
        return response?.data//Setting the response into state
    })
 
    return data; 
};

export const fetchStepLogs = async(selectedNode: any, authToken: any) => {
    const logs = axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/steps/${selectedNode.execution_id}/logs`,
        {
            headers: {
                Authorization: `bearer ${authToken}`,
            },
        },
    ).then((response) => {
        return response?.data//Setting the response into state
    })

    return logs
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
    })
    return data

};