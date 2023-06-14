import axios from "axios";
import jwtDecode from "jwt-decode";

const baseUrl = process.env.REACT_APP_BASE_URL;
const apiUrl = process.env.REACT_APP_API_URL;

const apiInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: "Bearer " + localStorage.getItem("access"),
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000,
});

const checkCurrentUser = (token) => {
  try {
    // Vérifier si le jeton est valide et décoder les informations
    const decodedToken = jwtDecode(token);

    // Vérifier si le jeton a expiré
    const currentTime = Date.now() / 1000; // Convertir en secondes
    if (decodedToken.exp < currentTime) {
      // Jeton expiré, utilisateur non connecté
      return null;
    }

    // Récupérer les informations de l'utilisateur actuel à partir du jeton
    const currentUser = {
      id: decodedToken.sub, // ID de l'utilisateur
      username: decodedToken.username, // Nom d'utilisateur
      // Autres informations de l'utilisateur si présentes dans le jeton
    };

    return currentUser;
  } catch (error) {
    // Erreur lors de la vérification du jeton
    return null;
  }
};

const getCurrentUser = async () => {
  try {
    const id = CurrentUserId();
    if (id) {
      const response = await apiInstance.get(`/users/` + id);
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
  }
};

function CurrentUserId() {
  const token = localStorage.getItem("access");
  return token ? jwtDecode(token).id : null;
}

export {
  getCurrentUser,
  CurrentUserId,
  checkCurrentUser,
  apiInstance,
  baseUrl,
  apiUrl,
};
