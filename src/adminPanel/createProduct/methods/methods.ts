import { usePostData } from "../../../apihooks/apihooks";
const UploadProductInDb = async (
  form: Record<string, any>,
  file: File | null
): Promise<any> => {

  const form_object = FormBuidler(form,file);

  //convert in form
  const upload_form: FormData = new FormData();

  for (const [key, value] of Object.entries(form_object)) {
      if (typeof value === 'string') {
          upload_form.append(key, value);
      } else if (value instanceof Blob) {
          upload_form.append(key, value, `${key}.png`);
      } else {
          console.error(`Unsupported value type for key '${key}'`);
      }
  }
  
    //sending data to server for save in db
  return await usePostData(process.env.REACT_APP_PRODUCTS_API_URL, upload_form);

};

const updateProduct = async()=>{

}




const FormBuidler = (form:Record<string,any>,file:File|null)=>{

return {
    ...form,
    resolution: form.resolution + "\u0020pixels",
    battery_capacity: form.battery_capacity + "\u0020mAh",
    file:file
  };
  
}



const validateForm = (  form: Record<string, any>,
  file: File | null)=>{
  if(!file) return false;

  for(const [key,value] of Object.entries(form))
  {
    if(value.toString()=== "") return false
  }

  return true;
}

export { UploadProductInDb,updateProduct,validateForm };