import axios from "axios";
import { RegisterData, Token, User } from "../../../@types";

const API_BASE_URL = "http://localhost:3002";

export const registerUser = async (data: RegisterData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/register`,
      data
    );
    return response.data as Token;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Registration failed");
    }
    throw new Error("Registration failed");
  }
};
