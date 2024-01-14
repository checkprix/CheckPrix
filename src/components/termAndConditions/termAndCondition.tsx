import Footer from "../footer/footer";
import Navbar from "../navbar/navbar";
import Line from "../common/Line/Line";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";

import CurrentPage from "../common/currentPage/currentPage";
import { useEffect } from "react";
const TermAndConidtion = (): any => {

  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])

  const TermConditionArray: string[] = [
    "Our Service posts contents which are solely for informational purposes. Product descriptions, details, and additional information are creations of the vendor. CheckPrix will do its best to provide most accurate data available. Kindly note that, information including but not limited to prices, links, images, descriptions, product names, and delivery information may not be accurate or available.",
    "Our Service may contain links to third-party web sites or services that are not owned or controlled by checkprix.mu. CheckPrix has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that CheckPrix shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.",
    "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 90 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.",
  ];




  return (
    <>
      <div className="flex flex-col justify-between h-full">
        <Navbar />
        <div className="min-h-fit w-full  lg:mt-28">
          <div className="flex flex-col items-center ">
            <div className="w-full lg:max-w-7xl pt-5">
              <CurrentPage parent={"Home"} child={"Term and conditions"} />
              <Line heading={"Term and conditions"} />

              <p className="text-sm lg:text-base pl-5 pr-5 ">
                Welcome to CheckPrix. Please read these Terms and Conditions
                carefully before using the CheckPrix website and the services
                operated by us CheckPrix.
              </p>
              <p className="text-sm lg:text-base pl-5 pr-5 pt-3">
                Your access to and use of the Service is conditioned on your
                acceptance of and compliance with these Terms. These Terms apply
                to all visitors, users and others who access or use the Service.
              </p>
              <p className="text-sm lg:text-base pl-5 pr-5 pt-3 font-semibold">
                By accessing or using the Service you agree to be bound by these
                Terms. If you disagree with any part of the terms then you may
                not access the Service.
              </p>
            </div>

            {/* Card here */}

            <div className="flex justify-center lg:max-w-7xl p-5 w-full  pt-10">
              <div className="flex justify-center  flex-wrap gap-16 w-fit">
                <TermConditionCards
                  title={"Reliability"}
                  icon={faFile}
                  description={TermConditionArray[0]}
                />

                <TermConditionCards
                  title={"Honesty"}
                  icon={faLink}
                  description={TermConditionArray[1]}
                />

                <TermConditionCards
                  title={"Honesty"}
                  icon={faFile}
                  description={TermConditionArray[2]}
                />
              </div>
            </div>
            <div className="flex justify-start lg:max-w-7xl flex-wrap p-5 w-full gap-16 pt-10 pl-8 ">
              <p className="w-full flex lg:pl-16">
                <span className="uppercase text-orange-500 font-semibold">
                  note: &nbsp;
                </span>

                <span>
                  if you have any questions about our Terms and Conditions of
                  use, please contact us.
                </span>
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default TermAndConidtion;

const TermConditionCards = (Props: Record<string, any>) => {
  return (
    <>
      <div className=" w-full md:w-64 lg:w-80 flex flex-col bg-gray-100 items-center justify-start rounded-md border-l-4 border-l-orange-500 pt-3">
        <span className="text-orange-500 text-3xl ">
          <FontAwesomeIcon icon={Props?.icon} />
        </span>
        <span className="text-gray-600 text-xl pt-1">{Props?.title}</span>
        <div>
          <p className="p-3 text-sm lg:text-base  break-words">
            {Props?.description}
          </p>
        </div>
      </div>
    </>
  );
};
