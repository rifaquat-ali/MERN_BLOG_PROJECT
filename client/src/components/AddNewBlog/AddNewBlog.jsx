import React, { useContext, useEffect, useState } from "react";
import AddAPhoto from "@mui/icons-material/AddAPhoto";
import { Input, TextareaAutosize } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContextComp";
import { FALLBACK_IMG } from "../../constants/config";
import { API } from "../../webServices/api-interceptor";

// const MyTextArea = styled(TextareaAutosize)`
// width: 100%
// marginTop: 1rem
// `
const AddNewBlog = () => {
  const [blogData, setBlogData] = useState({
    username: "",
    description: "",
    dateCreated: new Date(),
    title: "",
    picture: "",
    categories: "",
  });
  const [imgFile, setImgFile] = useState();
 const navigate=useNavigate()
  const [searchParams] = useSearchParams();

  const { userDetails } = useContext(StoreContext);

  //handling onChange for elements
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData({ ...blogData, [name]: value });
  };

  // function for creating FormData object for file
  const pageOnReady = async () => {
    if (imgFile) {
      let fdata = new FormData();
      fdata.append("name", imgFile.name);
      //!   debugger
      fdata.append("file", imgFile);
      //POST Api for saving form-data in mongo
      try {
        console.log("formdata", fdata.get("file"));
        const response = await API.uploadFile(fdata);
        //!
        blogData.picture = response.data;
      } catch (e) {
        console.log(e, "PageonReady");
      }
      //* ToDo getting URL in response for img which to be set in blogData.picture
    }
    //storing categories from useSearchParams or useLocation
    
    blogData.categories = searchParams.get("category") || "all";
    blogData.username = userDetails.username;
    };
    

    const publishBlog = async() => {
        try {
            let response = await API.createPost(blogData)
            navigate("/home")
        } catch (error) {
            
        }
    }

  useEffect(() => {
    pageOnReady();
  }, [imgFile,blogData.picture]);

  return (
    <div className="mx-3">
      <img
        style={{ width: "100%", height: "38vh", objectFit: "cover" }}
        src={blogData?.picture || FALLBACK_IMG.addNewBlogImg}
        alt="imgNewBlog"
      />
      <div className="mt-2 d-flex justify-content-around">
        <label className="" htmlFor="addImg">
          {/* Linking label htmlFor prop with input ID */}
          <AddAPhoto
            titleAccess="Add an image"
            fontSize="large"
            color="action"
          />
        </label>
        <input
          className="d-none"
          type="file"
          id="addImg"
          onChange={(e) => setImgFile(e.target.files[0])}
        />
        <Input
          style={{ flexGrow: "1", margin: "0 2rem 0 2rem" }}
          placeholder="Enter title for your blog !"
          name="title"
          onChange={(e) => handleChange(e)}
        />
        <button className="btn btn-success" onClick={publishBlog}>Publish</button>
      </div>
      <TextareaAutosize
        name="description"
        className="w-100 border-secondary mt-3 fs-6 fst-italic "
        minRows={5}
        onChange={(e) => handleChange(e)}
        placeholder="Write about your day here.... "
      />
    </div>
  );
};

export default AddNewBlog;
