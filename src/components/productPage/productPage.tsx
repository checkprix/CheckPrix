import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import Footer from "../footer/footer";
import Navbar from "../navbar/navbar";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import StorageOption from "./subComponents/StorageOptions/storangeOption";
import SimilarProducts from "./subComponents/similarProduct/similarProduct";
import { useState } from "react";
const ProductPage = (): any => {
  const { id } = useParams();
  //write code to fetch data for product

  const [whichProductOptionSelected, setWhichProductOptionSelected] = useState(
    <PriceSection />
  );

  return (
    <>
      <Navbar />
      <div className="d-flex w-full flex-col h-fit">
        <MobileDescription />
      </div>
      <ProductOptions
        whichProductOptionSelected={whichProductOptionSelected}
        setWhichProductOptionSelected={setWhichProductOptionSelected}
      />
      <div className="w-full">
        <Footer />
      </div>
    </>
  );
};

export default ProductPage;

const MobileDescription = (): any => {
  return (
    <>
      <div className="flex flex-col lg:flex-row lg:w-full lg:justify-start lg:pl-28 lg:gap-6 pb-10 p-2 pt-10">
        <div className="flex justify-center items-center lg:w-44">
          <img
            className="bg-cover object-cover w-44"
            src="https://checkprix.net/uploaded_Images/1097348779.jpg"
            alt="Mobile image"
          />
        </div>
        <div className="pt-10 pl-10 pr-10">
          <h2 className="text-2xl font-semibold">Apple Iphone 14 Pro Max</h2>
          <p className="mt-8 text-gray-600">
            The price of Apple Iphone 14 Pro Max in Mauritius starts from Rs 1
            to Rs 10 across online stores.
          </p>
          {/* features */}
          {/* use Map here to render Feature component */}
          <Features description={"IOS 16.0"} />
          <Features description={"6.7 inches LTPO Super Retina XDR OLED"} />
          <Features
            description={
              "Available in 128GB 6GB RAM, 256GB 6GB RAM, 512GB 6GB RAM, 1TB 6GB RAM"
            }
          />
          <Features
            description={"Available in Space Black, Silver, Gold, Deep Purple"}
          />
          <Features description={"6.7 inches LTPO Super Retina XDR OLED"} />

          {/* Pricing  */}
          <div className="flex flex-col pt-5 gap-3">
            <div className="flex gap-3">
              <span>{`Minimum Price: Rs ${1}`}</span>
              <span>{`Range: Rs${1} - Rs ${10}`}</span>
            </div>
            <span>{`Total listing: ${1} items`}</span>
          </div>

          {/* Storage Options */}
          <div className="flex flex-col pt-5 gap-3">
            <StorageOption
              Array_Of_Storage={["128GB", "256GB", "512GB", "1TB"]}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const Features = (Props: Record<string, any>): any => {
  return (
    <>
      <div className="flex mt-3 gap-2">
        <span>
          <FontAwesomeIcon icon={faCheck} />
        </span>
        <span className="text-sm lg:text-base">{Props?.description}</span>
      </div>
    </>
  );
};

const PriceSection = (): any => {
  return <>
  <div className="bg-gray-100 h-48 flex justify-center items-center w-full">
    <span className=" text-center font-semibold text-4xl">Coming Soon!</span>
  </div>
  </>;
};


const ProductOptions = (Props: Record<string, any>): any => {
  return (
    <>
      <div className="flex text-xs p-3 sm:p-0 sm:text-sm justify-around lg:justify-start lg:pl-24 gap-4 pb-10 ">
        <span onClick={()=>{Props?.setWhichProductOptionSelected(<PriceSection/>)}} className="border-b p-1 border-b-black cursor-pointer">
          Price
        </span>
        <span
        onClick={()=>{Props?.setWhichProductOptionSelected(<ProductInformation/>)}}
        className="border-b p-1 border-b-black cursor-pointer">
          Product Information
        </span>
        <span
        onClick={()=>{Props?.setWhichProductOptionSelected(<SimilarProducts/>)}}
        className="border-b p-1 border-b-black cursor-pointer">
          Similar products
        </span>
      </div>

      <div className="flex md:p-10 pb-10 ">
        {Props?.whichProductOptionSelected}
      </div>
    </>
  );
};


const ProductInformation = (Props: Record<string, any>): any => {
  return (
    <>
      <div className="flex w-full flex-col gap-10 p-10">
        <ProductInformationSection
          headline={"General"}
          infoArray={[
            { header: "Full Name", value: "Iphone 14 Pro Max" },
            { header: "Manufacturer", value: "Apple" },
          ]}
        />
        <ProductInformationSection
          headline={"General"}
          infoArray={[
            { header: "Full Name", value: "Iphone 14 Pro Max" },
            { header: "Manufacturer", value: "Apple" },
          ]}
        />
        <ProductInformationSection
          headline={"General"}
          infoArray={[
            { header: "Full Name", value: "Iphone 14 Pro Max" },
            { header: "Manufacturer", value: "Apple" },
          ]}
        />
      </div>
    </>
  );
};

const ProductInformationSection = (Props: Record<string, any>): any => {
  return (
    <>
      <div className="w-full lg:w-96 lg:pl-14 flex flex-col gap-4">
        <span className="text-xl font-semibold">{Props?.headline}</span>
        <div className="flex flex-col gap-4">
          {Props?.infoArray?.map((item: any, index: number) => {
            return (
              <div key={index} className="flex w-full text-sm text-gray-600">
                <span className="w-1/2">{item.header}</span>
                <span className="w-1/2">{item.value}</span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
