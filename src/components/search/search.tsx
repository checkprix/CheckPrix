import Products from "../allProducts/products"

const Search = ():any=>{
    return (<>
    <Products currentPage={"Search"} showSearch={true}/>
    </>)
}

export default Search;