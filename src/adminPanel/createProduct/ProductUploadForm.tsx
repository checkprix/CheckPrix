import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { UploadProductInDb,updateProduct,validateForm } from "./methods/methods";
import { upload } from "@testing-library/user-event/dist/upload";
import { useGetData } from "../../apihooks/apihooks";

const ProductUploadForm = () => {
  const [uploadForm, setUploadForm] = useState<Record<string, any>>({});
  const [file, setFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [product_id,setProduct_id] = useState<string>('')
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
  const GetProductById = async()=>{
    console.log(param.id)
    const data =  await useGetData("http://localhost:4000/api/products/"+param.id);
    console.log(data)
  }


  useEffect(() => {
    GetProductById();
  }, []);


  //create new product handler
  const UploadForm = async () => {
    try {
      const res = await UploadProductInDb(uploadForm, file);
  
      if (res?.is_success) {setUploadForm({}); setFile(null); setPreviewURL(null); alert(res?.message);}
      else throw new Error(res?.message);
    } catch (err) {
      console.log("err", err);
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("An error occurred.");
      }
    }
  };

  // const deleteProduct = (id:number):Record<string,any>=>{
  //   return {
  //     isSucess:true
  //   }
  // }

  return (
    <>
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
                  // const isDelete = await deleteProduct(1);
                }}
              >
                Delete
              </button>
            ) : (
              ""
            )}
            <button
              className="bg-blue-500 border-neutral-200 border text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-700"
              onClick={() => {
                //validate form // so input should not be empty
                //if form is valid then upload form
                if(validateForm(uploadForm,file))
                {
                  UploadForm()
                }
                else alert("Fill all the input")
              }}
            >
              Save
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
              <input required
                type="number"
                id="old_price"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter old price"
                value={(uploadForm?.old_price)?uploadForm?.old_price:""}
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
              <input required
                type="number"
                id="new_price"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter new price"
                value={(uploadForm?.new_price)?uploadForm.new_price:""}
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
              <input required
                type="number"
                id="listing"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter listing"
                value={(uploadForm?.listing)?uploadForm?.listing:""}
                onChange={(e) => handleProductUpload(e)}
              />
            </div>
            
            
            </div></div>
        <div className="flex gap-4">
          <div className="flex flex-col w-1/2">
            <div className="mb-4">
              <label
                htmlFor="product_name"
                className="block text-sm font-medium text-gray-600"
              >
                Product Name
              </label>
              <input required
                type="text"
                id="product_name"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter the name of the product"
                value={(uploadForm?.product_name)?uploadForm?.product_name:""}
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
              <input required
                type="text"
                id="manufacturer"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter the manufacturer of the product"
                value={(uploadForm?.manufacturer)?uploadForm?.manufacturer:""}
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
              <input required
                type="date"
                id="release_date"
                className="mt-1 p-2 w-full border rounded-md"
                value={(uploadForm?.release_date)?uploadForm?.release_date:""}
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
              <input required
                type="text"
                id="dimensions"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter the dimensions of the product"
                value={(uploadForm?.dimensions)?uploadForm?.dimensions:""}
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
                value={(uploadForm?.weight)?uploadForm?.weight:""}
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
              <input required
                type="text"
                id="colors"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter the available colors of the product"
                value={(uploadForm?.colors)?uploadForm?.colors:""}
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
              <input required
                type="text"
                id="operating_system"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter the operating system of the product"
                value={(uploadForm.operating_system)?uploadForm.operating_system:""}
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
                value={(uploadForm?.cpu)?uploadForm?.cpu:""}
                onChange={(e: any) => handleProductUpload(e)}
              >
                <option value="">Select</option>
                <option value="singleCore">Single Core</option>
                <option value="dualCore">Dual Core</option>
                <option value="quadCore">Quad Core</option>
                <option value="hexaCore">Hexa Core</option>
                <option value="octaCore">Octa Core</option>
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
                  value={(uploadForm.ram)?uploadForm.ram:""}
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
              <input required
                type="text"
                id="storage"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter the storage details of the product"
                value={(uploadForm?.storage)?uploadForm?.storage:""}
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
                value={(uploadForm.external_storage)?uploadForm.external_storage:""}
                onChange={(e: any) => handleProductUpload(e)}
              >
                <option value="">Select</option>
                <option value="supported">Supported</option>
                <option value="notSupported">Not Supported</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="network"
                className="block text-sm font-medium text-gray-600"
              >
                Network
              </label>
              <input required
                type="text"
                id="network"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter the network details of the product"
                value={(uploadForm?.network)?uploadForm?.network:""}
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
              <input required
                type="text"
                id="model"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter model"
                value={(uploadForm?.model)?uploadForm?.model:""}
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
                value={(uploadForm?.sim)?uploadForm?.sim:""}
                onChange={(e: any) => handleProductUpload(e)}
              >
                <option value="">Select</option>
                <option value="single">Single SIM</option>
                <option value="dual">Dual SIM</option>
                <option value="hybrid">Hybrid</option>
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
                value={(uploadForm?.wifi)?uploadForm?.wifi:""}
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
                value={(uploadForm?.bluetooth)?uploadForm?.bluetooth:""}
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
                value={(uploadForm?.screen_size)?uploadForm?.screen_size:""}
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
              <input required
                type="text"
                id="resolution"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter the resolution of the product (e.g., 1920x1080)"
                value={(uploadForm?.resolution)?uploadForm?.resolution:""}
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
              <input required
                type="text"
                id="screen_type"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter the resolution of the product"
                value={(uploadForm?.screen_type)?uploadForm?.screen_type:""}
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
                value={(uploadForm?.battery_type)?uploadForm?.battery_type:""}
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
              <input required
                type="text"
                id="battery_capacity"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter the Battery Capacity"
                value={(uploadForm?.battery_capacity)?uploadForm?.battery_capacity:""}
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
                value={(uploadForm?.fast_charging)?uploadForm?.fast_charging:""}
                onChange={(e: any) => handleProductUpload(e)}
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
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
                value={(uploadForm?.wireless_charging)?uploadForm?.wireless_charging:""}
                onChange={(e: any) => handleProductUpload(e)}
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
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
                value={(uploadForm?.usb_charging)?uploadForm?.usb_charging:""}
                onChange={(e: any) => handleProductUpload(e)}
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
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
          <input required
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
      </div>
    </>
  );
};

export default ProductUploadForm;
