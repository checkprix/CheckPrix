import { PostDataApiJSON } from "../../../apihooks/apihooks"

const login = async(email:string,password:string): Promise<any> =>{
    try{
        console.log(email,password)
    const is_login =  await PostDataApiJSON(process.env.REACT_APP_ADMIN_LOGIN_API_URL,{email:email,password:password});
    console.log(is_login)
    if(is_login.is_success)
    {
        localStorage.setItem('check_prix_admin',JSON.stringify({is_admin_logged_in:true,timestamp:is_login.timestamp}));
        return true;
    }
    return false;
    }
    catch(err)
    {
        console.log(err)
        return false;
    }
}

export {login}