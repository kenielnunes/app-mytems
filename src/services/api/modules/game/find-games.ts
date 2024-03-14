import { api } from "../../api";

export const findGames = async (
  queryParams?: FindGamesQueryParams
): Promise<Game[]> => {
  const searchParams = new URLSearchParams(queryParams);

  const { data } = await api.get(`/games?${searchParams}`);

  return data.content;
};
