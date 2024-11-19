import { get, patch, post } from "../src/utils/api";

export const getChaiCoffeeById = async (id) => {
  try {
    const response = await get(`/chaiCoffee/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const addChaiCoffee = async (id, values) => {
  try {
    const response = await post(`/chaiCoffee/addChaiCoffee/${id}`, values);
    console.log("Service response:".response);

    return response;
  } catch (error) {
    return error;
  }
};

export const getBill = async (id) => {
  try {
    const response = await get(`/getBillChaiCoffee/${id}`);
    console.log("Service response:", response.bills);

    return response;
  } catch (error) {
    return error;
  }
};

export const getFilterBill = async (month, id) => {
  try {
    const response = await get(`/getBillChaiCoffee/filterbill/${month}&${id}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const updateBill = async (values,id) => {
  try {
    const response = await patch(`/getBillChaiCoffee/updateBill/${id}`, values);
    return response;
  } catch (error) {
    return error;
  }
};

export const generatePdf = async (id) => {
  try {
    const response = await get(`/getBillChaiCoffee/generate-pdf/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};
