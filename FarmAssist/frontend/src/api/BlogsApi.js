import axios from "axios";
import Url from "./Url";
export const fetchBlogs = async (page) => {
  const baseUrl = Url;
  const url = baseUrl + "/blogs";
  let response = await axios.get(url);
  return response.data;
};
