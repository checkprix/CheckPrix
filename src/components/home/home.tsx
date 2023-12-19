import Cover from "../../assests/images/cover.jpg";
import Navbar from "../navbar/navbar";
import Line from "../common/Line/Line";
import Card from "../common/card/card";
import SearchBar from "../common/searchBar/searchBar";
import BlogCard from "../common/blogcard/blogCard";
import Footer from "../footer/footer";
const Home = (): any => {
  return (
    <>
      {/* Upper section which contains navbar and cover image and serach bar */}

      <div
        style={{ backgroundImage: `url(${Cover})` }}
        className="w-full h-5/6 bg-cover">
        <Navbar />
        <div className="w-full h-full p-5 flex flex-col justify-start items-center mt-5">
          <SearchBar />
        </div>
      </div>

      {/* ------------Price Drop section start------------  */}
      <div className="flex flex-col items-center justify-center mt-5">
        <div className="w-4/5">
          <Line heading={'Price Drop'} />
        </div>
        <div className="w-4/5 p-5 flex flex-wrap gap-2 lg:gap-3 justify-center">
          {/* Card here */}
          <Card hideLogoAndVisitStore={true} hideDeletePriceAndDownArrow={true} />
          <Card hideLogoAndVisitStore={true} hideDeletePriceAndDownArrow={true} />
          <Card hideLogoAndVisitStore={true} hideDeletePriceAndDownArrow={true} />
          <Card hideLogoAndVisitStore={true} hideDeletePriceAndDownArrow={true} />

        </div>
      </div>
      {/* -------------Price Drop section end----------------*/}

      <div className="flex flex-col items-center justify-center mt-5">
        <div className="w-4/5">
          <Line heading={'Latest Phone'} />
        </div>
        <div className="w-4/5 p-5 flex flex-wrap gap-2 lg:gap-3 justify-center">
          {/* Card here */}
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>

      {/* blogPost here */}
      <BlogPost />
      <Footer/>
    </>
  );
};

export default Home;


const BlogPost = (): any => {
  return (
    <>
      <div className="flex flex-col items-center mt-16 bg-gray-100">
        <div className="w-4/5 pt-5">
          <Line heading={'Blog posts'} />
        </div>
        <div className="w-4/5 p-5 flex flex-wrap gap-5 lg:gap-3  justify-start pt-5">
          {/* Card here */}
          <BlogCard />
          <BlogCard /> <BlogCard /> <BlogCard /> <BlogCard /> <BlogCard />
        </div>

      </div>
    </>
  )
}


