import React from "react";
import { BLOG_CATEGORY } from "../../constants/config";
import { Link, useSearchParams } from "react-router-dom";
import "../../App.css";

const Category = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category"); //searching for queryParam category
  return (
    <div style={{ padding: "0.5rem" }}>
      <div className="px-2">
        <Link to={`/createBlog?category=${category || ""}`}>
          <button className="mb-2  w-100 btn btn-info">Create a blog </button>
        </Link>
      </div>
      <table className="table table-striped">
        <tbody>
          <tr>
            <td>
              <Link
                className="text-decoration-none text-dark"
                to={`/?category=`}
              >
                # All Categories
              </Link>
            </td>
          </tr>
          {BLOG_CATEGORY.map((i, index) => {
            return (
              <tr key={index}>
                <td>
                  <Link
                    className="text-decoration-none text-dark"
                    to={`/?category=${i.name}`}
                  >
                    {i.id}. {i.name}
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Category;
