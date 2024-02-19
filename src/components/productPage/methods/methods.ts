import { GetDataAPI } from "../../../apihooks/apihooks"

const GetProductById = async (id:string|undefined,set_product:Function)=>{
    if(!id) return;
    try{
    const products = await GetDataAPI(`${process.env.REACT_APP_PRODUCTS_API_URL}/${id}`);
    console.log(products)
    set_product(products.data.product)
    }
    catch(err)
    {
        alert("Internal server error")
    }
}

export {GetProductById}