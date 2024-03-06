import Cover from "../../assests/images/cover.jpg";
import Navbar from "../navbar/navbar";
import Line from "../common/Line/Line";
import Card from "../common/card/card";
import SearchBar from "../common/searchBar/searchBar";
import BlogCard from "../common/blogcard/blogCard";
import Footer from "../footer/footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBlog } from "../blog/allblogs/methods/methods";
import {
  GetPriceDrop,
  GetProducts,
  getValueBykey,
} from "../../common_method/commonMethods";
import Splinner from "../common/spinner/spinner";

const Home = (): any => {
  const [blog_list, set_blog_list] = useState<Record<string, any>[] | null>(
    null
  );
  const [lastest_phone_list, set_lastest_phone_list] = useState<
    Record<string, any>[] | null
  >(null);
  const [priceDrop_phone_list, set_Price_Drop_phone_list] = useState<
    Record<string, any>[] | null
  >(null);
  useEffect(() => {
    getBlog(1, set_blog_list);
    GetProducts(1, set_lastest_phone_list);
    GetPriceDrop(1, set_Price_Drop_phone_list);
  }, []);

  return (
    <>
      {/* Upper section which contains navbar and cover image and serach bar */}

      <div
        style={{ backgroundImage: `url(${Cover})` }}
        className="w-full lg:h-3/5 h-fit bg-cover relative "
      >
        <Navbar />

        <div className="w-full h-full pt-40 pb-40 lg:pb-0 lg:pt-0 p-5 flex flex-col justify-center items-center">
          <SearchBar />
        </div>
      </div>

      {/* //Slider here */}
      {/* <div className="flex flex-col items-center justify-center mt-5">
        <div className="w-4/5">
       
     
        </div>
        </div> */}

      {/* ------------Price Drop section start------------  */}
      <div className="flex flex-col items-center justify-center mt-5">
        <div className="w-4/5">
          <Line heading={"Price Drop"} />
        </div>
        <motion.div
          initial={{ marginLeft: "-250px", opacity: 0.5 }}
          whileInView={{ marginLeft: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="lg:justify-start lg:w-4/5  p-5 flex flex-wrap md:justify-center  gap-2 lg:gap-3  overflow-hidden w-full "
        >
          {!Array.isArray(priceDrop_phone_list) && <Splinner />}
          {/* Card here */}
          {Array.isArray(priceDrop_phone_list) &&
            priceDrop_phone_list.map((item,index) => {
              if(index > 4) return ""
              return (
                <Card
                  key={item.id}
                  hideLogoAndVisitStore={true}
                  hideDeletePriceAndDownArrow={true}
                  image={getValueBykey("image", item)}
                  visitLink={getValueBykey("store_link", item)}
                  old_price={getValueBykey("old_price", item)}
                  new_price={getValueBykey("new_price", item)}
                  product_name={getValueBykey("product_name", item)}
                  brand={getValueBykey("manufacturer", item)}
                  id={getValueBykey("id", item)}
                />
              );
            })}
        </motion.div>
      </div>
      {/* -------------Price Drop section end----------------*/}

      {/* -------------Latest Phone section end----------------*/}

      <div className="flex flex-col items-center justify-center mt-5">
        <div className="w-4/5">
          <Line heading={"Latest Phone"} />
        </div>
        <motion.div
          initial={{ marginLeft: "-250px", opacity: 0.5 }}
          whileInView={{ marginLeft: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="lg:justify-start lg:w-4/5  p-5 flex flex-wrap md:justify-center  gap-2 lg:gap-3  overflow-hidden w-full"
        >
          {!Array.isArray(lastest_phone_list) && <Splinner />}
          {/* Card here */}
          {Array.isArray(lastest_phone_list) &&
            lastest_phone_list.map((item:Record<string,any>,index:number) => {
              if(index > 4) return ""
              return (
                <Card
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
              );
            })}
        </motion.div>
      </div>

      {/* blogPost here */}
      <div>
       
        <BlogPost blogList={blog_list} />
      </div>
      <div className="bottom-0 h-fit mt-16">
        <Footer />
      </div>
    </>
  );
};

export default Home;

const BlogPost = ({ blogList }: any): any => {
  return (
    <>
    
      <div className="flex flex-col items-center mt-16 bg-gray-100">
        <div className="w-4/5 pt-5">
          <Line heading={"Blog posts"} />
        </div>
        <motion.div
          initial={{ marginTop: "50px", opacity: 0.5 }}
          whileInView={{ marginTop: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="w-4/5 p-5 flex flex-col lg:flex-row lg:flex-wrap  gap-5 lg:gap-3  justify-start pt-5"
        >
           {!Array.isArray(blogList) && <Splinner />}
          {/* Card here */}
          {Array.isArray(blogList) &&
            blogList.map((item, index) => {
              if(index > 4) return "";
              return (
                <BlogCard
                  key={item.id}
                  id={item.id}
                  image={item.image}
                  title={item.title}
                />
              );
            })}

          {/* <BlogCard id={345} /> */}
        </motion.div>
      </div>
    </>
  );
};
