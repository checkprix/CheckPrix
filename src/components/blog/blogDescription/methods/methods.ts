import { GetDataAPI } from "../../../../apihooks/apihooks"

const GetBlogById= async(id:string|undefined,set_blog:Function)=>{
    if(!id) return;
    const blog = await GetDataAPI(`${process.env.REACT_APP_BLOGS_API_URL}/${id}`)
    console.log(blog.data.blog)
    set_blog(blog.data.blog);
}

export {GetBlogById}