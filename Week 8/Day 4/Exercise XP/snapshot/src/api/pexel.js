import axios from "axios";

const API_KEY = "YOUR_PEXELS_API_KEY"; // Replace with your key
const BASE_URL = "https://api.pexels.com/v1/search";

export const fetchImages = async (query, perPage = 30, page = 1) => {
  const response = await axios.get(BASE_URL, {
    headers: { Authorization: API_KEY },
    params: { query, per_page: perPage, page }
  });
  return response.data.photos;
};
