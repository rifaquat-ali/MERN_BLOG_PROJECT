import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API } from "../../webServices/api-interceptor";

const SingleDetailedBlog = () => {
  const [blog, setBlog] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        let response = await API.getPostById(id);
        if (response.isSuccess) {
          setBlog(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  return <div>SingleDetailedBlog</div>;
};

export default SingleDetailedBlog;
