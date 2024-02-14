import Url from "./Url";
import axios from "axios";
export const CropPredict = async (formdata) => {
  const baseUrl = Url;
  const url = "/crop-predict";
  let response = await axios.post(baseUrl + url, {
    formdata: formdata,
  });
  return response.data;
};
