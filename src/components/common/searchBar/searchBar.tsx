import { useState } from "react";
import { useNavigate } from "react-router-dom";
const SearchBar = (): any => {

  const [stateForSearchInput,setStateForSearchInput] = useState('')
  const navigate = useNavigate();
  return (
    <>
      <div className="w-5/6 lg:w-5/6 lg:h-fit flex justify-start items-center flex-col bg-white rounded-xl gap-4 p-8">
        <div className="flex flex-col gap-5">
          <h2 className="text-center text-orange-500 text-xl lg:text-4xl">
            SEARCH, COMPARE AND SAVE
          </h2>
          <p className="hidden lg:block text-center text-xl p-3">
            Save while you get the best and cheap deals on mobile phones.
            Compare phone prices in Mauritius here!
          </p>
        </div>
        <form className="w-full">
          <div className="w-full  flex flex-col justify-center items-center lg:justify-normal lg:items-start lg:flex-row gap-2">
            <input
            value={stateForSearchInput}
            onChange={(e)=> setStateForSearchInput(e.target.value)}
              className="w-full border  border-gray-400 rounded p-3 placeholder:text-xl"
              placeholder="Search"
              type="text"
            />
            <button
            onClick={()=> navigate(`/search/${stateForSearchInput}`)}
              style={{ borderWidth: "3px" }}
              className="lg:block p-3 w-fit lg:w-auto rounded-md border-orange-500 text-orange-500 text-xl"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SearchBar;
