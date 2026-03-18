import { supabase } from "../lib/supabaseClient.js";
import axios from "axios";

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
    .eq("tv_show_id", Number(id))
    .maybeSingle();
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
    .eq("tv_show_id", showId)
    .order("season_number", { ascending: true });

  if (error) {
    throw error;
  }
  return data;
}

export async function getEpisodesBySeasonId(seasonId) {
  let { data, error } = await supabase
    .from("episodes")
    .select("*")
    .eq("season_id", seasonId)
    .order("episode_number", { ascending: false });
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

export async function getSeasonsAndEpisodesByShowId(showId) {
  const seasons = await getSeasonsByShowId(showId);
  const seasonsWithEpisodes = [];

  for (const season of seasons) {
    const episodes = await getEpisodesBySeasonId(season.season_id);
    seasonsWithEpisodes.push({
      ...season,
      episodes,
    });
  }

  return { seasons: seasonsWithEpisodes };
}

export async function getEpisodeById(id) {
  let { data, error } = await supabase
    .from("episodes")
    .select("*")
    .eq("episode_id", id)
    .single();
  if (error) {
    throw error;
  }
  return data;
}

// export async function searchTvShowsByName(name) {
//   try {
//     const { data: localData, error: localError } = await supabase
//       .from("tv_shows")
//       .select("*")
//       .ilike("name", `%${name}%`)
//       .limit(20);

//     if (localError) {
//       throw localError;
//     }
//     if (localData && localData.length > 0) return localData;

//     const externalResponse = await fetch(
//       "https://spillr-be.onrender.com/api/tv-shows",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ show_name: name }),
//       },
//     );

//     if (!externalResponse.ok) {
//       console.error("External API error:", externalResponse.statusText);
//       return "not found";
//     }

//     const externalData = await externalResponse.json();

//     if (externalData && externalData.length > 0) return externalData;

//     return "not found";
//   } catch (error) {
//     console.error("Search failed:", error);
//     return "not found";
//   }
// }

export async function getFeedComments(user_id, offset) {
  try {
    const response = await fetch(
      `https://spillr-be.onrender.com/api/comments/${user_id}/feed?offset=${offset}`,
    );
    const data = await response.json();
    return data.comments;
  } catch (error) {
    console.log("Feed comment search failed", error);
    return [];
  }
}

export async function searchLocalTvShows(name) {
  try {
    const { data, error } = await supabase
      .from("tv_shows")
      .select("*")
      .ilike("name", `%${name}%`)
      .limit(20);

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error("Local search failed:", error);
    return [];
  }
}

export async function searchExternalTvShows(name) {
  try {
    const response = await fetch(
      "https://spillr-be.onrender.com/api/tv-shows",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ show_name: name }),
      },
    );

    if (!response.ok) {
      console.error("External API error:", response.statusText);
      return [];
    }
    const data = await response.json();

    return Array.isArray(data) && data.length > 0 ? data : [];
  } catch (error) {
    console.error("External API failed:", error);
    return [];
  }
}

export async function searchLocalUsers(query) {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("user_id, name, username, avatar_url")
      .or(`username.ilike.%${query}%,name.ilike.%${query}%`)
      .limit(20);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("User search failed:", error);
    return [];
  }
}

export async function getUserById(userId) {
  let { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function getUserByIdAPI(user_id) {
  console.log("fetching", user_id);
  try {
    const { data } = await axios.get(
      `https://spillr-be.onrender.com/api/profiles/id/${user_id}`,
    );
    return data.user;
  } catch (error) {
    throw error;
  }
}

export async function getUserByUsernameAPI(username) {
  console.log("fetching", user_id);
  try {
    const { data } = await axios.get(
      `https://spillr-be.onrender.com/api/profiles/username/${username}`,
    );
    return data.user;
  } catch (error) {
    throw error;
  }
}

export async function getCommentsRepliesReactionsById(userId) {
  console.log("fetching", userId);
  try {
    const { data } = await axios.get(
      `https://spillr-be.onrender.com/api/profiles/${userId}/history`,
    );
    return data.user;
  } catch (error) {
    throw error;
  }
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
