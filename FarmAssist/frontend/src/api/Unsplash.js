import axios from "axios";
export const fetchImages = async (searchPage, pageSize, query) => {
  const apikey = "noqxKapuU84tzbRRDssdOwR_zzk12HrIaawj1sOAwLo";
  const url = "https://api.unsplash.com/search/photos";
  const params = {
    query: query,
    per_page: pageSize,
    page: searchPage,
  };
  const headers = {
    Authorization: `Client-ID ${apikey}`,
  };
  let response = await axios.get(url, { params, headers });
  return response.data.results;
};
