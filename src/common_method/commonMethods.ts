import { GetDataAPI, GetDataAPICredentialAdmin } from "../apihooks/apihooks"

const GetProducts = async(page:number,set_product_list:Function)=>{
   const products = await GetDataAPI(`${process.env.REACT_APP_PRODUCTS_API_URL}/page/${page}`);
   set_product_list(getValueBykey('products',products)|| null);
   //console.log(products)
}

function getValueBykey(getkey:string, obj:Record<string,any>):any {
    for (let keys in obj) {
      if (keys == getkey) return obj[keys];
  
      if (Array.isArray(obj[keys])) continue;
  
      if (typeof obj[keys] === "object") {
        const result = getValueBykey(getkey, obj[keys]);
  
        if (result !== undefined) return result;
      }
    }
    return undefined;
  }

function Captalize(str:string)
{
  let first_letter = str.charAt(0).toUpperCase();
  return first_letter+str.slice(1);
}




const checkToken = (err:any)=>{
  console.log(err);
  if(err.response.status === 401)
  {
    localStorage.removeItem("check_prix_admin");
    alert('token Expired re-login !!!');
    window.location.href = '/admin-login'

  }
}
const checkTokenUser = (err:any)=>{
  console.log(err);
  if(err.response.status === 401)
  {
    localStorage.removeItem("checkprix");
    window.location.href = '/signin'

  }
}


const LoadMore = async (setPage: Function, setState: Function, apiUrl: string, admin: boolean, field: string,setAllFeteched:Function) => {
  let fetchDataFunction = admin ? GetDataAPICredentialAdmin : GetDataAPI;


  const res = await fetchDataFunction(apiUrl);

  if (getValueBykey('is_success', res)) {
    const data = getValueBykey(field, res);
    console.log("Load more", data);
    if(data.length === 0) {console.log("empty");setAllFeteched(true); return;}

    setState((prevState: any[]) => {
      
      const existingProductIds = new Set(prevState.map(item => item.id));
      const filteredData = data.filter((product: any) => !existingProductIds.has(product.id));
      return [...prevState, ...filteredData];
    });
  } else {
    setPage((prevState: number) => prevState - 1);
  }
}


const GetPriceDrop = async (page:number,setProduct:Function)=>{
  try{
    const priceDrop = await GetDataAPI(`${process.env.REACT_APP_PRICE_DROP}/page/${page}`);
    if(getValueBykey('is_success',priceDrop))
    {
      setProduct((getValueBykey('products',priceDrop)) || null);
    }
  }
  catch(err)
  {
    alert("Internal server error")
  }
}


export {GetProducts,getValueBykey,Captalize,checkToken,checkTokenUser,LoadMore,GetPriceDrop}