
const Line = (Props:any): any => {
  
    return (
      <>
        <div className="w-full">
          <div className="w-full">
            <div className="w-fit p-5 flex flex-col">
              <span
                style={{ borderBottomWidth: "3px" }}
                className="text-3xl text-gray-500 border-orange-500"
              >
                {Props?.heading?.toUpperCase()}
              </span>
            </div>
          </div>
  
          <div className="p-5 w-full">
            <span
              style={{ height: "1px" }}
              className="block w-full bg-gray-400"
            ></span>
          </div>
        </div>
      </>
    );
  };
 
  export default Line;

  //FEATURED BRANDS