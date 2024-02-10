import axios, { AxiosResponse, AxiosError } from 'axios';
import { promises } from 'dns';

const usePatchData = async (apiString: string, data: any): Promise<any | null> => {
    try {
      const response: AxiosResponse = await axios.patch(apiString, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      return response.data;
    } catch (err) {
      console.error('Error in usePatchData:', err);
  
      // You can throw the error if you want to propagate it
      // throw err;
  
      return null;
    }
  };

  const usePostData = async (apiString: any, data: any): Promise<any | null> => {
    try {
      const response: AxiosResponse = await axios.post(apiString, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      return response.data;
    } catch (err) {
      console.error('Error in usePostData:', err);
  
      // You can throw the error if you want to propagate it
      // throw err;
  
      return null;
    }
  };

  const useGetData = async(apiString:string):Promise<any|null> =>{
    try{
      const response :AxiosResponse =  await axios.get(apiString,{
        headers:{
          "Content-Type": "application/json",
        }
      });
      return response;
    }
    catch(err)
    {
      alert("Internal server error");
      console.log(err);
    }
  }

  export {usePostData,useGetData}