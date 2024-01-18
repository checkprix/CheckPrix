import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

const ProductUploadForm = () => {
  const [productName, setProductName] = useState("iPhone 14 Pro Max");
  const [manufacturer, setManufacturer] = useState("Apple");
  const [releaseDate, setReleaseDate] = useState("2022-09-16");
  const [dimensions, setDimensions] = useState("160.7 x 77.6 x 7.9 mm");
  const [weight, setWeight] = useState("240 g");
  const [colors, setColors] = useState(
    "Space Black, Silver, Gold, Deep Purple"
  );
  const [operatingSystem, setOperatingSystem] = useState("iOS 16.0");
  const [cpu, setCPU] = useState("Hexa-core");
  const [ram, setRAM] = useState("6GB");
  const [storage, setStorage] = useState("128GB");
  const [externalStorage, setExternalStorage] = useState("Not supported");
  const [network, setNetwork] = useState("GSM / CDMA / HSPA / EVDO / LTE / 5G");
  const [sim, setSIM] = useState("Dual sim");
  const [wifi, setWiFi] = useState("Yes");
  const [bluetooth, setBluetooth] = useState("Yes");
  const [screenSize, setScreenSize] = useState("6.7 inches");
  const [resolution, setResolution] = useState("1290 x 2796 pixels");
  const [displayType, setDisplayType] = useState("LTPO Super Retina XDR OLED");
  const [batteryType, setBatteryType] = useState("Li-Ion");
  const [batteryCapacity, setBatteryCapacity] = useState("4352 mAh");
  const [batteryRemovable, setBatteryRemovable] = useState(
    "Built-in Non-Removable"
  );
  const [fastCharging, setFastCharging] = useState("Yes");
  const [wirelessCharging, setWirelessCharging] = useState("Yes");
  const [usbCharging, setUSBCharging] = useState("No");
  const [file, setFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const selectedFile = e.target.files && e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
      setPreviewURL(URL.createObjectURL(selectedFile));
    }
  };
  const handleProductUpload = () => {
    // Add your logic to upload product details
    console.log("Product Name:", productName);
    console.log("Manufacturer:", manufacturer);
    console.log("Release Date:", releaseDate);
    console.log("Dimensions:", dimensions);
    console.log("Weight:", weight);
    console.log("Colors:", colors);
    console.log("Operating System:", operatingSystem);
    console.log("CPU:", cpu);
    console.log("RAM:", ram);
    console.log("Storage:", storage);
    console.log("External Storage:", externalStorage);
    console.log("Network:", network);
    console.log("SIM:", sim);
    console.log("WiFi:", wifi);
    console.log("Bluetooth:", bluetooth);
    console.log("Screen Size:", screenSize);
    console.log("Resolution:", resolution);
    console.log("Display Type:", displayType);
    console.log("Battery Type:", batteryType);
    console.log("Battery Capacity:", batteryCapacity);
    console.log("Battery Removable:", batteryRemovable);
    console.log("Fast Charging:", fastCharging);
    console.log("Wireless Charging:", wirelessCharging);
    console.log("USB Charging:", usbCharging);
  };

  return (
    <>
      <div className="my-8 p-16 bg-white rounded-md w-full ">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold mb-6">
            Create a new product
          </h2>
          <div className="h-auto">
            <button
              className="bg-red-500 border-neutral-200 border text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-700"
              // onClick={}
            >
              Delete
            </button>
            <button
              className="bg-blue-500 border-neutral-200 border text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-700"
              // onClick={}
            >
              Save
            </button>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col w-1/2">
            <div className="mb-4">
              <label
                htmlFor="productName"
                className="block text-sm font-medium text-gray-600"
              >
                Product Name
              </label>
              <input
                type="text"
                id="productName"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter the name of the product"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
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
                type="text"
                id="manufacturer"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter the manufacturer of the product"
                value={manufacturer}
                onChange={(e) => setManufacturer(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="releaseDate"
                className="block text-sm font-medium text-gray-600"
              >
                Release Date
              </label>
              <input
                type="text"
                id="releaseDate"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter the release date of the product"
                value={releaseDate}
                onChange={(e) => setReleaseDate(e.target.value)}
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
                type="text"
                id="dimensions"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter the dimensions of the product"
                value={dimensions}
                onChange={(e) => setDimensions(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="weight"
                className="block text-sm font-medium text-gray-600"
              >
                Weight
              </label>
              <input
                type="text"
                id="weight"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter the weight of the product"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="colors"
                className="block text-sm font-medium text-gray-600"
              >
                Colors
              </label>
              <input
                type="text"
                id="colors"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter the available colors of the product"
                value={colors}
                onChange={(e) => setColors(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="operatingSystem"
                className="block text-sm font-medium text-gray-600"
              >
                Operating System
              </label>
              <input
                type="text"
                id="operatingSystem"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter the operating system of the product"
                value={operatingSystem}
                onChange={(e) => setOperatingSystem(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="cpu"
                className="block text-sm font-medium text-gray-600"
              >
                CPU
              </label>
              <input
                type="text"
                id="cpu"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter the CPU details of the product"
                value={cpu}
                onChange={(e) => setCPU(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="ram"
                className="block text-sm font-medium text-gray-600"
              >
                Memory (RAM)
              </label>
              <input
                type="text"
                id="ram"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter the RAM details of the product"
                value={ram}
                onChange={(e) => setRAM(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col w-1/2">
            <div className="mb-4">
              <label
                htmlFor="storage"
                className="block text-sm font-medium text-gray-600"
              >
                Storage (ROM)
              </label>
              <input
                type="text"
                id="storage"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter the storage details of the product"
                value={storage}
                onChange={(e) => setStorage(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="externalStorage"
                className="block text-sm font-medium text-gray-600"
              >
                External Storage
              </label>
              <input
                type="text"
                id="externalStorage"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter the external storage details of the product"
                value={externalStorage}
                onChange={(e) => setExternalStorage(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="network"
                className="block text-sm font-medium text-gray-600"
              >
                Network
              </label>
              <input
                type="text"
                id="network"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter the network details of the product"
                value={network}
                onChange={(e) => setNetwork(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="sim"
                className="block text-sm font-medium text-gray-600"
              >
                SIM
              </label>
              <input
                type="text"
                id="sim"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter the SIM details of the product"
                value={sim}
                onChange={(e) => setSIM(e.target.value)}
              />
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
                value={wifi}
                onChange={(e) => setWiFi(e.target.value)}
              >
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
                value={bluetooth}
                onChange={(e) => setBluetooth(e.target.value)}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                {/* Add more options as needed */}
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="screenSize"
                className="block text-sm font-medium text-gray-600"
              >
                Screen Size
              </label>
              <input
                type="text"
                id="screenSize"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter the screen size of the product"
                value={screenSize}
                onChange={(e) => setScreenSize(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="resolution"
                className="block text-sm font-medium text-gray-600"
              >
                Resolution
              </label>
              <input
                type="text"
                id="resolution"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter the resolution of the product"
                value={resolution}
                onChange={(e) => setResolution(e.target.value)}
              />
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
          type="file"
          id="file"
          className="hidden"
          accept="image/*" // Limit to image files, adjust as needed
          onChange={handleFileChange}
        />
        <label
          htmlFor="file"
          className="mt-4 p-2  border border-neutral-200 cursor-pointer flex justify-center rounded-md"
          style={{minHeight:'96px'}}
        >
          {previewURL ? (
            <img
              src={previewURL}
              alt="Selected"
              className="w-96  h-auto object-center object-cover"
            />
          ) : (
            <div className="flex justify-center items-center flex-col text-neutral-500 ">
                <FontAwesomeIcon className=" text-3xl " icon={faImage}/>
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
