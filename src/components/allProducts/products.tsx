import Navbar from "../navbar/navbar";
import { motion } from "framer-motion";
import Line from "../common/Line/Line";
import { Link, useParams } from "react-router-dom";
import Card from "../common/card/card";
import Footer from "../footer/footer";
import CurrentPage from "../common/currentPage/currentPage";
const Products = (Props:Record<string,any>): any => {

  const param = useParams();
  const Paragraph: Array<string> = [
    `Hello!. Welcome to the ${(Props.showSearch)?"Search":param.param} page of CheckPrix. Here you get all the recent price reductions on all mobile phones in Mauritius from all your favourite stores.",
    'Just tap on anywhere on the item or click on the "visit store link". Explore the price reductions below.`,
  ];



  return (
    <>
      <div className="h-full flex flex-col items-center justify-between relative">
      
       <Navbar />
      
         
        <div className="w-4/5 lg:mt-28">
        <CurrentPage parent={"Home"} child={(Props.showSearch)?"Search":param.param}/>
          <Line heading={(Props.showSearch)?"Search":param.param} paragraph={Paragraph} />
        </div>
        <div className="w-full flex justify-center items-center">
          <motion.div
            initial={{ marginLeft: "-250px", opacity: 0.5 }}
            whileInView={{ marginLeft: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="lg:justify-start lg:w-4/5  p-5 flex flex-wrap md:justify-center  gap-2 lg:gap-3  overflow-hidden w-full h-full"
          >
            {/* Card here */}
            <Link
              className="w-full md:w-72 lg:w-96"
              to={`/product-detail/${12}`}
              target="_blank"
            >
              <Card
                hideLogoAndVisitStore={true}
                hideDeletePriceAndDownArrow={true}
                image={"https://checkprix.net/uploaded_Images/241347069.png"}
                visitLink={'http://www.google.com'}
              />
            </Link>

            <Link
              className="w-full md:w-72 lg:w-96"
              to={`/product-detail/${12}`}
              target="_blank"
            >
              <Card
                hideLogoAndVisitStore={true}
                hideDeletePriceAndDownArrow={true}
                image={"https://checkprix.net/uploaded_Images/241347069.png"}
              />
            </Link>

            <Link
              className="w-full md:w-72 lg:w-96"
              to={`/product-detail/${12}`}
              target="_blank"
            >
              <Card
                hideLogoAndVisitStore={true}
                hideDeletePriceAndDownArrow={true}
                image={"https://checkprix.net/uploaded_Images/241347069.png"}
              />
            </Link>
          </motion.div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Products;
