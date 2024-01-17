import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
const CreateBlog = (): any => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);

  const handleSavePost = (): void => {
    // Add your logic to save the blog post
    console.log("Title:", title);
    console.log("Description:", description);
    console.log("Image:", image);
    console.log("File:", file); // Handle the file here
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const selectedFile = e.target.files && e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
      setPreviewURL(URL.createObjectURL(selectedFile));
    }
  };

  return (
    <div className="my-8 p-16 bg-white rounded-md w-full">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold mb-6">Create a New Blog Post</h2>
        <button
          className="bg-blue-500 border-neutral-200 border text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-700"
          onClick={handleSavePost}
        >
          Save Post
        </button>
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
          style={{minHeight:'96px'}}
        >
          {previewURL ? (
            <img
              src={previewURL}
              alt="Selected"
              className="w-96  h-auto object-center object-cover"
            />
          ) : (
            <div className="flex justify-center items-center flex-col text-neutral-500 ">
                <FontAwesomeIcon className=" text-3xl " icon={faImage}/>
                <span className="text-xl">Click here to select image </span>
            </div>
          )}
        </label>
      </div>
    </div>
  );
};

export default CreateBlog;
