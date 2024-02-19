import { PostDataApiCredentialAdmin,GetDataAPI,DeleteDataAPI, UpdateDataAPI, DeleteDataAPICredentialAdmin } from "../../../apihooks/apihooks";

const handleSavePost = async(formState:Record<string,any>,file:File|null) => {
  //  console.log(formState)
    if(!validateForm(formState,file))
    {
        alert("Fill all field and image");
        return false;
    }
    
    //clone form state and add file which goes to server
   const clone_of_formState = {
    ...formState,
    file:file
   }

   try{
    console.log(clone_of_formState)
    const resposne = await PostDataApiCredentialAdmin(`${process.env.REACT_APP_BLOGS_API_URL}`,clone_of_formState);
    if(resposne?.status===401) return resposne;
    if(resposne.is_success) {window.history.back(); return true;}
    else {
        alert("Blog does't saved")
        return false;
    }
   }
   catch(err)
   {
    alert(err);
   }
  }

const getBlog = async (set_state_of_blog:Function):Promise<any> =>{
    const blogs = await GetDataAPI(`${process.env.REACT_APP_BLOGS_API_URL}/admin/page/1`)
    if(blogs?.status===401) return blogs;
    set_state_of_blog(blogs.data.blogs);
    return  {status:200}
}

const getBlogById = async (id:string,setFromState:Function,setPreviewUrl:Function,set_image_key:Function,set_blog_id:Function):Promise<any>=>{
    try{
    if(id.length===0) return;
    const blog = await  GetDataAPI(`${process.env.REACT_APP_BLOGS_API_URL}/${id}`);
    if(blog?.status===401) return blog;
    console.log(blog.data)
    set_blog_id(blog.data.blog.id)
    setFromState(blog.data.blog)
    setPreviewUrl(blog.data.blog.image[0].link);
    set_image_key(blog.data.blog.image[0].link);
    }
    catch(err)
    {
        return '';
    }
    return {status:200}
}

const handleDelete = async(id: string,image_key:string):Promise<any> => {
    // Implement delete functionality
    if(!window.confirm("Are you want to delete ?")) return {status:404};
    try{
    const isDeleted = await DeleteDataAPICredentialAdmin(`${process.env.REACT_APP_BLOGS_API_URL}`,id,image_key);
    console.log(isDeleted.data)
    if(isDeleted.status===401) return isDeleted;
    if(isDeleted?.data?.is_success) {alert("Blog delete !!!"); window.history.back();}
    return {status:200}
    }
    catch(err)
    {
      alert("Internal server error");
      console.log(err);
    }
    
  };


  const updatePost = async(formState:Record<string,any>,file:File|null):Promise<any>=>{
    if(!validateFormUpdate(formState,file)) {
        alert("Fill all field");
        return;
    }
  
    formState['file'] = file;

    const is_updated = await UpdateDataAPI(process.env.REACT_APP_BLOGS_API_URL,formState);
    if(is_updated.status===401) return is_updated;
    if(is_updated?.is_success)
    {
        alert("Blog Updated!!!");
    }
    return {status:200}

  }

//validation methods
  const validateForm = (  form: Record<string, any>,
    file: File | null)=>{
    if(!file) return false;
  
    for(const [key,value] of Object.entries(form))
    {
      if(value.toString()=== "") return false
    }
  
    return true;
  }
  
  const validateFormUpdate = (  form: Record<string, any>,
    file: File | null)=>{
  
  
    for(const [key,value] of Object.entries(form))
    {
      if(value?.toString()=== "") return false
    }
  
    return true;
  }
  

  
  export {handleSavePost,validateForm,validateFormUpdate,getBlog,getBlogById,handleDelete,updatePost}