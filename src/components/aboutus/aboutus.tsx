import Footer from "../footer/footer";
import Navbar from "../navbar/navbar";
import Line from "../common/Line/Line";
const AboutUs = (): any => {
    return (
        <>
            <div className="flex flex-col justify-between h-full">
                <Navbar />
                <div className="h-full">
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
                        <div className="w-4/5 p-5 flex flex-wrap gap-5 lg:gap-3  justify-start pt-5">
                            {/* Card here */}

                        </div>

                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default AboutUs;