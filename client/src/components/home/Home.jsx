import React from "react";
import Category from "./Category";
import { Grid } from "@mui/material";
import ShowPostCard from "./showPostList/ShowPostCard";
import { ClassNames } from "@emotion/react";
import "../../App.css";

const Home = () => {
  return (  
    <>
      <div
        style={{
          background:
            "url(https://www.thorsignia.in/wp-content/uploads/2018/09/Blog-header-image.jpg)",
          height: "32vh",
          alignItems: "end",
          justifyContent: "start",
          display: "flex",
        }}
      >
        <h1
          style={{ fontFamily: "cursive", fontSize: "25px" }}
          className="py-2 px-3"
        >
          Keep writing blogs for free at Blogworld.com
        </h1>
      </div>
      {/* <Grid container>
        <Grid item xs={12} sm={2} xl={2}>
          <Category />
        </Grid>
        <Grid item xs={12} sm={10} xl={10}>
          <ShowPostCard />
        </Grid>
      </Grid> */}

      <div className="container-fluid overflow-x-hidden">
        <div className="row px-2 pt-3">
          <div className="col-lg-3">
            <Category />
          </div>
          <div className="col-lg-3">
            <ShowPostCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
