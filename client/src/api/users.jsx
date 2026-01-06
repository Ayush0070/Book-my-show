import { axiosInstance } from "./index";

export const RegisterUser = async (value) => {
  try {
    const response = await axiosInstance.post("/api/users/register", value);
    return response.data;
  } catch (error) {
    console.log("Error registering user:", error);
  }
};

export const LoginUser = async (value) => {
  try {
    const response = await axiosInstance.post("/api/users/login", value);
    return response.data;
  } catch (error) {
    console.log("Error logging in user:", error);
  }
};

export const GetCurrentUser = async () => {
  try {
    const response = await axiosInstance.get("/api/users/current");
    return response.data;
  } catch (error) {
    console.log("Error fetching current user:", error);
    throw error;
  }
};

export const ForgetPassword = async (value) => {
  try {
    const response = await axiosInstance.patch(
      "/api/users/forgetpassword",
      value
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const ResetPassword = async (value, id) => {
  try {
    const response = await axiosInstance.patch(
      `/api/users/resetpassword/${id}`,
      value
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
