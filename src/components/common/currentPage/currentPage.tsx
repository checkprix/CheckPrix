const CurrentPage=(Props:Record<string,any>):any=>{
    return (<>
      <div className="w-4/5 p-5 flex gap-2">
          <span className="text-blue-700 font-semibold">
            {
                Props?.parent
            }
          </span>
          <span>/</span>
          <span className="text-gray-600">
            {
                 Props?.child
            }
          </span>
        </div>
    </>)
}

export default CurrentPage;