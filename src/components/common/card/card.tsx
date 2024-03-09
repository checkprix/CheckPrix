import { faArrowDown, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../../../assests/logo/logo.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import { DeleteDataAPI, UpdateDataAPI } from "../../../apihooks/apihooks";
const Card = (Props: Record<string, any>): any => {
  //using as a toggle
  const [add_to_favrouite, set_add_to_favrouite] = useState<boolean>((Props?.heart)?true:false);
  return (
    <>
      <div className=" lg:w-fit w-full overflow-hidden  p-5 flex flex-col gap-5 border rounded-md border-gray-400 ">
        <div className="w-full text-center text-xl font-semibold">
          <div className="relative flex justify-center">
            <span>{Props.brand}</span>
            <span
              onClick={(e) => {
                set_add_to_favrouite(!add_to_favrouite);
                handleFavrouite(Props.id,add_to_favrouite)
              }}
              className={`right-0 absolute cursor-pointer ${
                !add_to_favrouite ? "text-gray-300" : "text-red-500"
              } text-3xl w-fit`}
            >
              <FontAwesomeIcon icon={faHeart} />
            </span>
          </div>
        </div>

        <div className="w-full flex justify-center items-center lg:w-80 cursor-pointer select-none">
          <Link to={`/product-detail/${Props.id}`} target="_blank" className="select-none">
            <img
              className="h-52 w-fit object-cover select-none"
              src={Props?.image}
              alt={Props.product_name}
            />
          </Link>
        </div>
        <div className="w-full text-center text-xl font-semibold select-none">
          {Props.product_name}
        </div>
        <div className="bg-gray-100 rounded-md p-5 h-fit w-full flex flex-col ">
          {Props?.hideDeletePriceAndDownArrow && (
            <div className="flex justify-between ">
              <span>
                <del>{'Rs '+ Props?.old_price}</del>
              </span>
              <span className="flex justify-center items-center gap-1 text-orange-500">
                <span>
                  {calculatePersentage(Props.old_price, Props.new_price)}
                </span>
                <FontAwesomeIcon icon={faArrowDown} />
              </span>
            </div>
          )}

          <div className="flex">
            <span>{'Rs '+Props?.new_price}</span>
          </div>
          {/* conditional rendering to show and hide log and visit store button */}
          {Props?.hideLogoAndVisitStore && (
            <div className="h-full flex flex-wrap justify-around mt-5 lg:gap-3">
              <span className="p-1">
                <img className="w-32" src={Logo} />
              </span>
              <span>
                <button className="bg-orange-500 text-white p-2 rounded-md text-sm">
                  <a href={Props?.visitLink} target="_blank">
                    Visit Store
                  </a>
                </button>
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Card;

const calculatePersentage = (old_price: number, new_price: number) => {
  const ans =
    Math.abs((old_price - new_price) / Math.max(old_price, new_price)) * 100;
  return ans.toFixed(2);
};


const handleFavrouite = async(id:string,toggle:boolean)=>{
  if(!toggle)
  {
   await updateFavrouiteList(id);
   return;
  }
  
const res =  await removeItemFromfavrouiteList(id);
   
}

const updateFavrouiteList = async(id:string)=>{
  try{
    const response = await UpdateDataAPI(process.env.REACT_APP_FAVROUITE,{item_id:id});
    console.log(response)
  }
  catch(err)
  {
    alert("Internals server error");
  }

}

const removeItemFromfavrouiteList = async(id:string)=>{
    await DeleteDataAPI(`${process.env.REACT_APP_FAVROUITE}`,id)
}