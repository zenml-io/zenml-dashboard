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

export const fetchStepLogs = async (id: string, authToken: any) => {
  const logs = axios
    .get(`${process.env.REACT_APP_BASE_API_URL}/steps/${id}/logs`, {
      headers: {
        Authorization: `bearer ${authToken}`,
      },
    })
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
      `${process.env.REACT_APP_BASE_API_URL}/artifact_versions/${selectedNode.execution_id}`,
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
      `${process.env.REACT_APP_BASE_API_URL}/artifact_versions/${artifactId}/visualize`,
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
      `${process.env.REACT_APP_BASE_API_URL}/artifact_versions/${artifactId}/visualize`,
      {
        headers: {
          Authorization: `bearer ${authToken}`,
        },
        onDownloadProgress: async (progressEvent) => {
          const contentLength = progressEvent.total;
          const loadedBytes = progressEvent.loaded;
          localStorage.setItem('VISUALIZATION_SIZE', contentLength);
          source.cancel(
            `API response size: ${contentLength} bytes, loaded: ${loadedBytes} bytes (cancel)`,
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
  const response = await axios.get(
    `${process.env.REACT_APP_BASE_API_URL}/artifact_versions/${artifactId}/visualize`,
    {
      headers: {
        Authorization: `bearer ${authToken}`,
      },
      onDownloadProgress: (progressEvent) => {},
      cancelToken: source?.token,
    },
  );

  return response;
}
