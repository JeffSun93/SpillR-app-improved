import { supabase } from "../lib/supabaseClient";

export async function getTvShowByName(name) {
  let { data, error } = await supabase // get tv show by name
    .from("tv_shows")
    .select("*")
    .ilike("name", name)
    .single();

  if (error) {
    throw error;
  }
  return data;
}

export async function getTvShowById(id) {
  let { data, error } = await supabase // get tv show by id
    .from("tv_shows")
    .select("*")
    .eq("tv_show_id", id)
    .single();
  console.log("Searching for show id:", id);
  if (error) {
    throw error;
  }
  return data;
}

export async function getSeasonsByShowId(showId) {
  let { data, error } = await supabase
    .from("seasons")
    .select("*")
    .eq("tv_show_id", showId);

  if (error) {
    throw error;
  }
  return data;
}

export async function getEpisodesBySeasonId(seasonId) {
  let { data, error } = await supabase
    .from("episodes")
    .select("*")
    .eq("season_id", seasonId);

  if (error) {
    throw error;
  }
  return data;
}

export async function getSeasonsAndEpisodesByShowName(showName) {
  // see returned data format below
  const show = await getTvShowByName(showName);
  const seasons = await getSeasonsByShowId(show.tv_show_id);

  const seasonsWithEpisodes = [];

  for (const season of seasons) {
    const episodes = await getEpisodesBySeasonId(season.season_id);

    seasonsWithEpisodes.push({
      ...season,
      episodes,
    });
  }

  return {
    show,
    seasons: seasonsWithEpisodes,
  };
}

export async function searchTvShowsByName(name) {
  let { data, error } = await supabase
    .from("tv_shows")
    .select("*")
    .ilike("name", `%${name}%`)
    .limit(20);

  if (error) {
    throw error;
  }

  return data;
}
/*
Returned data structure for getSeasonsAndEpisodesByShowName:

{
  show: {
    name: "...",
    description: "...",
    number_of_seasons: ...,
    tv_show_img_url: "...",
    ...
  },

  seasons: [
    {
      season_number: 1,
      episodes: [
        { episode_number: 1 },
        { episode_number: 2 },
        ...
      ]
    },
    {
      season_number: 2,
      episodes: [
        ...
      ]
    }
  ]
}
*/
