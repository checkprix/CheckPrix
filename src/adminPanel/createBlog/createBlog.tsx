import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import {
  getBlogById,
  handleDelete,
  handleSavePost,
  updatePost,
} from "./methods/methods";
import { Spinner } from "flowbite-react";
import BackWard from "../commonComponents/BackButton";
const CreateBlog = (): any => {
  //param
  const param: any = useParams();

  //states
  const [BlogId, setBlogId] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [formState, setFromState] = useState<Record<string, any>>({});
  const [image_key, set_Image_key] = useState<string>("");
  const [is_blog_deleteting, set_is_blog_deleteting] = useState<boolean>(false);
  const [is_blog_saving, set_is_blog_saving] = useState<boolean>(false);
  const [is_loading, set_is_loading] = useState<boolean>(true);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const selectedFile = e.target.files && e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
      setPreviewURL(URL.createObjectURL(selectedFile));
    }
  };

  const formHandler = (e: any): void => {
    const { id, value } = e.target;
    setFromState({
      ...formState,
      [id]: value,
    });
  };

  useEffect(() => {

    set_is_loading(false)

    //fecth api for blog id
    console.log(param?.id);
    //get blog from id and set setting field preview image url and blog id
    getBlogById(
      param.id,
      setFromState,
      setPreviewURL,
      set_Image_key,
      setBlogId,
      set_is_loading
    );

    
  }, []);

  return (
    <>
      { is_loading && <div className="flex justify-center pt-5"> <Spinner/></div>}
    <div className="my-8 p-16 bg-white rounded-md w-full">
      <BackWard link={'/blog-list'}/>
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold mb-6">
          {!param?.id ? "Create a New Blog Post" : "Update blog"}
        </h2>
        <div>
          <button
            className="bg-blue-500 border-neutral-200 border text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-700"
            onClick={async () => {
              if (
                BlogId.length === 0 &&
                !is_blog_saving &&
                !is_blog_deleteting
              ) {
                await set_is_blog_saving(true);
                await handleSavePost(formState, file);
                await set_is_blog_saving(false);
              } else if (
                BlogId.length !== 0 &&
                !is_blog_saving &&
                !is_blog_deleteting
              ) {
                await set_is_blog_saving(true);
               await updatePost(formState, file);
                await set_is_blog_saving(false);
              }
            }}
          >
            {is_blog_saving ? <Spinner /> : "Save Post"}
          </button>

          {param?.id ? (
            <button
              className={`${
                image_key.length !== 0 && param?.id.leading !== 0
                  ? "bg-red-500"
                  : "bg-gray-500"
              }
             border-neutral-200 border text-white py-2 px-4 rounded-md ${
               image_key.length !== 0 && param?.id.leading !== 0
                 ? "hover:bg-red-600"
                 : "hover:bg-gray-600"
             } focus:outline-none focus:ring focus:red-blue-700`}
              onClick={async () => {
                if (
                  image_key.length !== 0 &&
                  param?.id.length !== 0 &&
                  !is_blog_deleteting &&
                  !is_blog_saving
                )
                  await set_is_blog_deleteting(true);
                await handleDelete(param?.id, image_key);
                await set_is_blog_deleteting(false);
              }} // delete method implement here
            >
              {is_blog_deleteting ? <Spinner /> : "Delete"}
            </button>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-600 "
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          className="mt-1 p-2 w-full  rounded-md outline-none border border-neutral-200"
          placeholder="Enter the title of your blog post"
          value={formState?.title}
          onChange={(e) => formHandler(e)}
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="detail"
          className="block text-sm font-medium text-gray-600"
        >
          Details
        </label>
        <textarea
          id="detail"
          className="mt-1 p-2 w-full rounded-md outline-none border border-neutral-200"
          rows={6}
          placeholder="Enter the details of your blog post"
          value={formState?.detail}
          onChange={(e) => formHandler(e)}
        ></textarea>
      </div>

      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-600"
        >
          Description
        </label>
        <textarea
          id="description"
          className="mt-1 p-2 w-full rounded-md outline-none border border-neutral-200"
          rows={14}
          placeholder="Enter the description of your blog post"
          value={formState?.description}
          onChange={(e) => formHandler(e)}
        ></textarea>
      </div>

      {/* <div className="mb-4">
        <label
          htmlFor="image"
          className="block text-sm font-medium text-gray-600"
        >
          Image URL
        </label>
        <input
          type="text"
          id="image"
          className="mt-1 p-2 w-full border rounded-md"
          placeholder="Enter the URL of your blog post image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div> */}

      <div className="mb-4">
        <label
          htmlFor="file"
          className="block text-sm font-medium text-gray-600"
        >
          Upload Cover Image
        </label>
        <input
          type="file"
          id="file"
          className="hidden"
          accept="image/*" // Limit to image files, adjust as needed
          onChange={handleFileChange}
        />
        <label
          htmlFor="file"
          className="mt-4 p-2  border border-neutral-200 cursor-pointer flex justify-center rounded-md"
          style={{ minHeight: "96px" }}
        >
          {previewURL ? (
            <img
              src={previewURL}
              alt="Selected"
              className="w-96  h-auto object-center object-cover"
            />
          ) : (
            <div className="flex justify-center items-center flex-col text-neutral-500 ">
              <FontAwesomeIcon className=" text-3xl " icon={faImage} />
              <span className="text-xl">Click here to select image </span>
            </div>
          )}
        </label>
      </div>
    </div>
    </>
  );
};

export default CreateBlog;
