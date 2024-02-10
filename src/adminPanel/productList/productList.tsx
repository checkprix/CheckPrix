import React, { useState,useEffect } from "react";
import Image from "../../assests/images/cover.jpg";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../navbar/navbar";
import { useGetData } from "../../apihooks/apihooks";
const ProductList = () => {
  const navigate = useNavigate();
  const [page,setPage] = useState<number>(1)
  const param = useParams()
  const [data, setData] = useState<Record<string,any>>([]);

  const GetData = async(setData:Function)=>{
   const data = await useGetData("http://localhost:4000/api/products/admin/1")
   console.log(data.data);
   setData(data.data.products)
  }


  useEffect(()=>{
    GetData(setData)
  },[])

  // const handleEdit = (id: number) => {
  //   // Implement edit functionality
  //   console.log(`Editing item with id ${id}`);
  // };

  // const handleDelete = (id: number) => {
  //   // Implement delete functionality
  //   setData(data.filter((item) => item.id !== id));
  // };

  

  return (
    <>
      <Navbar />
      <div className="mt-5 flex justify-end mr-10">
        <button
          className="bg-blue-500 border-neutral-200 border text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-700"
          onClick={() => {
            navigate("/create-product");
          }}
        >
          {
            (param?.id)?"Update product":"Create Product"
          }
        </button>
      </div>
      <div className="overflow-x-auto h-fit">
      <table className="min-w-full divide-y divide-gray-200 overflow-x-scroll">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Image
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Full Name
            </th>
            {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created At
            </th> */}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Model
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
          {data?.map((item:any,index:number) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap">{index+1}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <img
                  src={item?.image[0]?.link.toString()}
                  alt={item.title}
                  className="w-10 h-10 object-cover rounded-full"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap overflow-clip">
                {(item?.details?.product_name)}
              </td>
              {/* <td className="px-6 py-4 whitespace-nowrap">{item.createdAt}</td> */}
              <td className="px-6 py-4 whitespace-nowrap">{(item?.details?.model)?item?.details?.model:"N/A"}</td>
              <td className="px-6 py-4 whitespace-nowrap">{new Date(parseInt(item?.created_at)).toLocaleDateString()}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => {
                    //handleEdit(item.id)
                    navigate(`/create-product/${item.id}`);
                  }}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Edit
                </button>
                <button
                  // onClick={() => handleDelete(item.id)}
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

export default ProductList;
