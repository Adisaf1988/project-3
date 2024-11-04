import axios from "axios";
import { LoginData, Token, User } from "../../../@types";

const API_BASE_URL = "http://localhost:3002";

export const loginUser = async (data: LoginData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/login`, data);
    return response.data as Token;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Login failed");
    }
    throw new Error("Login failed");
  }
};

export const userDetails = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/auth/userDetails`);
    return response.data as User;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "me failed");
    }
    throw new Error("me failed");
  }
};
