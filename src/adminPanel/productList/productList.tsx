import React, { useState, useEffect } from "react";
import Image from "../../assests/images/cover.jpg";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../navbar/navbar";
import {
  DeleteDataAPICredentialAdmin,
  DeleteDataAPICredentialAdminJson,
  GetDataAPICredentialAdmin,
  PostDataAPIAdminJson,
} from "../../apihooks/apihooks";

import { LoadMore, getValueBykey } from "../../common_method/commonMethods";
import Splinner from "../../components/common/spinner/spinner";

const ProductList = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const param = useParams();
  const [data, setData] = useState<Record<string, any> | null>(null);
  const [isFecthing, setIsFetching] = useState<boolean>(false);
  const [allRecordFetched, setAllRecordFetched] = useState<boolean>(false);
  const GetData = async (setData: Function) => {
    try {
      const data = await GetDataAPICredentialAdmin(
        `${process.env.REACT_APP_PRODUCTS_API_URL}/admin/${page}`
      );

      console.log(data);

      setData(getValueBykey("products", data) || null);
    } catch (err) {
      console.log("Internal server error or token expired", err); // Handle error
    }
  };

  useEffect(() => {
    GetData(setData);
  }, []);

  useEffect(() => {
    setData(data);
  }, [data]);

  const handleDelete = async (id: string, image_key: string) => {
    // Implement delete functionality
    if (!window.confirm("Are you want to delete ?")) return;
    try {
      const isDeleted = await DeleteDataAPICredentialAdmin(
        `${process.env.REACT_APP_PRODUCTS_API_URL}`,
        id,
        image_key
      );

      console.log(isDeleted.data);
      if (getValueBykey("is_success", isDeleted) && Array.isArray(data)) {
        setData(data.filter((item: Record<string, any>) => item?.id !== id));
      }
    } catch (err) {
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
            navigate("/create-product");
          }}
        >
          {param?.id ? "Update product" : "Create Product"}
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
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Model
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price Drop
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Options
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Array.isArray(data) &&
              data?.map((item: any, index: number) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-10 h-10 flex justify-center">
                      <img
                        src={
                          item?.image[0]?.link
                            ? item?.image[0]?.link.toString()
                            : ""
                        }
                        alt={item.title}
                        className="w-fit h-10"
                      />
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap overflow-clip">
                    {item?.details?.product_name}
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap">{item.createdAt}</td> */}
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {item?.details?.model ? item?.details?.model : "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {new Date(parseInt(item?.created_at))
                      ? new Date(
                          parseInt(item?.created_at)
                        ).toLocaleDateString()
                      : ""}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <input
                      onChange={(e) =>
                        HandlePriceDrop(item.id, e.target.checked, setData, e)
                      }
                      type="checkbox"
                      checked={item.has_price_drop}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex justify-center">
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
                      onClick={() => handleDelete(item.id, item.image[0].key)}
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
      {!Array.isArray(data) && <Splinner />}
      { Array.isArray(data) &&
        <div
          className="flex justify-center w-full"
          style={{ display: allRecordFetched ? "none" : "flex" }}
        >
          <button
            onClick={async () => {
              await setIsFetching(true);
              await setPage((preState) => preState + 1);
              LoadMore(
                setPage,
                setData,
                `${process.env.REACT_APP_PRODUCTS_API_URL}/admin/${page + 1}`,
                true,
                "products",
                setAllRecordFetched
              );
              await setIsFetching(false);
            }}
            className="bg-orange-500 p-3 rounded-md text-white mt-2"
          >
            {!isFecthing ? "Load More" : "Loading..."}
          </button>
        </div>
      }
    </>
  );
};

export default ProductList;

const HandlePriceDrop = async (
  item_id: string,
  isCheck: boolean,
  setData: Function,
  e: any
) => {
  try {
    if (!isCheck) {
      //delete
      await DeleteDataAPICredentialAdminJson(
        `${process.env.REACT_APP_PRICE_DROP}/${item_id}`
      );
      await updatePriceDrop(setData, item_id, false);
    } else {
      await PostDataAPIAdminJson(`${process.env.REACT_APP_PRICE_DROP}`, {
        item_id: item_id,
      });
      await updatePriceDrop(setData, item_id, true);
    }
    // Update the checkbox state based on the updated value in the state
    e.target.checked = !isCheck;
  } catch (err) {
    console.error(err);
    alert("Internal server error!!!");
  }
};

function updatePriceDrop(
  setData: Function,
  itemId: string,
  hasPriceDrop: boolean
) {
  setData((prevState: any) => {
    return prevState.map((item: Record<string, any>) => {
      if (item.id === itemId) {
        return {
          ...item,
          has_price_drop: hasPriceDrop,
        };
      }
      return item;
    });
  });
}
