import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Card = (Props: Record<string, any>): any => {
  return (
    <>
      <div className=" lg:w-96 w-full  p-5 flex flex-col gap-5 border rounded-md border-gray-400">
        <div className="w-full text-center text-xl font-semibold">Apple</div>
        <div className="w-full flex justify-center">
          <img src={Props?.image} alt="iphone" />
        </div>
        <div className="w-full text-center text-xl font-semibold">
          IPhone 12 - 64GB
        </div>
        <div className="bg-gray-100 rounded-md p-5 h-fit w-full flex flex-col ">
          {Props?.hideDeletePriceAndDownArrow && (
            <div className="flex justify-between ">
              <span>
                <del>Rs 12345</del>
              </span>
              <span className="flex justify-center items-center gap-1 text-orange-500">
                <span>2</span>
                <FontAwesomeIcon icon={faArrowDown} />
              </span>
            </div>
          )}

          <div className="flex">
            <span>Rs 12345</span>
          </div>
          {/* conditional rendering to show and hide log and visit store button */}
          {Props?.hideLogoAndVisitStore && (
            <div className="h-full flex flex-wrap justify-around mt-5 lg:gap-3">
              <span>Logo</span>
              <span>
                <button className="bg-orange-500 text-white p-2 rounded-md text-sm">
                  <a href={Props?.visitLink} target="_blank">
                    Visit Store
                  </a>
                </button>
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Card;
