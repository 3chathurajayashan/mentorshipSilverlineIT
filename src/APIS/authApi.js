
import axiosInstance from "./axiosInstance";

// Register a new user
export const signupUser = async (userData) => {
  const response = await axiosInstance.post(
    "/auth/signup",
    userData
  );

  return response.data;
};

// Login an existing user
export const signinUser = async (loginData) => {
  const response = await axiosInstance.post(
    "/auth/signin",
    loginData
  );

  return response.data;
};
