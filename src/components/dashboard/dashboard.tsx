import Navbar from "../navbar/navbar";
import { motion } from "framer-motion";
import Line from "../common/Line/Line";
import { Link } from "react-router-dom";
import Card from "../common/card/card";
import Footer from "../footer/footer";
import CurrentPage from "../common/currentPage/currentPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useState,useEffect } from "react";
import { GetDataAPICredential } from "../../apihooks/apihooks";
import { getValueBykey } from "../../common_method/commonMethods";
import NotFound from "../../assests/images/404-image.jpg"
const DashBoard = (): any => {

  //using as a flag to check data is fetched from server
  const [isFavrouiteListIsFetched,setIsFavrouiteListIsFetched] = useState(false)
  //favrouite list from server
  const[favouriteList,setfavrouiteList] = useState<[]>([])

  useEffect(()=>{
      GetFavrouiteList(`${process.env.REACT_APP_FAVROUITE}`,setfavrouiteList,setIsFavrouiteListIsFetched)
  },[])
  return (
    <>
      <div className="h-full flex flex-col items-center justify-between relative">
        <Navbar />
    
        <div className="w-4/5 lg:mt-28">
          <CurrentPage parent={"Home"} child={"Dashboard"} />
        {/* hide NotAvailable component if data is not available */}
       { !isFavrouiteListIsFetched  && <NotAvailable image={NotFound}/> }
           {/* show Available component if data is not available */}
        {isFavrouiteListIsFetched && <Available list={favouriteList}/>}
        </div>
        
        <Footer />
      </div>
    </>
  );
};

export default DashBoard;

const NotAvailable = (Props:Record<string,any>): any => {
  return (
    <>
      <div className="flex flex-col justify-center items-center w-full gap-4 mt-16 pb-5">
        <span className="text-2xl border-b-2 border-orange-500 text-gray-500 w-fit uppercase">
          Not available
        </span>
        <div>
          <img
            className="h-36"
            src={Props.image}
          />
        </div>
       <div>
       <p className="text-sm">Product is not available in your favourite list</p>
       </div>
        <div>
           
          <button className="p-3 bg-orange-500 text-white rounded-md block space-x-2">
            <span>Homepage</span>
            <span>
              <FontAwesomeIcon icon={faAngleRight} />
            </span>
          </button>
        </div>
      </div>
    </>
  );
};


const Available=(Props:Record<string,any>):any=>{

    return (<>
    <div className="w-full flex justify-center items-center">
          <motion.div
            initial={{ marginLeft: "-250px", opacity: 0.5 }}
            whileInView={{ marginLeft: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="lg:justify-start lg:w-4/5  p-5 flex flex-wrap md:justify-center  gap-2 lg:gap-3  overflow-hidden w-full h-full"
          >
            {/* Card here */}
            {Array.isArray(Props.list) && Props.list.map((item:Record<string,any>)=>{
                return  <Card key={item.id}
                hideLogoAndVisitStore={true}
                hideDeletePriceAndDownArrow={true}
                image={getValueBykey("image",item)[0]}
                visitLink={getValueBykey("store_link",item)}
                old_price={getValueBykey("old_price",item)}
                new_price={getValueBykey("new_price",item)}
                product_name={getValueBykey("product_name",item)}
                brand={getValueBykey("manufacturer",item)}
                id={getValueBykey("id",item)}
                heart={true}
              />
              })
            }
            
            
             
          </motion.div>
        </div>
    
    </>)
}



const GetFavrouiteList = async(api:string,setfavrouiteList:Function,setIsFavrouiteListIsFetched:Function)=>{
 try{
  const res = await GetDataAPICredential(api);
  console.log(res)
    if(getValueBykey("is_success",res))
    {
      setIsFavrouiteListIsFetched(true);
      const product = getValueBykey("products",res);
      if(product?.length==0)setIsFavrouiteListIsFetched(false);
      setfavrouiteList(product);
    }
 }
 catch(err)
 {
  alert("Internal server error");
 }

}