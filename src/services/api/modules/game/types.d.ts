type FindGamesQueryParams = {
  name?: string;
  slug?: string;
  released?: string;
  backgroundImage?: string;
};

type Game = {
  id: number;
  name: string;
  slug: string;
  released: string;
  backgroundImage?: string;
};
