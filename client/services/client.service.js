import { get, post } from "../src/utils/api";

export const addClient = async (values) => {
  try {
    console.log("values:", values);

    const response = await post("/office/create", values);
    console.log("Service response:".response);

    return response;
  } catch (error) {
    return error;
  }
};

export const getClient = async (id) => {
  try {
    const response = await get(`/office/getOffice/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};
