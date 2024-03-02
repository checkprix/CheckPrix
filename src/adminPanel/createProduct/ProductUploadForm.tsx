import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import {

  UpdateProduct,
  validateForm,
  validateFormUpdate,
  GetStore,
  UploadProductInDb,
} from "./methods/methods";
import {
  DeleteDataAPICredentialAdmin,
  GetDataAPI,
  PostDataApiCredentialAdmin,

} from "../../apihooks/apihooks";
import StoreComponent from "./storeSubComponent/storeSubCompoent";
import { getValueBykey } from "../../common_method/commonMethods";
import { Spinner } from "flowbite-react";

const ProductUploadForm = () => {

  const[checkState,setCheckState] = useState<string>("")

  const [store, setStore] = useState([]);
  const [uploadForm, setUploadForm] = useState<Record<string, any>>({});
  const [handleStoreState, setHandleStore] = useState([]);
  const [file, setFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [product_id, setProduct_id] = useState<string>("");
  const [tempStore,setTempStore] = useState([]);
  const [is_product_deleting,set_is_product_deleting] = useState<boolean>(false);
  const [is_product_saving,set_is_product_saving] = useState<boolean>(false);
  const [image_key,set_image_key] = useState<string>('');
  const [is_loading, set_is_loading] = useState<boolean>(false);
  useEffect(() => {
    GetProductById(set_is_loading);
    GetStore(setStore, setHandleStore);
  }, []);



  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const selectedFile = e.target.files && e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
      setPreviewURL(URL.createObjectURL(selectedFile));
    }
  };
  const handleProductUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Add your logic to upload product details
    const { id, value } = e.target as { id: string; value: string };
    setUploadForm({
      ...uploadForm,
      [id]: value,
    });
  };
  const param: any = useParams();
  const GetProductById = async (set_loading:Function) => {
    try{
    if (!param?.id) return;
    console.log(param.id);
    set_loading((preState:boolean)=>!preState)
    const data = await GetDataAPI(
      `${process.env.REACT_APP_PRODUCTS_API_URL}/admin/id/${param.id}`
    );
    set_image_key(getValueBykey('image',data)[0].key || null)
    console.log(data);
    const modified_data_object = {
      ...data.data.product.details,
      old_price: data.data.product.old_price,
      new_price: data.data.product.new_price,
      listing: data.data.product.listing,
      id: data.data.product.id,
      store:getValueBykey('store',data),
      store_link: data.data.product.store_link,
      created_at: data.data.product.created_at,
    };
    console.log(data);
    setUploadForm(modified_data_object);
    setPreviewURL(data.data.product.image[0].link);
    setProduct_id(data.data.product.id);
    set_loading((preState:boolean)=>!preState)
  }
  catch(err)
  {
    alert("Internal server error, all operation supended")
  }
  };

  //create new product handler
  const UploadForm = async () => {
    try {
      const Append_store_array_in_From = { ...uploadForm };
      Append_store_array_in_From["store"] = handleStoreState;
      const res = await UploadProductInDb(Append_store_array_in_From,file);

      
      if ((getValueBykey('is_success',res))) {
        setUploadForm({});
        setFile(null);
        setPreviewURL(null);
        alert(getValueBykey('message',res));
      } else throw new Error(res?.message);
    } catch (err) {
      console.log("err", err);
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("An error occurred.");
      }
    }
  };

  //update form handler
  const UpdateForm = async (tempStore: any) => {
    try {
      // if(!validateForm(uploadForm,file)){
      //   alert("Fill all the field")
      //   return;
      // }
      const Append_store_array_in_From =  { ...uploadForm };
      Append_store_array_in_From["store"] = tempStore;
      console.log(Append_store_array_in_From)
      
      const res = await UpdateProduct(Append_store_array_in_From, file);
      if (res?.is_success) alert(res.message);
      else throw new Error(res?.message);
    } catch (err) {
      alert(err);
    }
  };

  const handleDelete = async (id: string, image_key: string) => {

 

    // Implement delete functionality
    if (!window.confirm("Are you want to delete ?")) return;
    try {
      console.log(image_key,id)
      if(id === '' || image_key==='') {
        alert("invalid image key");
        return;
      }
     
      const isDeleted = await DeleteDataAPICredentialAdmin(
        `${process.env.REACT_APP_PRODUCTS_API_URL}`,
        id,
        image_key
      );
      
      //console.log(isDeleted.data);
      if (getValueBykey("is_success", isDeleted)) {
        window.history.back();
      }
    } catch (err) {
      alert("Internal server error");
      console.log(err);
    }
  }

  return (
    <>
       { is_loading && <div className="flex justify-center pt-5"> <Spinner/></div>}
      <div className="my-8 p-16 bg-white rounded-md w-full ">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold mb-6">
            {!param?.id ? "Create a new product" : "Update Product"}
          </h2>
          <div className="h-auto">
            {param?.id ? (
              <button
                className="bg-red-500 border-neutral-200 border text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-700"
                onClick={async () => {
                 if(!is_product_deleting && !is_product_saving)
                 {
                  await set_is_product_deleting(true);
                  await handleDelete(getValueBykey('id',uploadForm),image_key);
                  await set_is_product_deleting(false);
                 }
                }}
              >
               {(is_product_deleting)?<Spinner/>:'Delete'}
              </button>
            ) : (
              ""
            )}
            <button
              className="bg-blue-500 border-neutral-200 border text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-700"
              onClick={async () => {
                //validate form // so input should not be empty
                //if product_id is empty it means it's new product upload else it's updating product
                if (product_id.length === 0 && validateForm(uploadForm, file) && !is_product_saving && !is_product_deleting) {
                 set_is_product_saving(true)
                await  UploadForm();
                 set_is_product_saving(false)
                } else if (
                  product_id.length !== 0 &&
                  validateFormUpdate(uploadForm) && !is_product_saving && !is_product_deleting
                ) {
                   set_is_product_saving(true)
                  UpdateForm(tempStore);
                   set_is_product_saving(false)
                  // console.log(handleStoreState);
                } else alert("Fill all the input");
              }}
            >
               {(is_product_saving)?<Spinner/>:'Save'}
            </button>
          </div>
        </div>
        <div className="flex">
          <div className="flex gap-4  w-1/2">
            <div className="mb-4">
              <label
                htmlFor="old_price"
                className="block text-sm font-medium text-gray-600"
              >
                Old Price
              </label>
              <input
                required
                type="number"
                id="old_price"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter old price"
                value={uploadForm?.old_price ? uploadForm?.old_price : ""}
                onChange={(e) => handleProductUpload(e)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="new_price"
                className="block text-sm font-medium text-gray-600"
              >
                New Price
              </label>
              <input
                required
                type="number"
                id="new_price"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter new price"
                value={uploadForm?.new_price ? uploadForm.new_price : ""}
                onChange={(e) => handleProductUpload(e)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="listing"
                className="block text-sm font-medium text-gray-600"
              >
                Listing
              </label>
              <input
                required
                type="number"
                id="listing"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter listing"
                value={uploadForm?.listing ? uploadForm?.listing : ""}
                onChange={(e) => handleProductUpload(e)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="store_link"
                className="block text-sm font-medium text-gray-600"
              >
                Store Link
              </label>
              <input
                required
                type="text"
                id="store_link"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter store link"
                value={uploadForm?.store_link ? uploadForm?.store_link : ""}
                onChange={(e) => handleProductUpload(e)}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col w-1/2">
            <div className="mb-4">
              <label
                htmlFor="product_name"
                className="block text-sm font-medium text-gray-600"
              >
                Product Name
              </label>
              <input
                required
                type="text"
                id="product_name"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter the name of the product"
                value={uploadForm?.product_name ? uploadForm?.product_name : ""}
                onChange={(e) => handleProductUpload(e)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="manufacturer"
                className="block text-sm font-medium text-gray-600"
              >
                Manufacturer
              </label>
              <input
                required
                type="text"
                id="manufacturer"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter the manufacturer of the product"
                value={uploadForm?.manufacturer ? uploadForm?.manufacturer : ""}
                onChange={(e) => handleProductUpload(e)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="release_date"
                className="block text-sm font-medium text-gray-600"
              >
                Release Date
              </label>
              <input
                required
                type="date"
                id="release_date"
                className="mt-1 p-2 w-full border rounded-md"
                value={uploadForm?.release_date ? uploadForm?.release_date : ""}
                onChange={(e) => handleProductUpload(e)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="dimensions"
                className="block text-sm font-medium text-gray-600"
              >
                Dimensions
              </label>
              <input
                required
                type="text"
                id="dimensions"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter the dimensions of the product"
                value={uploadForm?.dimensions ? uploadForm?.dimensions : ""}
                onChange={(e) => handleProductUpload(e)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="weight"
                className="block text-sm font-medium text-gray-600"
              >
                Weight
              </label>
              <select
                id="weight"
                className="mt-1 p-2 w-full border rounded-md"
                value={uploadForm?.weight ? uploadForm?.weight : ""}
                onChange={(e: any) => handleProductUpload(e)}
              >
                <option value="">Select</option>
                {Array.from({ length: 451 }, (_, index) => {
                  const value = index + 50; // Ranging from 50 to 500
                  return (
                    <option key={value} value={value + "\u0020grams"}>
                      {value} grams
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="colors"
                className="block text-sm font-medium text-gray-600"
              >
                Colors (Separate by commas)
              </label>
              <input
                required
                type="text"
                id="colors"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter the available colors of the product"
                value={uploadForm?.colors ? uploadForm?.colors : ""}
                onChange={(e) => handleProductUpload(e)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="operating_system"
                className="block text-sm font-medium text-gray-600"
              >
                Operating System
              </label>
              <input
                required
                type="text"
                id="operating_system"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter the operating system of the product"
                value={
                  uploadForm.operating_system ? uploadForm.operating_system : ""
                }
                onChange={(e) => handleProductUpload(e)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="cpu"
                className="block text-sm font-medium text-gray-600"
              >
                CPU
              </label>
              <select
                id="cpu"
                className="mt-1 p-2 w-full border rounded-md"
                value={uploadForm?.cpu ? uploadForm?.cpu : ""}
                onChange={(e: any) => handleProductUpload(e)}
              >
                <option value="">Select</option>
                <option value="Single Core">Single Core</option>
                <option value="Dual Core">Dual Core</option>
                <option value="Quad Core">Quad Core</option>
                <option value="Hexa Core">Hexa Core</option>
                <option value="Octa Core">Octa Core</option>
                {/* Add more options as needed */}
              </select>
            </div>

            {
              <div className="mb-4">
                <label
                  htmlFor="ram"
                  className="block text-sm font-medium text-gray-600"
                >
                  Memory (RAM)
                </label>
                <select
                  id="ram"
                  className="mt-1 p-2 w-full border rounded-md"
                  value={uploadForm.ram ? uploadForm.ram : ""}
                  onChange={(e: any) => handleProductUpload(e)}
                >
                  <option value="">Select</option>
                  {[
                    1, 2, 3, 4, 6, 8, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30,
                    32, 64, 128,
                  ].map((size) => (
                    <option
                      key={size}
                      value={`${size}GB`}
                    >{`${size}GB`}</option>
                  ))}
                </select>
              </div>
            }

            <div className="mb-4">
              <label
                htmlFor="storage"
                className="block text-sm font-medium text-gray-600"
              >
                Storage (ROM) (Separate by commas)
              </label>
              <input
                required
                type="text"
                id="storage"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter the storage details of the product"
                value={uploadForm?.storage ? uploadForm?.storage : ""}
                onChange={(e: any) => handleProductUpload(e)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="ram_storage"
                className="block text-sm font-medium text-gray-600"
              >
               RAM AND ROM Combination (Seprate by commas)
              </label>
              <input
                required
                type="text"
                id="ram_storage"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter the storage details of the product"
                value={uploadForm?.ram_storage ? uploadForm?.ram_storage : ""}
                onChange={(e: any) => handleProductUpload(e)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="external_storage"
                className="block text-sm font-medium text-gray-600"
              >
                External Storage
              </label>
              <select
                id="external_storage"
                className="mt-1 p-2 w-full border rounded-md"
                value={
                  uploadForm.external_storage ? uploadForm.external_storage : ""
                }
                onChange={(e: any) => handleProductUpload(e)}
              >
                <option value="">Select</option>
                <option value="Supported">Supported</option>
                <option value="Not Supported">Not Supported</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="network"
                className="block text-sm font-medium text-gray-600"
              >
                Network
              </label>
              <input
                required
                type="text"
                id="network"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter the network details of the product"
                value={uploadForm?.network ? uploadForm?.network : ""}
                onChange={(e: any) => handleProductUpload(e)}
              />
            </div>
          </div>
          <div className="flex flex-col w-1/2">
            <div className="mb-4">
              <label
                htmlFor="model"
                className="block text-sm font-medium text-gray-600"
              >
                Model
              </label>
              <input
                required
                type="text"
                id="model"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter model"
                value={uploadForm?.model ? uploadForm?.model : ""}
                onChange={(e: any) => handleProductUpload(e)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="sim"
                className="block text-sm font-medium text-gray-600"
              >
                SIM
              </label>
              <select
                id="sim"
                className="mt-1 p-2 w-full border rounded-md"
                value={uploadForm?.sim ? uploadForm?.sim : ""}
                onChange={(e: any) => handleProductUpload(e)}
              >
                <option value="">Select</option>
                <option value="Single">Single SIM</option>
                <option value="Dual">Dual SIM</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="wifi"
                className="block text-sm font-medium text-gray-600"
              >
                WiFi
              </label>
              <select
                id="wifi"
                className="mt-1 p-2 w-full border rounded-md"
                value={uploadForm?.wifi ? uploadForm?.wifi : ""}
                onChange={(e: any) => handleProductUpload(e)}
              >
                <option value="no_option">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                {/* Add more options as needed */}
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="bluetooth"
                className="block text-sm font-medium text-gray-600"
              >
                Bluetooth
              </label>
              <select
                id="bluetooth"
                className="mt-1 p-2 w-full border rounded-md"
                value={uploadForm?.bluetooth ? uploadForm?.bluetooth : ""}
                onChange={(e: any) => handleProductUpload(e)}
              >
                <option value="no_option">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                {/* Add more options as needed */}
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="screen_size"
                className="block text-sm font-medium text-gray-600"
              >
                Screen Size
              </label>
              <select
                id="screen_size"
                className="mt-1 p-2 w-full border rounded-md"
                value={uploadForm?.screen_size ? uploadForm?.screen_size : ""}
                onChange={(e: any) => handleProductUpload(e)}
              >
                <option value="">Select</option>
                {Array.from({ length: 51 }, (_, index) => {
                  const size = (index + 50) / 10; // Ranging from 5.0 to 10.0
                  return (
                    <option key={size} value={size.toFixed(1)}>
                      {size.toFixed(1)} inches
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="resolution"
                className="block text-sm font-medium text-gray-600"
              >
                Resolution (Width x Height)
              </label>
              <input
                required
                type="text"
                id="resolution"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter the resolution of the product (e.g., 1920x1080)"
                value={uploadForm?.resolution ? uploadForm?.resolution : ""}
                onChange={(e: any) => handleProductUpload(e)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="screen_type"
                className="block text-sm font-medium text-gray-600"
              >
                Screen Type
              </label>
              <input
                required
                type="text"
                id="screen_type"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter the resolution of the product"
                value={uploadForm?.screen_type ? uploadForm?.screen_type : ""}
                onChange={(e: any) => handleProductUpload(e)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="battery"
                className="block text-sm font-medium text-gray-600"
              >
                Battery
              </label>
              <select
                id="battery_type"
                className="mt-1 p-2 w-full border rounded-md"
                value={uploadForm?.battery_type ? uploadForm?.battery_type : ""}
                onChange={(e: any) => handleProductUpload(e)}
              >
                <option value="">Select</option>
                <option value="Li-Ion">Li-Ion</option>
                <option value="Li-Polymer">Li-Polymer</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="resolution"
                className="block text-sm font-medium text-gray-600"
              >
                Battery Capacity
              </label>
              <input
                required
                type="text"
                id="battery_capacity"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter the Battery Capacity"
                value={
                  uploadForm?.battery_capacity
                    ? uploadForm?.battery_capacity
                    : ""
                }
                onChange={(e: any) => handleProductUpload(e)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="fast_charging"
                className="block text-sm font-medium text-gray-600"
              >
                Fast Charging
              </label>
              <select
                id="fast_charging"
                className="mt-1 p-2 w-full border rounded-md"
                value={
                  uploadForm?.fast_charging ? uploadForm?.fast_charging : ""
                }
                onChange={(e: any) => handleProductUpload(e)}
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="wireless_charging"
                className="block text-sm font-medium text-gray-600"
              >
                Wireless Charging
              </label>
              <select
                id="wireless_charging"
                className="mt-1 p-2 w-full border rounded-md"
                value={
                  uploadForm?.wireless_charging
                    ? uploadForm?.wireless_charging
                    : ""
                }
                onChange={(e: any) => handleProductUpload(e)}
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="usb_charging"
                className="block text-sm font-medium text-gray-600"
              >
                USB 3.0 Charging
              </label>
              <select
                id="usb_charging"
                className="mt-1 p-2 w-full border rounded-md"
                value={uploadForm?.usb_charging ? uploadForm?.usb_charging : ""}
                onChange={(e: any) => handleProductUpload(e)}
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="file"
            className="block text-sm font-medium text-gray-600"
          >
            Upload Cover Image
          </label>
          <input
            required
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
                className="w-96  h-auto object-center object-cover"
              />
            ) : (
              <div className="flex justify-center items-center flex-col text-neutral-500 ">
                <FontAwesomeIcon className=" text-3xl " icon={faImage} />
                <span className="text-xl">Click here to select image </span>
              </div>
            )}
          </label>
        </div>
        <span className="block font-semibold">Stores:</span>
        <div className="w-full flex flex-col mt-4 gap-3">
          {store.map((item: Record<string, any>, index: number) => {
            return (
              <div key={item.id}>
                <StoreComponent
                  setHandleStore={setTempStore}
                  index={index}
                  id={item.id}
                  store_link={uploadForm?.store?.[index]?.link ?? ""}
                  price={uploadForm?.store?.[index]?.price ?? 0}
                  storeState={tempStore}
                  storeName={item.name}
                  image={item.image}
                  checkState={checkState}
                  setCheckState={setCheckState}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ProductUploadForm;
