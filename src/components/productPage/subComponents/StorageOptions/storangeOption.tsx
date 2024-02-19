import { useState } from "react";

const StorageOption = (Props: Record<string, any>): any => {
  const [whichOptionSelected, setWhichOptionSelected] = useState(
    new Array(Props.Array_Of_Storage).fill(false)
  );
  return (
    <>
      <div className="flex flex-wrap md:flex-nowrap items-center justify-center md:justify-normal lg: sm:flex-row gap-3">
        {Props?.Array_Of_Storage.map((item: string, index: number) => (
          <span
            key={index}
            onClick={() => {
              selectOption(index, whichOptionSelected, setWhichOptionSelected);
            }}
            className={`text-sm lg:text-2xl p-3 lg:p-5 w-24 lg:w-28 uppercase border cursor-pointer
                    ${
                      whichOptionSelected[index]
                        ? "border-orange-500"
                        : "border-gray-500"
                    }
                     rounded-full text-center`}
          >
            {item}
          </span>
        ))}
      </div>
    </>
  );
};

export default StorageOption;

//select storage option method
const selectOption = (
  index: number,
  whichOptionSelected: Array<boolean>,
  setWhichOptionSelected: Function
): void => {
  const array = new Array(whichOptionSelected.length).fill(false);
  array[index] = true;
  setWhichOptionSelected(array);
};
