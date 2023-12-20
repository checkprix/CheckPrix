import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import Footer from "../footer/footer";
import Navbar from "../navbar/navbar";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import StorageOption from "./subComponents/StorageOptions/storangeOption";
const ProductPage = (): any => {

    const { id } = useParams();
    //write code to fetch data for product
    return (<>
        <Navbar />
        <div className="h-full d-flex flex-col justify-between">
            <MobileDescription />
        </div>
        <Footer />

    </>)
}

export default ProductPage;


const MobileDescription = (): any => {
    return (<>
        <div className="flex flex-col lg:flex-row md:justify-center lg:gap-24 ">
            <div className="flex justify-center items-center">
                <img className="bg-cover object-cover w-44  h-fit"
                    src="https://checkprix.net/uploaded_Images/1097348779.jpg" alt="Mobile image" />
            </div>
            <div className="pt-10 pl-10 pr-10">
                <h2 className="text-2xl font-semibold">Apple Iphone 14 Pro Max</h2>
                <p className="mt-8 text-gray-600">
                    The price of Apple Iphone 14 Pro Max in Mauritius starts from Rs 1 to Rs 10 across online stores.
                </p>
                {/* fetures */}
                <Features description={"IOS 16.0"} />
                <Features description={"6.7 inches LTPO Super Retina XDR OLED"} />
                <Features description={"Available in 128GB 6GB RAM, 256GB 6GB RAM, 512GB 6GB RAM, 1TB 6GB RAM"} />
                <Features description={"Available in Space Black, Silver, Gold, Deep Purple"} />
                <Features description={"6.7 inches LTPO Super Retina XDR OLED"} />

                {/* Pricing  */}
                <div className="flex flex-col pt-5 gap-3">
                    <div className="flex gap-3">
                        <span >{`Minimum Price: Rs ${1}`}</span>
                        <span>{`Range: Rs${1} - Rs ${10}`}</span>
                    </div>
                    <span>{`Total listing: ${1} items`}</span>
                </div>
                {/* Storage Options */}
                <div className="flex flex-col pt-5 gap-3">
                    
                    <StorageOption Array_Of_Storange={["128GB", "256GB", "512GB", "1TB"]} />
                </div>

            </div>


        </div>
    </>)
}

const Features = (Props: Record<string, any>): any => {
    return (
        <>
            <div className="flex mt-3 gap-2">
                <span>
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                <span>
                    {Props?.description}
                </span>
            </div>
        </>
    )
}


