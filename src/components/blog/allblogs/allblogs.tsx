import Line from "../../common/Line/Line";
import Navbar from "../../navbar/navbar";
import Cover from "../../../assests/images/cover.jpg"
import Footer from "../../footer/footer";
const Allblogs = () => {
    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center mt-16">
                <div className="w-4/5 p-5 flex gap-2">
                    <span className="text-blue-700 font-semibold">Home</span>
                    <span>/</span>
                    <span className="text-gray-600">Blogs</span>
                </div>
                <div className="w-4/5 pt-5">
                    <Line heading={'Blog posts'} />
                </div>
                <div className="w-4/5 p-5 flex flex-col flex-wrap gap-5 lg:gap-3  justify-start pt-5">
                    {/* Card here */}
                    <BlogCard image={"https://checkprix.net/uploaded_Images/924655363.jpg"} />
          <BlogCard image={Cover} />
                </div>

            </div>
            <div className="fixed bottom-0">
                <Footer />
            </div>


        </>
    )
}


export default Allblogs;

const BlogCard = (Props: Record<string, any>) => {
    return (<>
        <div className="w-full lg:w-fit  flex flex-col lg:flex-row  shadow-md hover:shadow-xl transition-all rounded-md">
            <div className="lg:p-3 rounded-md flex justify-center">
                <img className="object-cover w-full lg:w-96"
                    src={Props?.image} alt="blogImage" />
            </div>
            <div className="flex flex-col justify-center items-center gap-3 p-3">
                <span className="text-center">What’s the best smartphone to buy?</span>
                <button className="text-xl p-3 text-white font-semibold rounded-md bg-gray-800 w-fit"><a href="/dashproduct/12345" target="_blank">Read More</a></button>
            </div>
        </div>
    </>)
}