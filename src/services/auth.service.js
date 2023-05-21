import axios from "axios";
import jwtDecode from "jwt-decode";

const token = localStorage.getItem("_auth");

const apiInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000,
});

const getCurrentUser = async () => {
  try {
    const id = getCurrentUserId();
    if (id !== false) {
      const response = await apiInstance.get(`/users/` + id);
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
  }
};

function getCurrentUserId() {
  let token = localStorage.getItem("_auth");
  if (token) {
    let decodedToken = jwtDecode(token);
    return decodedToken.id;
  } else {
    return false;
  }
}

function checkToken() {
  let token = localStorage.getItem("token");
  if (token) {
    let decodedToken = jwtDecode(token);
    let currentDate = new Date();
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      localStorage.clear();
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
}

export { getCurrentUser, getCurrentUserId, checkToken, apiInstance };
