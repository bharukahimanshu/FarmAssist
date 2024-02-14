import axios from "axios";
import Url from "./Url";
export const CRTemp = async (
  formdata,
  chartData,
  temperature,
  humidity,
  rainfall
) => {
  const baseUrl = Url;
  const url = "/crop-predict-temp";
  let response = await axios.post(baseUrl + url, {
    formdata: formdata,
    chart_data: chartData,
    temperature: temperature,
    humidity: humidity,
    rainfall: rainfall,
  });
  return response.data;
};

export const CRHumid = async (
  formdata,
  chartData,
  temperature,
  humidity,
  rainfall
) => {
  const baseUrl = Url;
  const url = "/crop-predict-humid";
  let response = await axios.post(baseUrl + url, {
    formdata: formdata,
    chart_data: chartData,
    temperature: temperature,
    humidity: humidity,
    rainfall: rainfall,
  });
  return response.data;
};

export const CRRain = async (
  formdata,
  chartData,
  temperature,
  humidity,
  rainfall
) => {
  const baseUrl = Url;
  const url = "/crop-predict-rain";
  let response = await axios.post(baseUrl + url, {
    formdata: formdata,
    chart_data: chartData,
    temperature: temperature,
    humidity: humidity,
    rainfall: rainfall,
  });
  return response.data;
};
