import axiosClient from "../../services/axiosClient";

export const fetchMatchesRequest = async () => {
  const res = await axiosClient.get("/api/matches");
  return res.data;
};

export const createMatchRequest = async (data) => {
  await axiosClient.post("/api/matches", data);
};

export const updateScoreRequest = async ({ id, home_score, away_score }) => {
  await axiosClient.put(`/api/matches/${id}/score`, {
    home_score,
    away_score,
  });
};

export const deleteMatchRequest = async (id) => {
  await axiosClient.delete(`/api/matches/${id}`);
};
