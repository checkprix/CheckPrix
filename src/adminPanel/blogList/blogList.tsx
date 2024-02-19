import React, { useState,useEffect } from "react";
import Image from "../../assests/images/cover.jpg";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/navbar";
import { DeleteDataAPI, DeleteDataAPICredentialAdmin } from "../../apihooks/apihooks";
import { getBlog } from "../createBlog/methods/methods";
const BlogList = () => {
  const navigate = useNavigate();

  //after fetching blogs data from server, this state store blog data
  const [list_of_blogs, setList_of_blog] = useState([]);


  useEffect(()=>{
    //get blog from server and set blog list state
    getBlogsList(setList_of_blog,navigate);
  },[])

  const handleEdit = (id: number) => {
    // Implement edit functionality
    console.log(`Editing item with id ${id}`);
  };

  const handleDelete = async(id: string,image_key:string) => {
    // Implement delete functionality
    if(!window.confirm("Are you want to delete ?")) return;
    try{
    const isDeleted = await DeleteDataAPICredentialAdmin(`${process.env.REACT_APP_BLOGS_API_URL}`,id,image_key);
    if(isDeleted.status === 401)
    {
      localStorage.removeItem("check_prix_admin");
      alert("You are not authenticated or token has expired re-login again !!!");
      navigate('/admin-login');
      return;
    }
    if(isDeleted?.data?.is_success) {setList_of_blog(list_of_blogs?.filter((item:Record<string,any>) => item?.id !== id))}
    }
    catch(err)
    {
      alert("Internal server error");
      console.log(err);
    }
    
  };

  return (
    <>
      <Navbar />
      <div className="mt-5 flex justify-end mr-10">
        <button
          className="bg-blue-500 border-neutral-200 border text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-700"
          onClick={() => {
            navigate("/create-blog");
          }}
        >
          Create Blog
        </button>
      </div>
      <div className="overscroll-auto h-fit">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              S.NO
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Image
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created At
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Options
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {list_of_blogs?.map((item:Record<string,any>,index:number) => (
            <tr key={item?.id}>
              <td className="px-6 py-4 whitespace-nowrap">{index+1}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <img
                  src={item?.image[0].link}
                  alt={item?.title}
                  className="w-10 h-10 object-cover rounded-full"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap overflow-clip">
                {item?.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{new Date(parseInt(item?.created_at)).toLocaleDateString()}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => {
                    //handleEdit(item.id)
                    navigate(`/update-blog/${item.id}`);
                  }}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Edit
                </button>
                <button
                   onClick={() => handleDelete(item.id,item.image[0].key)}
                  className="text-red-600 hover:text-red-900 ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </>
  );
};

export default BlogList;



const getBlogsList= async(setList_of_blog:Function,navigate:Function)=>{
  const res = await getBlog(setList_of_blog);
    if(res.status === 401)
    {
      localStorage.removeItem("check_prix_admin");
      alert("You are not authenticated or token has expired re-login again !!!");
      navigate('/admin-login');
      return;
    }
}