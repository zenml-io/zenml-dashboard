import axios from 'axios';

export const fetchStepData = async (selectedNode: any, authToken: any) => {
  const data = axios
    .get(
      `${process.env.REACT_APP_BASE_API_URL}/steps/${selectedNode.execution_id}`,
      {
        headers: {
          Authorization: `bearer ${authToken}`,
        },
      },
    )
    .then((response) => {
      return response?.data;
    })
    .catch((err) => {
      return null;
    });

  return data;
};

export const fetchStepLogs = async (selectedNode: any, authToken: any) => {
  const logs = axios
    .get(
      `${process.env.REACT_APP_BASE_API_URL}/steps/${selectedNode.execution_id}/logs`,
      {
        headers: {
          Authorization: `bearer ${authToken}`,
        },
      },
    )
    .then((response) => {
      return response?.data;
    })
    .catch((err) => {
      return null;
    });
  return logs;
};

export const fetchArtifactData = async (selectedNode: any, authToken: any) => {
  const data = await axios
    .get(
      `${process.env.REACT_APP_BASE_API_URL}/artifacts/${selectedNode.execution_id}`,
      {
        headers: {
          Authorization: `bearer ${authToken}`,
        },
      },
    )
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return null;
    });
  return data;
};

export async function artifactService(artifactId: any, authToken: any) {
  const response = await axios
    .get(
      `${process.env.REACT_APP_BASE_API_URL}/artifacts/${artifactId}/visualize`,
      {
        headers: {
          Authorization: `bearer ${authToken}`,
        },
      },
    )
    .then((response) => {
      return response;
    });
  return response;
}

// let currentId = '';
// eslint-disable-next-line
let currentResponse = {};

export const fetchArtifactVisualizationSize = async (
  artifactId: any,
  authToken: any,
) => {
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  const response = await axios
    .get(
      `${process.env.REACT_APP_BASE_API_URL}/artifacts/${artifactId}/visualize`,
      {
        headers: {
          Authorization: `bearer ${authToken}`,
        },
        onDownloadProgress: async (progressEvent) => {
          const contentLength = progressEvent.total;
          const loadedBytes = progressEvent.loaded;
          localStorage.setItem('VISUALIZATION_SIZE', contentLength);
          console.log(
            'VISUALIZATION_SIZE',
            localStorage.getItem('VISUALIZATION_SIZE'),
          );
          source.cancel(
            `API response size: ${contentLength} bytes, loaded: ${loadedBytes} bytes (cancel)`,
          );
          console.log(
            `API response size: ${contentLength} bytes, loaded: ${loadedBytes} bytes`,
          );
        },
        cancelToken: source?.token,
      },
    )
    .then((response) => {
      currentResponse = response;
      return response;
    })
    .catch((error) => {
      if (axios.isCancel(error)) {
        return {};
      } else {
        return error;
      }
    });
  return response;
};

export async function artifactVisulizationService(
  artifactId: any,
  authToken: any,
  source: any,
) {
  // console.log("cancelToken before", cancelToken)
  console.log('currentResponse before', source);

  // if(source){
  //     source.cancel(`API response size: ${"contentLength"} bytes, loaded: ${"loadedBytes"} bytes (cancel)`)
  // }

  const response = await axios.get(
    `${process.env.REACT_APP_BASE_API_URL}/artifacts/${artifactId}/visualize`,
    {
      headers: {
        Authorization: `bearer ${authToken}`,
      },
      onDownloadProgress: (progressEvent) => {
        const contentLength = progressEvent.total;
        const loadedBytes = progressEvent.loaded;
        console.log(
          `API response size: ${contentLength} bytes, loaded: ${loadedBytes} bytes`,
        );
      },
      cancelToken: source?.token,
    },
  );

  return response;
}
