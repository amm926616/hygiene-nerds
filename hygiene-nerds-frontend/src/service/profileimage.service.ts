import axios from "axios";

const BASE_BACKEND_URL = "http://localhost:8080";

export const uploadProfileImage = (username: string, imageFile: File) => {
  const formData = new FormData();

  console.log("username", username);
  console.log("imageFile", imageFile);

  formData.append("username", username);
  formData.append("imageFile", imageFile);

  return axios.post(`${BASE_BACKEND_URL}/users/image/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const deleteProfileImage = (username: string) => {
  return axios.delete(`${BASE_BACKEND_URL}/users/image/delete/${username}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const getProfileImageUrl = (imageName: string) => {
  return `${BASE_BACKEND_URL}/users/image/${imageName}`;
};
