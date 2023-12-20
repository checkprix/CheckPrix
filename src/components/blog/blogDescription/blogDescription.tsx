import { useParams } from "react-router-dom";
import Cover from "../../../assests/images/cover.jpg"
import Line from "../../common/Line/Line";
import Footer from "../../footer/footer";
import Navbar from "../../navbar/navbar";
const BlogDescription = (): any => {

    const { id } = useParams();
    console.log(id)
    return (<>
        <Navbar />
        <div className="flex flex-col items-center mt-16">
            <div className="w-fit flex flex-col gap-2 items-center justify-center p-5">
                <img src={Cover} className="block object-cover bg-cover bg-no-repeat md:max-w-2xl lg:max-w-4xl xl:max-w-6xl p-5" alt="blog cover image" />
                <div className="w-full">
                    <Line heading={"Title sds"} />
                </div>

            </div>
            <div className="flex flex-col gap-7  md:max-w-2xl lg:max-w-4xl xl:max-w-6xl p-10 md:p-5 mb-5">
                {/* map Description components */}
                <Description />
                <Description />
                <Description />
            </div>

        </div>
        <div className="bottom-0">
            <Footer />
        </div>
    </>)
}

export default BlogDescription;

const Description = (): any => {
    return (
        <>
            <p className="font-semibold">
                Title
            </p>

            <p>
                When it comes down to it, both iOS and Android have their pros and cons. If you are choosing a smartphone, the operating system will mostly come down to personal preference. In the big picture, our lives revolve around smartphones - from how we connect with people socially, to how we conduct business, and how we organize our day-to-day lives. This means that now more than ever before, the operating system you choose is something that really matters - it changes how you can use your phone, what apps are available to you, and a multitude of other factors.
            </p>
        </>
    )
}