const Line = (Props: any): any => {
  return (
    <>
      <div className="w-full">
        <div className="w-full">
          <div className="w-fit flex flex-col">
            <span
              style={{ borderBottomWidth: "3px" }}
              className="text-3xl text-gray-500 border-orange-500"
            >
              {Props?.heading?.toUpperCase()}
            </span>
          </div>
        </div>

        {Props?.paragraph?.map((item: string, index: number) => {
          return (
            <p key={index} className="pl-5 text-sm text-gray-600 pt-2">
              {item}
            </p>
          );
        })}

        <div className="pt-10 w-full">
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
