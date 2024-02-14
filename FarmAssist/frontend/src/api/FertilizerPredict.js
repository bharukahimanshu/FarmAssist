import Url from "./Url";
import axios from "axios";
export const FertilizerPredict = async (formdata) => {
  const baseUrl = Url;
  const url = "/fertilizer-predict";
  let response = await axios.post(baseUrl + url, {
    formdata: formdata,
  });
  return response.data;
};
