import { GetDataAPICredentialAdmin, PostDataApiCredentialAdmin, UpdateDataAPI, UpdateDataApiCredentialAdmin } from "../../../apihooks/apihooks";
import { getValueBykey } from "../../../common_method/commonMethods";
const UploadProductInDb = async (
  form: Record<string, any>,
  file: File | null
): Promise<any> => {
  const form_object = FormBuidler(form, file);

  //sending data to server for save in db
  return await PostDataApiCredentialAdmin(process.env.REACT_APP_PRODUCTS_API_URL, form_object);
};

//update handler
const UpdateProduct = async (
  form: Record<string, any>,
  file: File | null
): Promise<any> => {
  form["file"] = file;
  console.log(form)
  //sending data to server for save in db
  return await UpdateDataApiCredentialAdmin(process.env.REACT_APP_PRODUCTS_API_URL, form);
};

const FormBuidler = (form: Record<string, any>, file: File | null) => {
  return {
    ...form,
    resolution: form.resolution + "\u0020pixels",
    battery_capacity: form.battery_capacity + "\u0020mAh",
    file: file,
  };
};

const validateForm = (form: Record<string, any>, file: File | null) => {
  if (!file) return false;

  for (const [key, value] of Object.entries(form)) {
    if(key === 'store') continue;
    if (value.toString() === "") return false;
  }

  return true;
};

const validateFormUpdate = (form: Record<string, any>) => {
  for (const [key, value] of Object.entries(form)) {
    if(key === 'store') continue;
    if (value?.toString() === "") return false;
  }

  return true;
};


const GetStore=async(setStore:Function,setHanleStore:Function)=>{
  try{
      const res = await GetDataAPICredentialAdmin(`${process.env.REACT_APP_STORE}`);
      if(getValueBykey('is_success',res))
      {
        console.log(getValueBykey('store',res));
        setStore(getValueBykey('store',res));
       // setHanleStore(new Array(getValueBykey('store',res).length).fill({store_id:'',name:'',price:0}));
     //  setHanleStore(getValueBykey('store',res));
      }
  }
  catch(err)
  {
    alert("Internal server error !!!")
  }
}


export { UploadProductInDb, UpdateProduct, validateForm, validateFormUpdate,GetStore};
