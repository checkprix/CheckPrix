import { GetDataAPI } from "../apihooks/apihooks"

const GetProducts = async(page:number,set_product_list:Function)=>{
   const products = await GetDataAPI(`${process.env.REACT_APP_PRODUCTS_API_URL}/page/${page}`);
   set_product_list(products.data.products);
   console.log(products)
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

export {GetProducts,getValueBykey,Captalize,checkToken,checkTokenUser}