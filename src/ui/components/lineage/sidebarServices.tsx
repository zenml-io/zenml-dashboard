import axios from 'axios';

export const fetchStepData = async (selectedNode: any, authToken: any) => {
    console.log("authToken", typeof(authToken))
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