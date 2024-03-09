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
import { LoadMore } from "../../common_method/commonMethods";
import Search from "../search/search";
import Spinner from "../common/spinner/spinner";

const Products = (Props: Record<string, any>): any => {
  const param = useParams();
  const Paragraph: Array<string> = [
    `Hello!. Welcome to the ${
      Props.showSearch ? "Search" : param.param
    } page of CheckPrix. Here you get all the recent price reductions on all mobile phones in Mauritius from all your favourite stores.",
    'Just tap on anywhere on the item or click on the "visit store link". Explore the price reductions below.`,
  ];

  //fetch product from db and save in this state
  const [product_list, set_product_list] = useState<
    Record<string, any>[] | null
  >(null);
  const [isFecthing, setIsFetching] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [allRecordFetched, setAllRecordFetched] = useState<boolean>(false);
  useEffect(() => {
    //
    GetProductsHandler(1, set_product_list, Props?.showSearch, param.param);
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
            className="lg:justify-start lg:w-4/5  p-5 flex flex-wrap sm:justify-center  gap-2 lg:gap-3 overflow-hidden w-full h-full"
          >
            {!Array.isArray(product_list) && <Spinner />}
            {/* Card here */}
            {Array.isArray(product_list) &&
              product_list.map((item) => {
                return (
                  <Card
                    key={item.id}
                    hideLogoAndVisitStore={true}
                    hideDeletePriceAndDownArrow={true}
                    image={
                      item.image[0].link ? item.image[0].link : item.image.link
                    }
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
        {Array.isArray(product_list) && (
          <div
            className="h-auto"
            style={{ display: allRecordFetched ? "none" : "block" }}
          >
            <div
              className="flex justify-center"
              style={{ display: !Props?.showSearch ? "flex" : "none" }}
            >
              <button
                onClick={async () => {
                  await setIsFetching(true);
                  await setPage((preState) => preState + 1);
                  LoadMore(
                    setPage,
                    set_product_list,
                    `${process.env.REACT_APP_PRODUCTS_API_URL}/page/${
                      page + 1
                    }`,
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

export default Products;

const GetProductsHandler = async (
  page: number,
  set_product_list: Function,
  search: boolean,
  param: string | undefined
) => {
  try {
    if (search) {
      const searched = await GetDataAPIParam(
        `${process.env.REACT_APP_SEARCH}`,
        param
      );
      console.log(searched);
      set_product_list(getValueBykey("products", searched));
      return;
    }

    await GetProducts(page, set_product_list);
  } catch (err) {
    console.log(err);
  }
};
