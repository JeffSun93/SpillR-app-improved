import { useEffect, useRef } from "react";
import socket from "../socket/connection";

const useSocketComments = (
  episodeId,
  loggedInUser,
  setComments,
  currentSeconds,
  bufferRef,
  addOptimisticCommentRef,
) => {
  const currentSecondsRef = useRef(currentSeconds);

  useEffect(() => {
    currentSecondsRef.current = currentSeconds;
  }, [currentSeconds]);

  useEffect(() => {
    const handleFlagComment = ({ comment_id, isSpoiler }) => {
      setComments((prev) =>
        prev.map((c) =>
          c.comment_id === comment_id ? { ...c, is_spoiler: isSpoiler } : c,
        ),
      );
    };

    const handleRemoveComment = (comment_id) => {
      setComments((prev) => prev.filter((c) => c.comment_id !== comment_id));
    };

    socket.on("comment:flagged", handleFlagComment);
    socket.on("comment:remove", handleRemoveComment);

    return () => {
      socket.off("comment:flagged", handleFlagComment);
      socket.off("comment:remove", handleRemoveComment);
    };
  }, []);

  useEffect(() => {
    const handleNewComment = (newComment) => {
      console.log(newComment);
      if (String(newComment.episode_id) === String(episodeId)) {
        const isOwnComment = newComment.user_id === loggedInUser.user_id;
        const differenceTime = Math.abs(
          newComment.runtime_seconds - currentSecondsRef.current,
        );

        //if the new comment added is near your runtime seconds or it's yours add it immediately
        if (isOwnComment || differenceTime <= 40) {
          addOptimisticCommentRef.current(newComment);
        } else {
          // let the buffer/ticker just handle it at the right time
          bufferRef.current = [...bufferRef.current, newComment];
        }
      }
    };
    socket.on("comment:new", handleNewComment);
    return () => {
      socket.off("comment:new", handleNewComment);
    };
  }, [episodeId, loggedInUser]);
};

export default useSocketComments;
