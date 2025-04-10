import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

export const uploadImage = async (image: File) => {
  axios.post(BASE_URL + "image/upload", image);
};
