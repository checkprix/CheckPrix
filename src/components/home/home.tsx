import Cover from "../../assests/images/cover.jpg";
import Navbar from "../navbar/navbar";
import Line from "../common/Line/Line";
import Card from "../common/card/card";
import SearchBar from "../common/searchBar/searchBar";
import BlogCard from "../common/blogcard/blogCard";
import Footer from "../footer/footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const Home = (): any => {
  return (
    <>
      {/* Upper section which contains navbar and cover image and serach bar */}

      <div
        style={{ backgroundImage: `url(${Cover})` }}
        className="w-full h-5/6 bg-cover"
      >
        <Navbar />
        <div className="w-full h-full p-5 flex flex-col justify-start items-center mt-5">
          <SearchBar />
        </div>
      </div>

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
      </div>
      {/* -------------Price Drop section end----------------*/}

      <div className="flex flex-col items-center justify-center mt-5">
        <div className="w-4/5">
          <Line heading={"Latest Phone"} />
        </div>
        <motion.div
        initial={{ marginLeft: "-250px", opacity: 0.5 }}
        whileInView={{ marginLeft: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="lg:justify-start lg:w-4/5  p-5 flex flex-wrap md:justify-center  gap-2 lg:gap-3  overflow-hidden w-full "
      >
        {/* Card here */}
        <Link className="w-full md:w-72 lg:w-96" to={`/product-detail/${12}`} target="_blank">
          <Card
         
            image={"https://checkprix.net/uploaded_Images/241347069.png"}
          />
        </Link>

        <Link className="w-full md:w-72 lg:w-96" to={`/product-detail/${12}`} target="_blank">
          <Card
          
            image={"https://checkprix.net/uploaded_Images/241347069.png"}
          />
        </Link>


      </motion.div>
      </div>

      {/* blogPost here */}
      <BlogPost />
      <div className="bottom-0 h-fit mt-16">
        <Footer />
      </div>
    </>
  );
};

export default Home;

const BlogPost = (): any => {
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
          className="w-4/5 p-5 flex flex-wrap gap-5 lg:gap-3  justify-start pt-5"
        >
          {/* Card here */}
          <BlogCard id={123} />
          <BlogCard id={345} />
        </motion.div>
      </div>
    </>
  );
};
