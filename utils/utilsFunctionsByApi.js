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

// getCommentsByEpisodeId(3129600).then((comments) => {
//   console.log(comments);
// });
