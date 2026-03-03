import axiosClient from "../../services/axiosClient";

export const fetchSeasonsRequest = async () => {
  const res = await axiosClient.get("/season/season-list");
  return res.data;
};

export const createSeasonRequest = async (data) => {
  const payload = {
    season_name: data.season_name,
    season_start: data.season_start,
    season_end: data.season_end,
    season_image: data.season_image ?? "",
  };

  await axiosClient.post("/season/create-season", payload);
};
