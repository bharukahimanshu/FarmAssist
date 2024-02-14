import axios from "axios";
import Url from "./Url";
export const SendResult = async (name, email, body) => {
  const baseUrl = Url;
  const url = "/send-result";
  let response = await axios.post(
    baseUrl + url,
    {
      name: name,
      email: email,
      body: body,
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
