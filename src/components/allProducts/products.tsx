import Navbar from "../navbar/navbar";
import { motion } from "framer-motion";
import Line from "../common/Line/Line";
import { Link, useParams } from "react-router-dom";
import Card from "../common/card/card";
import Footer from "../footer/footer";
import CurrentPage from "../common/currentPage/currentPage";
import { useEffect, useState } from "react";
import { GetProducts, getValueBykey } from "../../common_method/commonMethods";
import { GetDataAPIParam } from "../../apihooks/apihooks";
const Products = (Props: Record<string, any>): any => {
  const param = useParams();
  const Paragraph: Array<string> = [
    `Hello!. Welcome to the ${
      Props.showSearch ? "Search" : param.param
    } page of CheckPrix. Here you get all the recent price reductions on all mobile phones in Mauritius from all your favourite stores.",
    'Just tap on anywhere on the item or click on the "visit store link". Explore the price reductions below.`,
  ];

  //fetch product from db and save in this state
  const [product_list, set_product_list] = useState<Record<string, any>[]>([]);
  useEffect(() => {
   // 
    GetProductsHandler(1,set_product_list,Props?.showSearch,param.param)
  }, []);

  return (
    <>
      <div className="h-full flex flex-col items-center justify-between relative">
        <Navbar />

        <div className="w-4/5 lg:mt-28">
          <CurrentPage
            parent={"Home"}
            child={Props.showSearch ? "Search" : param.param}
          />
          <Line
            heading={Props.showSearch ? "Search" : param.param}
            paragraph={Paragraph}
          />
        </div>
        <div className="w-full flex justify-center items-center">
          <motion.div
            initial={{ marginLeft: "-250px", opacity: 0.5 }}
            whileInView={{ marginLeft: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="lg:justify-start lg:w-4/5  p-5 flex flex-wrap md:justify-center  gap-2 lg:gap-3  overflow-hidden w-full h-full"
          >
            {/* Card here */}
            {Array.isArray(product_list) &&
              product_list.map((item) => {
                return (
                  <Card
                    key={item.id}
                    hideLogoAndVisitStore={true}
                    hideDeletePriceAndDownArrow={true}
                    image={(item.image[0].link)? item.image[0].link:item.image.link}
                    visitLink={item.store_link}
                    old_price={item.old_price}
                    new_price={item.new_price}
                    product_name={item.details.product_name}
                    brand={item.details.manufacturer}
                    id={item.id}
                  />
                );
              })}
            
          </motion.div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Products;

const GetProductsHandler = async(page:number,set_product_list:Function,search:boolean,param:string|undefined)=>{
try{

    if(search)
    {
        const searched = await GetDataAPIParam(`${process.env.REACT_APP_SEARCH}`,param);
        console.log(searched)
        set_product_list(getValueBykey("products",searched));
        return
    }

  await GetProducts(1, set_product_list);
  
}
catch(err)
{
  console.log(err);
}
}
