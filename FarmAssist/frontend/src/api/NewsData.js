import axios from "axios";
import Url from "./Url";
export const fetchNews = async (page) => {
  const baseUrl = Url;
  const url = baseUrl + "/news?page=" + page;
  let response = await axios.get(url);
  return response.data;
};
