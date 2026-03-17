import axios from "axios";

export async function getCommentsByEpisodeId(id) {
  try {
    const { data } = await axios.get(
      `https://spillr-be.onrender.com/api/episodes/${id}/comments`,
    );
    return data.comments;
  } catch (error) {
    throw error;
  }
}

export async function getFilteredCommentsByEpisodeId(id, t) {
  console.log("fetching", id, t);
  try {
    const { data } = await axios.get(
      `https://spillr-be.onrender.com/api/episodes/${id}/comments?t=${t}`,
    );
    return data.comments;
  } catch (error) {
    throw error;
  }
}

export async function getRepliesByCommentId(comment_id) {
  console.log("fetching replies", comment_id);
  try {
    const { data } = await axios.get(
      `https://spillr-be.onrender.com/api/comments/${comment_id}/replies`,
    );
    return data.replies;
  } catch (error) {
    throw error;
  }
}

export async function getTrendingTvShows() {
  try {
    const { data } = await axios.get(
      "https://spillr-be.onrender.com/api/tv-shows?sort_by=comments&order=desc",
    );

    return data;
  } catch (error) {
    throw error;
  }
}
