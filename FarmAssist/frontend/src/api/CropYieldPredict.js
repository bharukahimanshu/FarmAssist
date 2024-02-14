import Url from "./Url";
import axios from "axios";
export const CropYieldPredict = async (formdata) => {
  const baseUrl = Url;
  const url = "/crop-yield-predict";
  let response = await axios.post(baseUrl + url, {
    formdata: formdata,
  });
  return response.data;
};
