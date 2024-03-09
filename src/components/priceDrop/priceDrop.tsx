import Navbar from "../navbar/navbar";
import { motion } from "framer-motion";
import Line from "../common/Line/Line";
import Card from "../common/card/card";
import Footer from "../footer/footer";
import CurrentPage from "../common/currentPage/currentPage";
import Image from "../../assests/439874995.png"
import { useEffect, useState } from "react";
import {
  GetPriceDrop,
  LoadMore,
  getValueBykey,
} from "../../common_method/commonMethods";
import { Spinner } from "flowbite-react";
const PriceDrop = (): any => {
  const Paragraph: Array<string> = [
    "Hello!. Welcome to the price drop page of CheckPrix. Here you get all the recent price reductions on all mobile phones in Mauritius from all your favourite stores.",
    'Just tap on anywhere on the item or click on the "visit store link". Explore the price reductions below.',
  ];

  const [product_list, set_product_list] = useState<
    Record<string, any>[] | null
  >(null);
  const [isFecthing, setIsFetching] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [allRecordFetched, setAllRecordFetched] = useState<boolean>(false);

  useEffect(() => {
    GetPriceDrop(1, set_product_list, setIsFetching);
  }, []);

  return (
    <>
      <div className="h-full flex flex-col items-center justify-between relative">
        <Navbar />

        <div className="w-4/5 lg:mt-28">
          <CurrentPage parent={"Home"} child={"Abouts us"} />
          <Line heading={"Price Drop"} paragraph={Paragraph} />
        </div>
        <div className="w-full flex justify-center items-center">
          <motion.div
            initial={{ marginLeft: "-250px", opacity: 0.5 }}
            whileInView={{ marginLeft: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="lg:justify-start lg:w-4/5  p-5 flex flex-wrap sm:justify-center  gap-2 lg:gap-3 overflow-hidden w-full h-full"
          >
            {/* Card here */}
            {Array.isArray(product_list) &&
              product_list.map((item) => {
                return (
                  <Card
                    key={item.id}
                    hideLogoAndVisitStore={true}
                    hideDeletePriceAndDownArrow={true}
                    image={Image}
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
                {/*getValueBykey("image", item)*/}
        {Array.isArray(product_list) && (
          <div
            className="flex justify-center p-3"
            style={{ display: allRecordFetched ? "none" : "block" }}
          >
            <button
              onClick={async () => {
                await setIsFetching(true);
                await setPage((preState) => preState + 1);

                await LoadMore(
                  setPage,
                  set_product_list,
                  `${process.env.REACT_APP_PRICE_DROP}/page/${page + 1}`,
                  false,
                  "products",
                  setAllRecordFetched
                );
                await setIsFetching(false);
              }}
              className="bg-orange-500 p-3 rounded-md text-white mt-2"
            >
              {!isFecthing ? "Load More" : "Loading..."}
            </button>
          </div>
        )}
        {isFecthing && <Spinner />}
        {allRecordFetched && "No more Products"}
     <div className="mt-3 w-full">
     <Footer />
     </div>
      </div>
    </>
  );
};

export default PriceDrop;
