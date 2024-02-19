import { useParams } from "react-router-dom";
import Cover from "../../../assests/images/cover.jpg";
import Line from "../../common/Line/Line";
import Footer from "../../footer/footer";
import Navbar from "../../navbar/navbar";
import {useEffect, useState} from "react";
import { GetBlogById } from "./methods/methods";
const BlogDescription = (): any => {

  const [blog_state,set_blog] = useState<Record<string,any>>({})
  const { id } = useParams();
  console.log(id);

  useEffect(()=>{
    //Fetch description and image link
    GetBlogById(id,set_blog)
  },[])



  return (
    <>
      <Navbar />
      <div className="flex justify-center mt-5 lg:mt-28 w-full">
      <img
            src={(Array.isArray(blog_state.image))? blog_state.image[0].link:''}
            className="block object-cover bg-cover bg-no-repeat md:max-w-2xl lg:max-w-4xl xl:max-w-6xl p-5"
            alt="blog cover image"
          />
          </div>
      
      <div className="flex flex-col items-center">
        <div className="flex md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mt-3 p-10 md:p-5 mb-5 w-full">
        <Line heading={blog_state?.title} />
        </div>

        <div className="flex  flex-col gap-7  md:max-w-2xl lg:max-w-4xl xl:max-w-6xl p-10 md:p-5 mb-5 w-full">
          {/* map Description components */}
        <Details details={blog_state?.detail} heading={"Detail"}/>
        </div>

        <div className="flex flex-col gap-3 md:max-w-2xl lg:max-w-4xl xl:max-w-6xl p-10 md:p-5 mb-5 w-full">
          {/* map Description components */}
          <Description description={blog_state?.description} heading={"Title"}/>
        </div>
      </div>
      <div >
        <Footer />
      </div>
    </>
  );
};

export default BlogDescription;

const Description = ({ description,heading }: any): any => {
  if(!description) return ''
  //breaked string in array
  const break_in_array = description.split('\n');
  return (
    <>
      <p className="font-semibold">{heading}</p>

      {Array.isArray(break_in_array) && break_in_array.map((item: string, index: number) => {
        return <p className="text-xl" key={index}>{item}</p>;
      })}
    </>
  );
};



const Details = ({details,heading}:any):any=>{
  return <>
  <Description description={details} heading={heading}/>
  </>
}