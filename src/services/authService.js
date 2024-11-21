import apiClient from "./apiClient";

export const login = async (email, password) => {
  try {
    const loginData = { email, password };
    const response = await apiClient.post("/auth/login", loginData);
    const { userDetails, token } = response.data;

    return { userDetails, token };
  } catch (error) {
    console.error("Login failed:", error);
    throw new Error("Invalid credentials or server error");
  }
};
