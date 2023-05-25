import { apiInstance } from "./auth.service";

const getWarplanesByUserId = async (id) => {
  try {
    const response = await apiInstance.get(`/users/${id}/warplanes`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const deleteUser = async (id) => {
  try {
    await apiInstance.delete(`/users/${id}`);
    return true;
  } catch (error) {
    console.error(error);
  }
};

const deleteWarplaneById = async (id) => {
  try {
    await apiInstance.delete(`/warplanes/${id}`);
    return true;
  } catch (error) {
    console.error(error);
  }
};

export { getWarplanesByUserId, deleteUser, deleteWarplaneById };
