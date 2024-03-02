import Line from "../../common/Line/Line";
import Navbar from "../../navbar/navbar";
import Cover from "../../../assests/images/cover.jpg";
import Footer from "../../footer/footer";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBlog } from "./methods/methods";
import { LoadMore } from "../../../common_method/commonMethods";
import Splinner from "../../common/spinner/spinner";
const Allblogs = () => {
  const [page_no, set_page_no] = useState<number>(1);
  const [blog_list, setBlog_list] = useState<Record<string, any>[]>([]);
  const [isFecthing, setIsFetching] = useState<boolean>(false);
  const [allRecordFetched,setAllRecordFetched] = useState<boolean>(false);
  useEffect(() => {
    //get blogs and set blog list state
    getBlog(page_no, setBlog_list);
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col items-center justify-between">
          <div className="w-4/5 p-5 flex gap-2 lg:mt-24">
            <span className="text-blue-700 font-semibold">Home</span>
            <span>/</span>
            <span className="text-gray-600">Blogs</span>
          </div>
          <div className="w-4/5 pt-5">
            <Line heading={"Blog posts"} />
          </div>
          <div className="w-4/5 p-5 flex flex-col  gap-5 lg:gap-3  justify-start pt-5 h-full">
            {!Array.isArray(blog_list) && <Splinner/>}
            {/*BlogCard here */}

            {Array.isArray(blog_list) && blog_list?.map((item: Record<string, any>) => {
              return (
                <BlogCard
                  key={item.id}
                  blogId={item.id}
                  title={item.title}
                  image={item.image}
                />
              );
            })}
          </div>
          { Array.isArray(blog_list) &&
          <div className="flex justify-center" style={{display:(allRecordFetched)?'none':'flex'}}>
            <button
              onClick={async () => {
                await setIsFetching(true);
                await set_page_no((preState) => preState + 1);
                console.log(page_no)
               await LoadMore(
                  set_page_no,
                  setBlog_list,
                  `${process.env.REACT_APP_BLOGS_API_URL}/page/${page_no+1}`,
                  false,
                  "blogs",
                  setAllRecordFetched
                );
                await setIsFetching(false);
              }}
              className="bg-orange-500 p-3 rounded-md text-white mt-2"
            >
              {!isFecthing ? "Load More" : "Loading..."}
            </button>
          </div>
          }
        </div>
        <div className="relative mt-3">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Allblogs;

const BlogCard = (Props: Record<string, any>) => {
  return (
    <>
      <div className="w-full  lg:w-[680px] xl:w-[680px] flex flex-col lg:flex-row  shadow-md hover:shadow-xl transition-all rounded-md">
        <div className="lg:p-3 rounded-md flex justify-center lg:flex-1">
          <img
            className="w-full object-cover overflow-hidden lg:h-40"
            src={Props?.image}
            alt="blogImage"
          />
        </div>
        <div className="flex flex-col justify-center items-center gap-3 p-3 lg:flex-1">
          <span className="text-center block">{Props?.title}</span>
          <button className="block text-xl p-3 text-white font-semibold rounded-md bg-gray-800 w-fit ">
            <Link to={`/blog-detail/${Props?.blogId}`} target="_blank">
              Read More
            </Link>
          </button>
        </div>
      </div>
    </>
  );
};
