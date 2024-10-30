import axios from "axios";

const API_BASE_URL = "http://localhost:3002"; 

interface LoginData {
  email: string;
  password: string};


export const loginUser = async (data: LoginData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Login failed");
    }
    throw new Error("Login failed");
  }
};