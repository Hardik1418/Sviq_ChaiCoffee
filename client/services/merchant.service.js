import { post } from "../src/utils/api";

export const Login = async (values) => {
  try {
    const response = await post("/merchant/login", values);

    return response;
  } catch (error) {
    return error;
  }
};
