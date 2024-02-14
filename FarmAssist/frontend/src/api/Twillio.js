import axios from "axios";
import Url from "./Url";
export const sendMessage = async (mobile) => {
  const baseUrl = Url;
  const url = "/send-message";
  let response = await axios.post(baseUrl + url, { mobile: "91" + mobile });
  return response.data;
};
