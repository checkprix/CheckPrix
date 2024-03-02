import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import Footer from "../footer/footer";
import Navbar from "../navbar/navbar";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import StorageOption from "./subComponents/StorageOptions/storangeOption";
import SimilarProducts from "./subComponents/similarProduct/similarProduct";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GetProductById } from "./methods/methods";
import { getValueBykey } from "../../common_method/commonMethods";
import { Button } from "flowbite-react";
const ProductPage = (): any => {
  const { id } = useParams();

  //this state maintain current product fetched details
  const [product, setProduct] = useState<Record<string, any>>({});
  useEffect(() => {
    GetProductById(id, setProduct);
   
  }, []);
  //write code to fetch data for product

  useEffect(()=>{
    setWhichProductOptionSelected( <PriceSection store={product.store_info}/>)
  },[product])


  const [whichProductOptionSelected, setWhichProductOptionSelected] = useState(
    <PriceSection store={product.store_info}/>
  );

  return (
    <>
      <Navbar />
      <div className="d-flex w-full flex-col h-fit">
        <MobileDescription specification={product} />
      </div>
      <ProductOptions
        whichProductOptionSelected={whichProductOptionSelected}
        setWhichProductOptionSelected={setWhichProductOptionSelected}
        product={product}
      />
      <div className="w-full mt-20">
        <Footer />
      </div>
    </>
  );
};

export default ProductPage;

const MobileDescription = (Props: Record<string, any>): any => {
  return (
    <>
      <div className="flex flex-col lg:flex-row lg:w-full lg:justify-start lg:pl-28 lg:gap-6 pb-10 p-2 pt-10 lg:mt-5">
        <div className="flex justify-center items-center ">
          <img
            className="object-cover w-fit lg:w-[250px]"
            src={`${
              Array.isArray(getValueBykey("image", Props))
                ? getValueBykey("image", Props)[0]
                : ""
            }`}
            alt="Mobile image"
          />
        </div>
        <div className="pt-10 pl-10 pr-10">
          <h2 className="text-2xl font-semibold">
            {getValueBykey("product_name", Props)}
          </h2>
          <p className="mt-8 text-gray-600">
            The price of Apple Iphone 14 Pro Max in Mauritius starts from
            various range across online stores.
          </p>
          {/* features */}
          {/* use Map here to render Feature component */}
          <Features description={getValueBykey("operating_system", Props)} />
          <Features
            description={`${getValueBykey(
              "screen_size",
              Props
            )} ${getValueBykey("screen_type", Props)}`}
          />
          <Features
            description={`Available in ${getValueBykey("storage", Props)}`}
          />
          <Features
            description={`Available in ${getValueBykey("colors", Props)}`}
          />
          <Features
            description={`Available in Ram ${getValueBykey("ram", Props)}`}
          />

          {/* Pricing  */}
          <div className="flex flex-col pt-5 gap-3">
            <div className="flex gap-3">
              <span>{`Old Price: ${getValueBykey("old_price", Props)}Rs`}</span>
              <span>{`New Price: ${getValueBykey("new_price", Props)}Rs`}</span>
            </div>
            <span>{`Total listing: ${getValueBykey(
              "listing",
              Props
            )} items`}</span>
          </div>

          {/* Storage Options */}
          <div className="flex flex-col pt-5 gap-3">
            <StorageOption
              Array_Of_Storage={
                typeof getValueBykey("storage", Props) === "string"
                  ? getValueBykey("storage", Props).split(",")
                  : []
              }
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
        <span className="text-sm md:text-xl">{Props?.description}</span>
      </div>
    </>
  );
};

