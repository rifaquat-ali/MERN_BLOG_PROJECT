export const getAccessToken = () => sessionStorage.getItem("accessToken");

export const ellipsis = (str, limit) => {
  return str.length > limit ? str.substring(0, limit) + "..." : str;
};

export const getType = (value, body) => {
  if (value.params) {
    return { params: body };
  } else if (value.params) {
    if (typeof body === "object") {
      return { query: body._id };
    } else {
      return { query: body };
    }
  }

  return {};
};
