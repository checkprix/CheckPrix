import Card from "../../../common/card/card";
import { motion } from "framer-motion";
import { useState,useEffect } from "react";
import { getValueBykey } from "../../../../common_method/commonMethods";
import { GetDataAPIParam } from "../../../../apiMethods/apihooks";
const SimilarProducts = (Props:Record<string,any>): any => {

  console.log(Props)

  const [similar_phone_list,set_similar_phone_list] = useState<Record<string,any>[]|null>(null)
  useEffect(()=>{
     GetSimilarProducts(getValueBykey('product_name',Props),set_similar_phone_list);
  },[])
  return (
    <>
      <motion.div
        initial={{ marginLeft: "-250px", opacity: 0.5 }}
        whileInView={{ marginLeft: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="lg:justify-start  p-5 flex flex-wrap md:justify-center  gap-2 lg:gap-3  overflow-hidden w-full"
      >
        {/* Card here */}
    
        {
              Array.isArray(similar_phone_list) && similar_phone_list.map((item:Record<string,any>)=>{
                return  <Card
                key={item.id}
                hideLogoAndVisitStore={true}
                hideDeletePriceAndDownArrow={true}
                image={item.image[0].link}
                visitLink={item.store_link}
                old_price={item.old_price}
                new_price={item.new_price}
                product_name={item.details.product_name}
                brand={item.details.manufacturer}
                id={item.id}
              />
              })
            }


      </motion.div>
    </>
  );
};

export default SimilarProducts;


const GetSimilarProducts = async(product_name:string,set_similar_phone_list:Function)=>{
  try{
  const temp_product_name = product_name.split('');
  const query = temp_product_name.shift() + '' + temp_product_name.shift();
  const similar_product = await GetDataAPIParam(`${process.env.REACT_APP_SEARCH}`,query);
  set_similar_phone_list(getValueBykey('products',similar_product));
  }
  catch(err)
  {
    alert("Some Error in similar products");
  }

}