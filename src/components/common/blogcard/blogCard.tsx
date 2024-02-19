import { Link } from "react-router-dom";

const BlogCard = (Props:Record<string,any>) => {
    return (<>
        <div className="w-full lg:w-[520px]  flex flex-col shadow-md hover:shadow-xl transition-all rounded-md">
            <div className="lg:p-3 rounded-md flex justify-center w-full  h-80">
                <img className="object-cover  overflow-hidden"
                    src={Props.image} alt="blogImage" />
            </div>
            <div className="flex flex-col justify-center items-center gap-3 p-3">
                <span className="text-center">{Props.title}</span>
                <button className="text-xl p-3 text-white font-semibold bg-gray-800 w-fit">
                    <Link to={`blog-detail/${Props?.id}`} target="_blank">Read More</Link></button>
            </div>
        </div>
    </>)
}

export default BlogCard;