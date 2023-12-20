import Card from "../../../common/card/card";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const SimilarProducts = (): any => {
  return (
    <>
      <motion.div
        initial={{ marginLeft: "-250px", opacity: 0.5 }}
        whileInView={{ marginLeft: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="lg:justify-start  p-5 flex flex-wrap md:justify-center  gap-2 lg:gap-3  overflow-hidden w-full "
      >
        {/* Card here */}
        <Link className="w-full md:w-72 lg:w-96" to={`/product-detail/${12}`} target="_blank">
          <Card
            hideLogoAndVisitStore={true}
            hideDeletePriceAndDownArrow={true}
            image={"https://checkprix.net/uploaded_Images/241347069.png"}
          />
        </Link>

        <Link className="w-full md:w-72 lg:w-96" to={`/product-detail/${12}`} target="_blank">
          <Card
            hideLogoAndVisitStore={true}
            hideDeletePriceAndDownArrow={true}
            image={"https://checkprix.net/uploaded_Images/241347069.png"}
          />
        </Link>


      </motion.div>
    </>
  );
};

export default SimilarProducts;
