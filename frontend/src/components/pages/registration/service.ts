import axios from "axios";

const API_BASE_URL = "http://localhost:3002"; 

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// interface LoginData {
//   email: string;
//   password: string;
// }

export const registerUser = async (data: RegisterData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Registration failed");
    }
    throw new Error("Registration failed");
  }
};

// export const loginUser = async (data: LoginData) => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/login`, data);
//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error) && error.response) {
//       throw new Error(error.response.data.message || "Login failed");
//     }
//     throw new Error("Login failed");
//   }
// };