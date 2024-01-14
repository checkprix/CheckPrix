import Products from "../allProducts/products"
import React from "react"
const Search = ():any=>{
    return (<>
    <Products currentPage={"Search"} showSearch={true}/>
    </>)
}

export default Search;