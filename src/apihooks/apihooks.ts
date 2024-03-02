import axios, { AxiosResponse, AxiosError } from "axios";
import { checkToken, checkTokenUser } from "../common_method/commonMethods";

const PostDataApiJSON = async (
  apiString: any,
  data: any
): Promise<any | null> => {
  try {
    const response: AxiosResponse = await axios.post(apiString, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (err) {
    console.error("Error in usePostData:", err);

    // You can throw the error if you want to propagate it
    // throw err;

    return null;
  }
};

const UpdateDataAPI = async (
  apiString: any,
  data: any
): Promise<any | null> => {
  try {
    const response: AxiosResponse = await axios.put(apiString, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (err) {
    checkTokenUser(err);
    console.error("Error in usePostData:", err);

    // You can throw the error if you want to propagate it
    // throw err;

    return null;
  }
};

const useGetData = async (apiString: string): Promise<any | null> => {
  try {
    const response: AxiosResponse = await axios.get(apiString, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

const GetDataAPI = async (apiString: string): Promise<any | null> => {
  try {
    const response: AxiosResponse = await axios.get(apiString, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

const GetDataAPIParam = async (
  apiString: string,
  query: string|undefined
): Promise<any | null> => {
  try {
    const response: AxiosResponse = await axios.get(apiString, {
      params: {
        query: query,
      },
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

const GetDataAPICredential = async (apiString: string): Promise<any | null> => {
  try {
    const response: AxiosResponse = await axios.get(apiString, {
      withCredentials: true,
    });
    return response;
  } catch (err) {
    checkTokenUser(err);
    console.log(err);
    return err;
  }
};

const DeleteDataAPI = async (
  apiString: string,
  id: string
): Promise<any | null> => {
  try {
    const response: AxiosResponse = await axios.delete(apiString + "/" + id, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

const GetDataAPICredentialAdmin = async (
  apiString: string
): Promise<any | null> => {
  try {
    const response: AxiosResponse = await axios.get(apiString, {
      withCredentials: true,
    });
    return response;
  } catch (err) {
    console.log(err);
    checkToken(err);
    return err;
  }
};

const PostDataApiCredentialAdmin = async (
  apiString: any,
  data: any
): Promise<any | null> => {
  try {
    const response: AxiosResponse = await axios.post(apiString, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (err) {
    checkToken(err);
    console.error("Error in usePostData:", err);

    // You can throw the error if you want to propagate it
    // throw err;

    return null;
  }
};

const UpdateDataApiCredentialAdmin = async (
  apiString: any,
  data: any
): Promise<any | null> => {
  try {
    const response: AxiosResponse = await axios.put(apiString, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (err) {
    checkToken(err);
    console.error("Error in usePostData:", err);

    // You can throw the error if you want to propagate it
    // throw err;

    return null;
  }
};

const DeleteDataAPICredentialAdmin = async (
  apiString: string,
  id: string,
  image_key: string
): Promise<any | null> => {
  try {
    const response: AxiosResponse = await axios.delete(apiString, {
      params: {
        id: id,
        key: image_key,
      },
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (err) {
    checkToken(err);
    console.log(err);
  }
};

const DeleteDataAPICredentialAdminJson = async (
  apiString: string,
 
): Promise<any | null> => {
  try {
    const response: AxiosResponse = await axios.delete(apiString, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (err) {
    checkToken(err);
    console.log(err);
  }
};

const PostDataAPIAdminJson = async (
  apiString: any,
  data: any
): Promise<any | null> => {
  try {
    const response: AxiosResponse = await axios.post(apiString, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (err) {
    checkToken(err);
    console.error("Error in usePostData:", err);

    // You can throw the error if you want to propagate it
    // throw err;

    return null;
  }
};

const UpdateDataAPIAdminJson = async (
  apiString: any,
  data: any
): Promise<any | null> => {
  try {
    const response: AxiosResponse = await axios.put(apiString, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (err) {
    checkToken(err);
    console.error("Error in usePostData:", err);

    // You can throw the error if you want to propagate it
    // throw err;

    return null;
  }
};

export {
  useGetData,
  UpdateDataAPI,
  GetDataAPI,
  DeleteDataAPI,
  PostDataApiJSON,
  GetDataAPICredential,
  GetDataAPICredentialAdmin,
  PostDataApiCredentialAdmin,
  UpdateDataApiCredentialAdmin,
  DeleteDataAPICredentialAdmin,
  GetDataAPIParam,
  DeleteDataAPICredentialAdminJson,
  PostDataAPIAdminJson,
  UpdateDataAPIAdminJson
};
