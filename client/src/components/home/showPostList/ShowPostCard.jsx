import React, { useEffect, useState } from "react";
import { API } from "../../../webServices/api-interceptor";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid } from "@mui/material";
import { FALLBACK_IMG } from "../../../constants/config";
import { ellipsis } from "../../../utils/common-client-utils";
import { Link, useSearchParams } from "react-router-dom";

const ShowPostCard = () => {
  const [blogCards, setBlogCards] = useState([]);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  const getBlogCards = async () => {
    try {
      let response = await API.getAllBlogs({category:category||""});
      if (response.isSuccess) {
        setBlogCards(response.data);
      }
    } catch (error) {}
  };

 
  useEffect(() => {
    getBlogCards();
  }, [category]);

  return (
    <div className="">
      {blogCards && blogCards.length > 0 ? (
        blogCards.map((e, i) => (
          <div key={i}>
            <Grid sm={4} xs={12} xl={3}>
              <Card sx={{ maxWidth: 345 }}>
                <Link
                  className="text-decoration-none"
                  to={`/blog-detail/${e._id}`}
                >
                  {" "}
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={e.picture || FALLBACK_IMG.addNewBlogImg}
                      alt="green iguana"
                    />
                    <Typography> Category: {e.categories}</Typography>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {ellipsis(e.title, 20)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {ellipsis(e.description, 100)}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Link>
              </Card>
            </Grid>
          </div>
        ))
      ) : (
        <h1>No blogs to show...</h1>
      )}
    </div>
  );
};

export default ShowPostCard;
