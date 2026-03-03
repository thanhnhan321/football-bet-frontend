import axiosClient from "../../services/axiosClient";

export const fetchMatchesRequest = async () => {
  const res = await axiosClient.get("/match/match-list");
  return res.data;
};

export const createMatchRequest = async (data) => {
  await axiosClient.post("/match/create-match", data);
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
