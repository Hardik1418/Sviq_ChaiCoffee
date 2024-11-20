import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL; // Access VITE_BASE_URL from .env
console.log("Base URL:", BASE_URL);

export async function get(url, params) {
  const queryString = params
    ? `?${new URLSearchParams(params).toString()}`
    : "";
  try {
    const response = await axios.get(`${BASE_URL}${url}${queryString}`);
    console.log("API response:", response);

    return response.data;
  } catch (error) {
    console.error("Error in GET request:", error);
    throw error;
  }
}

export async function post(url, data) {
  try {
    const response = await axios.post(`${BASE_URL}${url}`, data);
    console.log("API response:", response);

    return response;
  } catch (error) {
    console.error("Error in POST request:", error);
    throw error;
  }
}

export async function patch(url, data) {
  try {
    const response = await axios.patch(`${BASE_URL}${url}`, data);
    return response.data;
  } catch (error) {
    console.error("Error in PATCH request:", error);
    throw error;
  }
}

export async function del(url) {
  try {
    const response = await axios.delete(`${BASE_URL}${url}`);
    return response.data;
  } catch (error) {
    console.error("Error in DELETE request:", error);
    throw error;
  }
}
