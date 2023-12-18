const BlogCard = () => {
    return (<>
        <div className="w-full lg:w-96  flex flex-col shadow-md hover:shadow-xl transition-all rounded-md">
            <div className="lg:p-3 rounded-md flex justify-center">
                <img className="object-cover w-full"
                    src="https://checkprix.net/uploaded_Images/924655363.jpg" alt="blogImage" />
            </div>
            <div className="flex flex-col justify-center items-center gap-3 p-3">
                <span className="text-center">What’s the best smartphone to buy?</span>
                <button className="text-xl p-3 text-white font-semibold bg-gray-800 w-fit"><a href="/dashproduct/12345" target="_blank">Read More</a></button>
            </div>
        </div>
    </>)
}

export default BlogCard;