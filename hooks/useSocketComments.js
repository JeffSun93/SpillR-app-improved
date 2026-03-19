import { useState, useEffect, useRef, useContext } from "react";
import { UserContext } from "../context/User";
import { socket } from "../socket/connection";

const useSocketComments = (
  episodeId,
  currentSeconds,
  isPlaying,
  isScrubbing,
) => {
  const { loggedInUser } = useContext(UserContext);
  const currentSecondsRef = useRef(currentSeconds);
  useEffect(() => {
    socket.on("comment:new", handleNewComment);
    socket.on("comment:flagged", handleFlagComment);

    return () => {
      socket.off("comment:new", handleNewComment);
      socket.off("comment:flagged", handleFlagComment);
    };
  }, [episodeId]);

  const handleNewComment = (newComment) => {
    if (newComment.episode_id === episodeId) {
      const isOwnComment = newComment.user_id === loggedInUser.user_id;
      const differenceTime = Math.abs(
        newComment.runtime_seconds - currentSecondsRef.current,
      );
      // let the buffer/ticker just handle it at the right tim
      bufferRef.current = [...bufferRef.current, newComment];
      //if the new comment added is near your runtime seconds or it's yours add it immediately
      if (isOwnComment || differenceTime <= 40) {
        addOptimisticCommentRef.current(newComment);
      }
    }
  };

  const handleFlagComment = ({ comment_id, isSpoiler }) => {
    setComments((prev) =>
      prev.map((c) =>
        c.comment_id === comment_id ? { ...c, is_spoiler: isSpoiler } : c,
      ),
    );
  };
  return { comments, repliesByComment, postComment, deleteComment, postReply };
};

export default useSocketComments;
