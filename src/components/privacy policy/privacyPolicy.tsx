import Footer from "../footer/footer";
import Navbar from "../navbar/navbar";
import Line from "../common/Line/Line";
import Policy from "./policy.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import CurrentPage from "../common/currentPage/currentPage";
import { useEffect } from "react";
const Privacy = (): any => {

  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])

  return (
    <>
      <div className="flex flex-col justify-between h-full">
        <Navbar />
        <div className="min-h-fit w-full  lg:mt-28">
          <div className="flex flex-col items-center ">
            <div className="w-full lg:max-w-7xl pt-5">
              <CurrentPage parent={"Home"} child={"Privacy Policy"} />
              <Line heading={"Privacy Policy"} />

              <p className="text-sm lg:text-base pl-5 pr-5 ">
                Welcome to CheckPrix. This page informs you of our policies
                regarding the collection, use and disclosure of Personal
                Information we receive from users of the Site. We use your
                Personal Information only for providing and improving the Site.
                By using the Site, you agree to the collection and use of
                information in accordance with this policy.
              </p>
              <p className="text-sm lg:text-base pl-5 pr-5 pt-3">
                By accessing or using the Service you agree to be bound by these
                Terms. If you disagree with any part of the terms then you may
                not access the Service.
              </p>
            </div>

            {/* Card here */}

            <div className="flex flex-col lg:max-w-7xl p-10 w-full  pt-10">
              {Policy?.policy?.map((item, index) => {
                return (
                  <FaqCard
                    key={index}
                    icon={faCaretDown}
                    questions={item.question}
                    answer={item.answer}
                  />
                );
              })}
            </div>
            <div className="flex justify-start lg:max-w-7xl flex-wrap p-5 w-full  pt-10  ">
              <p className="w-full flex  pl-10">
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

export default Privacy;

const FaqCard = (Props: Record<string, any>) => {
  return (
    <>
      <div className="w-full flex flex-col">
        <div className="flex gap-3">
          <span className="text-orange-500">
            <FontAwesomeIcon icon={Props.icon} />
          </span>
          <span>{Props?.questions}</span>
        </div>
        <div className="p-5">{Props?.answer}</div>
      </div>
    </>
  );
};
