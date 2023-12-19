import Footer from "../footer/footer";
import Navbar from "../navbar/navbar";
import Line from "../common/Line/Line";
import { faUserShield } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBusinessTime, faQuestion,faClockRotateLeft} from "@fortawesome/free-solid-svg-icons";
const AboutUs = (): any => {
    return (
        <>
            <div className="flex flex-col justify-between h-full">
                <Navbar />
                <div className="min-h-fit">
                    <div className="flex flex-col items-center mt-16">
                        <div className="w-full lg:max-w-7xl pt-5">
                            <Line heading={'About Us'} />
                            
                            <p className="text-sm lg:text-base pl-5 pr-5 ">
                                CheckPrix is a Data Service Company with focus on data collection, data entry, data organisation, data cleansing, data management, data storage, data presentation and data publishing.
                            </p>
                            <p className="text-sm lg:text-base pl-5 pr-5 pt-3">
                            CheckPrix was started when we realised the lack of data in general, lack of organised data, as well as well organised databases and sources for timely and reliable data and data service in Mauritius. As such, we begun our journey in May 2021 to resolve this.
                            </p>
                            <p className="text-sm lg:text-base pl-5 pr-5 pt-3">
                            We are committed to becoming a reliable and a one stop shop for all your data and related service needs in Mauritius and the world at large.
                            </p>
                            
                        </div>

                        <div className="flex justify-center pt-10">
                            <span className="uppercase text-2xl text-gray-400">Our core values</span>
                        </div>

                        <div className="w-full lg:max-w-7xl pt-5 pl-5 pr-5">
                          <span className="block text-center font-medium text-gray-500">
                          In a world of inundating data especially in the advent of the internet, it is always difficult to find what you want at the right time.
                          </span>
                          <span className="block text-center">
                          We have adopted these qualities to give you the best:
                          </span>
                        </div>
                        <div className="w-4/5 p-5 flex flex-wrap gap-5 lg:gap-3  justify-start pt-5">
                            {/* Card here */}

                        </div>
                        <div className="flex justify-center lg:max-w-7xl p-5 flex-wrap w-full gap-7 pb-16 pt-5">
                            <AboutUsCard title={"Reliability"} icon={faUserShield}/>
                            <AboutUsCard title={"Support"} icon={faBusinessTime}/>
                            <AboutUsCard title={"Honesty"} icon={faQuestion}/>
                            <AboutUsCard title={"Timeliness"} icon={faClockRotateLeft}/>
                        </div>

                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default AboutUs;

const AboutUsCard = (Props:Record<string,any>)=>{
    return (
        <>
        <div className="w-full md:w-64 lg:w-72 h-24 flex flex-col bg-gray-100 items-center justify-center rounded-md border-l-4 border-l-orange-500">
            <span className="text-orange-500 text-3xl"><FontAwesomeIcon icon={Props?.icon}/></span>
            <span className="text-gray-600 text-xl pt-1">{Props?.title}</span>
        </div>
        </>
    )
}