import { axiosInstance } from "./index";

export const addTheatre = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/theatres/add-theatre",
      payload
    );
    return response.data;
  } catch (error) {
    console.log("Error adding theatre:", error.response.data);
  }
};

export const getAllTheatresForAdmin = async () => {
  try {
    const response = await axiosInstance.get("/api/theatres/get-all-theatres");
    return response.data;
  } catch (error) {
    console.log("Error fetching theatres:", error.response.data);
  }
};

export const getAllTheatres = async (ownerId) => {
  try {
    const response = await axiosInstance.get(
      `/api/theatres/get-all-theatres-by-owner/${ownerId}`
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching theatres by owner:", error.response.data);
  }
};

export const updateTheatre = async (payload) => {
  try {
    const response = await axiosInstance.put(
      "/api/theatres/update-theatre",
      payload
    );
    return response.data;
  } catch (error) {
    console.log("Error updating theatre:", error.response.data);
  }
};

export const deleteTheatre = async (payload) => {
  try {
    const theatreId = payload?._id || payload?.theatreId;
    const response = await axiosInstance.delete(
      "/api/theatres/delete-theatre",
      {
        data: { theatreId },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error deleting theatre:", error.response.data);
  }
};
