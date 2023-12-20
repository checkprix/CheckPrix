import { useState } from "react"

const StorageOption = (Props: Record<string, any>): any => {

    const [whichOptionSelected, setWhichOptionSelected] = useState(new Array(Props.Array_Of_Storange).fill(false))
    return (
        <>
            <div className="flex gap-3">
                {
                    Props?.Array_Of_Storange.map((item: string, index: number) => <span key={index}
                        onClick={() => { selectOption(index, whichOptionSelected, setWhichOptionSelected) }}
                        className={`p-5 w-24 uppercase border cursor-pointer
                    ${(whichOptionSelected[index]) ? 'border-orange-500' : 'border-gray-500'}
                     rounded-full text-center`}>{item}</span>
                    )
                }


            </div>
        </>
    )



}

export default StorageOption;

//select storage option method
const selectOption = (index: number, whichOptionSelected: Array<boolean>, setWhichOptionSelected: Function): void => {
    const array = new Array(whichOptionSelected.length).fill(false);
    array[index] = true;
    setWhichOptionSelected(array);
}