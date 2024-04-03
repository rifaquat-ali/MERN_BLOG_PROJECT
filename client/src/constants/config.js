// Notifications/Toast Messages
export const API_LITERALS = {
  loading: {
    title: "Loading...",
    msg: "Data is being fetched, Please wait !",
  },
  success: {
    title: "Loading...",
    msg: "Data is being fetched, Please wait !",
  },
  responseFailure: {
    title: "Error",
    msg: "Error occurred while fetching data from server !",
  },
  requestFailure: {
    title: "Error",
    msg: "Failed while parsing request !",
  },
  networkFailure: {
    title: "Error",
    msg: "Unexpected Error ,Please check network connection !",
  },
};

//* >>>>>>>>>>>>>>  API-Web Services URLs >>>>>>>>>>>>>>>>>>>>
//Sample : { url:"/",method:"POST/GET/PUT/DELETE",params:true/false,query:true/false}
export const API_URLS = {
  signup: {
    url: "/signup",
    method: "POST",
  },
  login: {
    url: "/login",
    method: "POST",
  },
  uploadFile: {
    url: "/file/upload",
    method: "POST",
  },
  createPost: {
    url: "/create",
    method: "POST",
  },
  getAllBlogs: {
    url: "/blogs",
    method: "GET",
    params: true,
  },
  getPostById: {
    url: "post",
    method: "GET",
    query: true,
  },
};

//* Categories list
export const BLOG_CATEGORY = [
  { id: 1, name: "Movie" },
  { id: 2, name: "Sports" },
  { id: 3, name: "IT" },
  { id: 4, name: "Science" },
  { id: 5, name: "Education" },
];

// fallback Images

export const FALLBACK_IMG = {
  addNewBlogImg:
    "https://wallpaperbat.com/img/323920-motivational-wallpaper-about-writing-booky-the-blog.jpg",
};
