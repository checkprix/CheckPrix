import React, { useState } from "react";
import Image from "../../assests/images/cover.jpg";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/navbar";
const BlogList = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([
    {
      id: 1,
      image: Image,
      title: "Title 1 Title 1 Title 1",
      createdAt: "2024-01-22",
    },
    {
      id: 2,
      image: Image,
      title: "Title 2 Title 1 Title 1",
      createdAt: "2024-01-23",
    },
    // Add more items as needed
  ]);

  const handleEdit = (id: number) => {
    // Implement edit functionality
    console.log(`Editing item with id ${id}`);
  };

  const handleDelete = (id: number) => {
    // Implement delete functionality
    setData(data.filter((item) => item.id !== id));
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
              ID
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
          {data.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-10 h-10 object-cover rounded-full"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap overflow-clip">
                {item.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{item.createdAt}</td>
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
                  onClick={() => handleDelete(item.id)}
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
