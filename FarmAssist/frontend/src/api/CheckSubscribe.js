import axios from "axios";
import Url from "./Url";
export const check_subscribe = async (name, mobile, email) => {
  const baseUrl = Url;
  const url = "/check-subscription";
  let response = await axios.post(baseUrl + url, {
    name: name,
    mobile: mobile,
    email: email,
  });
  return response.data;
};
