import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { DeleteDataAPICredentialAdmin, GetDataAPICredentialAdmin, PostDataApiCredentialAdmin } from "../../apihooks/apihooks";
import { getValueBykey } from "../../common_method/commonMethods";
const Store = () => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const selectedFile = e.target.files && e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
      setPreviewURL(URL.createObjectURL(selectedFile));
    }
  };

  const [store, setStore] = useState<Record<string, any>[]>([]);
  const [BlogId, setBlogId] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [store_name,set_Store_name] = useState<string>('');

  useEffect(()=>{
    getStore(setStore);
  },[])

  return (
    <div className="overflow-x-auto h-fit p-5">
      <div className="w-full flex justify-center items-center">
        <div className="flex items-center mr-4">
          {/* <img src="https://via.placeholder.com/50" alt="Product" className="w-fit h-20 rounded-md " /> */}
          <div className="mb-4">
            <label
              htmlFor="file"
              className="block text-sm font-medium text-gray-600"
            >
              Upload Store Logo
            </label>
            <input
              type="file"
              id="file"
              className="hidden"
              accept="image/*" // Limit to image files, adjust as needed
              onChange={handleFileChange}
            />
            <label
              htmlFor="file"
              className="mt-4 p-2  border border-neutral-200 cursor-pointer flex justify-center rounded-md"
              style={{ minHeight: "96px" }}
            >
              {previewURL ? (
                <img
                  src={previewURL}
                  alt="Selected"
                  className="w-fit h-20 object-center object-cover"
                />
              ) : (
                <div className="flex justify-center items-center flex-col text-neutral-500 ">
                  <FontAwesomeIcon className=" text-3xl " icon={faImage} />
                  <span className="text-base">Click here to Store Image</span>
                </div>
              )}
            </label>
          </div>
        </div>
        <div className="flex-grow mr-4">
            {/* <label htmlFor="store_name">Enter Store Name</label> */}
          <input
            id="store_name"
            onChange={(e)=>set_Store_name(e.target.value)}
            className="w-full text-gray-500 rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500"
            type="text"
            value={store_name}
            placeholder="Enter store name"
          />
        </div>
        <div className="flex items-center h-full">
          <button onClick={()=>{
            uploadStore(store_name,file,store,setStore);
          }}
           className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
            Add
          </button>
        </div>
      </div>
      <table className="min-w-full divide-y divide-gray-200 overflow-x-scroll mt-10">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Image
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Store Name
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {store.map((stores: Record<string, any>) => (
            <tr key={stores.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="w-fit h-10 flex justify-center">
                  <img
                    src={stores.image[0].link}
                    alt={stores.name}
                    className="w-fit h-auto object-cover"
                  />
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap overflow-clip">
                {stores.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap flex justify-center">
                {/* <button
                  onClick={() => {}}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Edit
                </button> */}

                <button
                  onClick={() => DeleteStore(stores.id,stores.image[0].key,store,setStore) } // Replace '' with the image key
                  className="text-red-600 hover:text-red-900 ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Store;

const uploadStore=async(store_name:String,file:File|null,store:any,setStore:Function)=>{

  console.log(store_name,file);
  try{
      alert("Uploading please wait..!!!")
 const response = await PostDataApiCredentialAdmin('http://localhost:4000/api/store',{
    name:store_name,
    file:file
  })
  
  if(getValueBykey('is_success',response))
  {
    alert("Uploaded!!!")
    setStore([...store,getValueBykey('store',response)]);
  }
}
catch(err)
{
  alert('Internal server error !!!')
}
}

const getStore = async(setStore:Function)=>{
  try
  {
   const res = await GetDataAPICredentialAdmin('http://localhost:4000/api/store');
  if(getValueBykey('is_success',res))
  {
    console.log(res)
    setStore(getValueBykey('store',res));
  }
}
catch(err)
{
  alert("Internal server error!");
}
   
}

const DeleteStore=async(id:string,image_key:string,store: Record<string, any>[],set_store:Function)=>{
  try{
    if(!window.confirm("Are you sure ?")) return;
    const res = await DeleteDataAPICredentialAdmin('http://localhost:4000/api/store', id, image_key);
    if (getValueBykey("is_success", res)) {
      // Filter out the item with the specified ID from the store array
      const updatedStore = store.filter((item:any) => item.id !== id);
      set_store(updatedStore);
    } else {
      // Handle error if 'is_success' is false or not found in response
      console.log("Deletion unsuccessful.");
    }
  }
  catch(err)
  {
    console.log(err)
    alert("Internal server error !!!")
  }
}
