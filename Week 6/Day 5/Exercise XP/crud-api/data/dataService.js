const axios = require("axios");

const postsApi = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 10000,
});

async function fetchPosts() {
  const response = await postsApi.get("/posts");
  return response.data;
}

module.exports = { fetchPosts };