import Navbar from "../navbar/navbar";
import { motion } from "framer-motion";
import Line from "../common/Line/Line";
import { Link } from "react-router-dom";
import Card from "../common/card/card";
import Footer from "../footer/footer";
import CurrentPage from "../common/currentPage/currentPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
const DashBoard = (): any => {

  return (
    <>
      <div className="h-full flex flex-col items-center justify-between relative">
        <Navbar />

        <div className="w-4/5 lg:mt-28 pb-5">
          <CurrentPage parent={"Home"} child={"Dashboard"} />
        {/* hide NotAvailable component if data is not available */}
          <NotAvailable />
           {/* show Available component if data is not available */}
          {/* <Available/> */}
        </div>
        
        <Footer />
      </div>
    </>
  );
};

export default DashBoard;

const NotAvailable = (): any => {
  return (
    <>
      <div className="flex flex-col justify-center items-center w-full gap-4 mt-16">
        <span className="text-2xl border-b-2 border-orange-500 text-gray-500 w-fit uppercase">
          Not available
        </span>
        <div>
          <img
            className="h-36"
            src="https://checkprix.net/images/404-image.jpg"
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


const Available=():any=>{

    return (<>
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
    
    </>)
}