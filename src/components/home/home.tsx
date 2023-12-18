import Cover from "../../assests/images/cover.jpg";
import Navbar from "../navbar/navbar";
import Line from "../common/Line/Line";
const Home = (): any => {
  return (
    <>
      {/* Upper section which contains navbar and cover image and serach bar */}

      <div
        style={{ backgroundImage: `url(${Cover})` }}
        className="w-full h-5/6 bg-cover"
      >
        <Navbar />
        <div className="w-full h-full p-5 flex flex-col justify-start items-center mt-5">
          <SearchBar />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center mt-5">
        <div className="w-4/5">
          <Line heading={'Price Drop'}/>
        </div>
        <div className="w-4/5">
          {/* Card here */}
          <div className="w-1/4 p-5 flex flex-col gap-5">
          <div className="w-full text-center text-xl">Apple</div>
          <div className="w-full flex justify-center">
            <img src="https://checkprix.net/uploaded_Images/241347069.png" alt="iphone"/>
          </div>
          <div className="w-full text-center text-xl">Iphone 12 - 64GB</div>
          <div className="bg-gray-400 opacity-5 h-40 w-full"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

const SearchBar = (): any => {
  return (
    <>
      <div className="w-5/6 lg:w-4/6 lg:h-4/6 flex justify-center items-center flex-col bg-white rounded-xl gap-4 p-8">
        <div className="flex flex-col gap-5">
          <h2 className="text-center text-orange-500 text-xl lg:text-4xl">
            SEARCH, COMPARE AND SAVE
          </h2>
          <p className="hidden lg:block text-center text-xl p-3">
            Save while you get the best and cheap deals on mobile phones.
            Compare phone prices in Mauritius here!
          </p>
        </div>
        <form className="w-full ">
          <div className="w-full flex gap-2">
            <input
              className="w-full border-2 border-gray-700 rounded p-3 placeholder:text-xl"
              placeholder="Search"
              type="text"
            />
            <button
              style={{ borderWidth: "3px" }}
              className="hidden lg:block p-3 rounded-md border-orange-500 text-orange-500 text-xl"
            >
              Compare
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
