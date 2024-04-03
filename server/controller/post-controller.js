import post from "../model/post.js";

export async function createPost(request, response) {
  try {
    const validPost = new post(request.body);
    validPost.save();
    return response.status(200).json({ msg: "Post saved successfully !" });
  } catch (error) {
    return response.status(400).json({ msg: "Unable to save post" });
  }
}

export async function getAllBlogs(request, response) {
  let category = request.query.category;

  let blogList = [];
  try {
    //await for db connectivity calls
    if (category) {
      
      console.log("Category in MONGO",category)
      blogList = await post.find({ categories: category});

    } else {
      blogList = await post.find({});
    }
    return response.status(200).json(blogList);
  } catch (error) {
    return response.status(400).json({ msg: "Error in finding blogs " });
  }
}
// export async function getSingleBlog(request, response) {
//   let id = request.params.id;
//   console.log(request.params,"params")
//   try {
//     //await for db connectivity calls
   
//      let blogList = await post.findById(id);
   
//     return response.status(200).json(blogList);
//   } catch (error) {
//     return response.status(400).json({ msg: "Error in finding blogs " });
//   }
// }
export const getPost = async (request, response) => {
  try {
    const post = await Post.findById(request.params.id);

    response.status(200).json(post);
  } catch (error) {
    response.status(500).json(error);
  }
};
