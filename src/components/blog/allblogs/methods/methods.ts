import { GetDataAPI } from "../../../../apihooks/apihooks"

const getBlog = async(page:number,set_blog_list:Function)=>{
const blogs = await GetDataAPI(`${process.env.REACT_APP_BLOGS_API_URL}/page/${page}`);
console.log(blogs.data.blogs)
set_blog_list(blogs.data.blogs)
}


export {getBlog}