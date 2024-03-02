import { useEffect, useState } from "react";

function StoreComponent(Props: Record<string,any>) {

  // console.log(Props)

    const [storeFormState,setStoreFormState] = useState<Record<string, any>>({
      price:Props.price || 0,
      link:Props.store_link || '',
      id:Props.id
    })

    useEffect(()=>{
      setStoreFormState({
        price:Props.price || 0,
        link:Props.store_link || '',
        id:Props.id
      })
    },[Props.price,Props.store_link])

    
  useEffect(()=>{
    Props.setHandleStore((prevState: any) => {
      const tempStoreState = [...prevState];
      tempStoreState[Props.index] = { ...tempStoreState[Props.index], ...storeFormState }; // Merge with the existing state
     // console.log(tempStoreState);
      return tempStoreState;
  });
    // console.log(storeFormState)
  },[storeFormState])
 
    const handleStoreForm = async (e:any,index:number,storeState:any,setHandleStore:Function)=>{
      const { id, value } = e.target;
     // Props.setCheckState(value);
      //console.log(Props.checkState)
      // Update storeFormState using functional update to ensure you get the most recent state
      setStoreFormState(prevState => ({
          ...prevState,
          [id]: value
      }));
  
           
    }


   
    return (
      <>
        <div className="flex justify-between gap-4 w-full space-y-2 h-auto border border-gray-300 rounded-md p-3">
          <div className="mb-4 flex flex-col items-center justify-center w-full h-auto">
            <div className="w-fit">
            <img
              src={Props.image[0].link || ""}
              alt="Store Logo"
              className="w- object-contain h-10"
            />
            </div>
            <div className="text-center font-semibold w-full h-auto">
              {Props.StoreName}
            </div>
          </div>
  
  
          <div className="mb-4 w-full">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-600"
            >
              Price (if price N/A leave default)
            </label>
            <input
              type="number"
              id="price"
              className="mt-1 p-2 w-full border rounded-md"
              value={storeFormState.price}
              placeholder="Enter price"
              onChange={(e)=>handleStoreForm(e,Props.index,Props.storeState,Props.setHandleStore)}
            />
          </div>

          <div className="mb-4 w-full">
            <label
              htmlFor="link"
              className="block text-sm font-medium text-gray-600"
            
            >
              Link
            </label>
            <input
              type="text"
              id="link"
              className="mt-1 p-2 w-full border rounded-md valueLink"
              value={storeFormState.link}
              placeholder="Enter price"
              onChange={(e)=>handleStoreForm(e,Props.index,Props.storeState,Props.setHandleStore)}
            />
          </div>
        </div>
      </>
    );
  }

  export default StoreComponent;