const PriceSection = (Props:Record<string,any>): any => {
  console.log(Props)
  return (
    <>
      <motion.div
        initial={{ marginLeft: "-250px", opacity: 0.5 }}
        whileInView={{ marginLeft: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="bg-gray-100 w-full h-auto rounded-md"
      >
     {
       !Props.store && <span className="flex justify-center items-center  font-semibold text-4xl w-full h-48">
         <span className="w-full text-center">Coming Soon!</span>
        </span>
     }

        {
       Props.store &&  Props.store.map((item:any)=>{
            return <div key={item.id} className="w-full flex p-3 lg:w-[1200px]">
            <div className="flex justify-between h-32 flex-1 border bg-white border-gray-300">
              <div className="flex justify-center flex-col h-full w-fit gap-2 pl-2">
                <span className="h-12 w-fit"><img className="object-cover" src={item.logo}/></span>
                <span className="flex justify-center">
                  <Button className="bg-orange-500 ">
                    <a href={(item.link=='')?'#':item.link}>Visit Store</a>
                  </Button>
                </span>
              </div>
              <div className="w-fit h-full flex items-center justify-between flex-col p-3 ">
                <div className="w-fit font-semibold text-xl lg:pr-5">{item.name}</div>
                <div className="w-fit text-blue-600 text-xl font-semibold lg:pr-5">{(item.price == 0)? 'N/A' : item.price+'Rs'}</div>
              </div>
            
              
            
              </div>
          </div>
          })
        }
      
        

      </motion.div>
    </>
  );
};

const ProductOptions = (Props: Record<string, any>): any => {
  return (
    <>
      <div className="flex text-xs p-3 sm:p-0 sm:text-sm md:text-xl justify-around lg:justify-start lg:pl-24 gap-4 pb-10 ">
        <span
          onClick={() => {
            Props?.setWhichProductOptionSelected(<PriceSection store={Props.product.store_info}/>);
          }}
          className="border-b p-1 border-b-black cursor-pointer "
        >
          Price
        </span>
        <span
          onClick={() => {
            Props?.setWhichProductOptionSelected(
              <ProductInformation product={Props.product} />
            );
          }}
          className="border-b p-1 border-b-black cursor-pointer"
        >
          Product Information
        </span>
        <span
          onClick={() => {
            Props?.setWhichProductOptionSelected(<SimilarProducts product={Props.product}/>);
          }}
          className="border-b p-1 border-b-black cursor-pointer"
        >
          Similar products
        </span>
      </div>

      <div className="flex md:p-10 pb-10">
        {Props?.whichProductOptionSelected}
      </div>
    </>
  );
};

const ProductInformation = (Props: Record<string, any>): any => {
  console.log(Props);
  return (
    <>
      <motion.div
        initial={{ marginLeft: "-250px", opacity: 0.5 }}
        whileInView={{ marginLeft: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="flex w-full flex-col gap-10 p-10"
      >
        <ProductInformationSection
          headline={"General"}
          infoArray={[
            {
              header: "Full Name",
              value: getValueBykey("product_name", Props),
            },
            {
              header: "Manufacturer",
              value: getValueBykey("manufacturer", Props),
            },
            {
              header: "Release Date",
              value: getValueBykey("release_date", Props),
            },
            { header: "Model", value: getValueBykey("model", Props) },
          ]}
        />
        <ProductInformationSection
          headline={"Body"}
          infoArray={[
            { header: "Dimensions", value: getValueBykey("dimensions", Props) },
            { header: "Weight", value: getValueBykey("weight", Props) },
            { header: "Colours", value: getValueBykey("colors", Props) },
          ]}
        />
        <ProductInformationSection
          headline={"General"}
          infoArray={[
            {
              header: "Operating System",
              value: getValueBykey("operating_system", Props),
            },
            { header: "CPU", value: getValueBykey("cpu", Props) },
            { header: "Memory (RAM)", value: getValueBykey("ram", Props) },
            { header: "Storage (ROM)", value: getValueBykey("storage", Props) },
            {
              header: "ROM/RAM Combinations",
              value: getValueBykey("storage", Props),
            },
            {
              header: "External Storage",
              value: getValueBykey("external_storage", Props),
            },
          ]}
        />

        <ProductInformationSection
          headline={"Connectivity"}
          infoArray={[
            { header: "Network", value: getValueBykey("network", Props) },
            { header: "SIM", value: getValueBykey("sim", Props) },
            { header: "Wifi", value: getValueBykey("wifi", Props) },
            { header: "Bluetooth", value: getValueBykey("bluetooth", Props) },
          ]}
        />

        <ProductInformationSection
          headline={"Display"}
          infoArray={[
            {
              header: "Screen Size",
              value: getValueBykey("screen_size", Props) + " inches",
            },
            { header: "Resolution", value: getValueBykey("resolution", Props) },
            { header: "Type", value: getValueBykey("screen_type", Props) },
          ]}
        />

        <ProductInformationSection
          headline={"Power"}
          infoArray={[
            { header: "Battery", value: getValueBykey("battery", Props) },
            {
              header: "Capacity",
              value: getValueBykey("battery_capacity", Props),
            },
            { header: "Type", value: getValueBykey("battery_type", Props) },
            {
              header: "Fast Charging",
              value: getValueBykey("fast_charging", Props),
            },
            {
              header: "Wireless Charging",
              value: getValueBykey("wireless_charging", Props),
            },
            {
              header: "USB 3.0 Charging",
              value: getValueBykey("usb_charging", Props),
            },
          ]}
        />
      </motion.div>
    </>
  );
};

const ProductInformationSection = (Props: Record<string, any>): any => {
  return (
    <>
      <div className="w-full  lg:w-[800px]  lg:pl-14 flex flex-col gap-4">
        <span className="text-xl font-semibold">{Props?.headline}</span>
        <div className="flex flex-col gap-4">
          {Props?.infoArray?.map((item: any, index: number) => {
            return (
              <div
                key={index}
                className="flex w-full text-sm md:text-xl text-gray-600 "
              >
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
