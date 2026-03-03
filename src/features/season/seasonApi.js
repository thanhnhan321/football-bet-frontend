import axiosClient from "../../services/axiosClient";

export const fetchSeasonsRequest = async () => {
  const res = await axiosClient.get("/season/season-list");
  return res.data;
};

