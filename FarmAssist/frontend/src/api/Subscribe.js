import axios from "axios";
import Url from "./Url";
export const subscribe = async (name, mobile, email) => {
  const baseUrl = Url;
  const url = "/subscribe";
  let response = await axios.post(
    baseUrl + url,
    {
      name: name,
      mobile: mobile,
      email: email,
    },
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
