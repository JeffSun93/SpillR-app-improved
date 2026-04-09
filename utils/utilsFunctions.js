import axios from "axios";
import { url } from "./constants.js";

const urlApi = url + "/api";

export async function getTvShowByName(name) {
  const { data } = await axios.get(`${urlApi}/tv-shows/name/${encodeURIComponent(name)}`);
  return data.show;
}

export async function deleteComment(commentId) {
  await axios.delete(`${urlApi}/comments/${commentId}`);
}

export async function deleteReply(replyId) {
  await axios.delete(`${urlApi}/comments/replies/${replyId}`);
}

export async function getTvShowById(id) {
  const { data } = await axios.get(`${urlApi}/tv-shows/${id}`);
  return data.show;
}

export async function getSeasonsByShowId(showId) {
  const { data } = await axios.get(`${urlApi}/tv-shows/${showId}/seasons`);
  return data.seasons;
}

export async function getSeasonByID(seasonId) {
  const { data } = await axios.get(`${urlApi}/seasons/${seasonId}`);
  return data.season;
}

export async function addSubscriptionAPI(user_id, tv_show_id) {
  const { data } = await axios.post(`${urlApi}/subscriptions`, {
    user_id,
    tv_show_id,
  });
  return data;
}

export async function deleteSubscriptionAPI(user_id, tv_show_id) {
  const { data } = await axios.delete(`${urlApi}/subscriptions`, {
    data: { user_id, tv_show_id },
  });
  return data;
}

export async function fetchFriendRequests(user_id) {
  try {
    const { data } = await axios.get(`${urlApi}/profiles/${user_id}/requests`);
    return data.requests;
  } catch (err) {
    console.log(err);
  }
}

export async function getEpisodesBySeasonId(seasonId) {
  const { data } = await axios.get(`${urlApi}/seasons/${seasonId}/episodes`);
  return data.episodes;
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
  const { data } = await axios.get(`${urlApi}/episodes/${id}`);
  return data.episode;
}

export async function retryRequest(func) {
  const RETRY_COUNT = 4;
  let count = RETRY_COUNT;
  while (count > 0) {
    try {
      return await func();
    } catch (error) {
      if (![502, 503].includes(error?.response?.status) || count === 1)
        throw error;
      await new Promise((res) => setTimeout(res, 2000));
    }
    count -= 1;
  }
}

export async function addFriendRequestAPI(user_id_1, user_id_2) {
  const { data } = await axios.post(`${urlApi}/profiles/friends`, {
    user_id_1,
    user_id_2,
  });
  return data.friend;
}

export async function removeFriendAPI(user_id_1, user_id_2) {
  await axios.delete(`${urlApi}/profiles/friends`, {
    data: { user_id_1, user_id_2 },
  });
}

export async function acceptFriendAPI(user_id_1, user_id_2) {
  const { data } = await axios.patch(`${urlApi}/profiles/friends`, {
    user_id_1,
    user_id_2,
  });
  return data.friend;
}

export async function getFeedComments(user_id, offset) {
  try {
    const response = await fetch(
      `${urlApi}/comments/${user_id}/feed?offset=${offset}`,
    );
    const data = await response.json();
    return data.comments;
  } catch (error) {
    console.log("Feed comment search failed", error);
    return [];
  }
}

export async function getNotificationsForThisUser(user_id) {
  try {
    const response = await fetch(`${urlApi}/notifications/${user_id}`);
    const data = await response.json();
    return data.notifications;
  } catch (error) {
    console.log("Notiifcation fetch failed", error);
  }
}

export async function searchLocalTvShows(name) {
  try {
    const { data } = await axios.get(`${urlApi}/tv-shows/search`, {
      params: { q: name },
    });
    return data.shows || [];
  } catch (error) {
    console.error("Local search failed:", error);
    return [];
  }
}

export async function searchExternalTvShows(name) {
  try {
    const response = await fetch(`${urlApi}/tv-shows`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ show_name: name }),
    });

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
    const { data } = await axios.get(`${urlApi}/profiles/search`, {
      params: { q: query },
    });
    return data.users || [];
  } catch (error) {
    console.error("User search failed:", error);
    return [];
  }
}

export async function getUserByIdAPI(user_id) {
  console.log("fetching", user_id);
  try {
    const { data } = await axios.get(`${urlApi}/profiles/id/${user_id}`);
    return data.user;
  } catch (error) {
    throw error;
  }
}

export async function getUserByUsernameAPI(username) {
  console.log("fetching", username);
  try {
    const { data } = await axios.get(`${urlApi}/profiles/username/${username}`);
    return data.user;
  } catch (error) {
    throw error;
  }
}

export async function getCommentsRepliesReactionsById(userId) {
  console.log("fetching", userId);
  try {
    const { data } = await axios.get(`${urlApi}/profiles/${userId}/history`);
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
