type FindGamesQueryParams = {
  name?: string;
  slug?: string;
  released?: string;
  backgroundImage?: string;
};

type Game = {
  name: string;
  slug: string;
  released: string;
  backgroundImage?: string;
};
