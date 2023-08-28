import axios from 'axios';

export const checkUrlStatus = async (defaultSdkDocsUrl: string) => {
  try {
    const response = await axios.head(defaultSdkDocsUrl);
    if (response.status === 404) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return true;
  }
};
