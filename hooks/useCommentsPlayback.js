import { useEffect, useRef } from "react";
import { retryRequest } from "../utils/utilsFunctions";
import {
  getCommentsByEpisodeId,
  getFilteredCommentsByEpisodeId,
} from "../utils/utilsFunctionsByApi";

const useCommentsPlayback = (
  episodeId,
  currentSeconds,
  isPlaying,
  isScrubbing,
  scrubSwitch,
  setComments,
  bufferRef,
  addOptimisticCommentRef,
) => {
  const currentSecondsRef = useRef(currentSeconds);

  const mergeIntoBuffer = (incoming) => {
    const existingIds = new Set(bufferRef.current.map((c) => c.comment_id));
    const newComments = incoming.filter((c) => !existingIds.has(c.comment_id));
    bufferRef.current = [...bufferRef.current, ...newComments];
  };

  //render immediately
  const addOptimisticComment = (newComment) => {
    setComments((prev) => {
      const existingIds = new Set(prev.map((c) => c.comment_id));
      if (existingIds.has(newComment.comment_id)) {
        return prev;
      } else {
        return [newComment, ...prev].sort(
          (a, b) => b.runtime_seconds - a.runtime_seconds,
        );
      }
    });
  };
  addOptimisticCommentRef.current = addOptimisticComment;

  //fectchAhead and store for later
  const fetchAhead = async () => {
    const safeSeconds = Math.floor(currentSecondsRef.current);
    const results = await retryRequest(() =>
      getFilteredCommentsByEpisodeId(episodeId, safeSeconds),
    );
    mergeIntoBuffer(results);
  };

  useEffect(() => {
    currentSecondsRef.current = currentSeconds;
  }, [currentSeconds]);

  // When video is at t=0 and paused, fetch all comments for the episode
  useEffect(() => {
    if (episodeId) {
      if (currentSeconds === 0 && !isPlaying) {
        const fetchAllComments = async () => {
          try {
            const result = await retryRequest(() =>
              getCommentsByEpisodeId(episodeId),
            );
            setComments(result);
          } catch (err) {
            console.error("Failed to fetch comments:", err);
          }
        };
        fetchAllComments();
      }
    }
  }, [currentSeconds, isPlaying, episodeId]);

  //scrubbing pattern
  useEffect(() => {
    if (episodeId && !isScrubbing) {
      const safeSeconds = Math.floor(currentSecondsRef.current);

      const fetchCommentsByTime = async () => {
        const result = await retryRequest(() =>
          getFilteredCommentsByEpisodeId(episodeId, safeSeconds),
        );
        const existingIds = new Set(bufferRef.current.map((c) => c.comment_id));

        const newComments = result.filter(
          (c) => !existingIds.has(c.comment_id),
        );

        bufferRef.current = [...bufferRef.current, ...newComments];

        setComments((prev) => {
          const prevIds = new Set(prev.map((c) => c.comment_id));
          const toAdd = result.filter((c) => !prevIds.has(c.comment_id));

          return [...toAdd, ...prev].sort(
            (a, b) => b.runtime_seconds - a.runtime_seconds,
          );
        });
      };

      fetchCommentsByTime();
    }
  }, [scrubSwitch, isScrubbing]);

  // while playing, 30s polling starts
  // Pre-fetches comments 3 mins ahead into a buffer; never sets comments directly
  useEffect(() => {
    if (episodeId) {
      if (isPlaying && !isScrubbing) {
        const interval = setInterval(fetchAhead, 30000);
        // Reset buffer when playback starts from zero
        if (currentSecondsRef.current === 0) {
          bufferRef.current = [];
          setComments([]);
        }
        fetchAhead();
        return () => clearInterval(interval);
      }
    }
  }, [isPlaying, isScrubbing, episodeId]);

  // reveal buffered comments in real time ──────────────────
  // Runs every second because of ; drip-feeds buffered comments whose timestamp is now due
  useEffect(() => {
    if (!isScrubbing && isPlaying) {
      // newly due is an array created from the buffer array that contains all the comments that are due now using a filter
      const newlyDue = bufferRef.current.filter(
        (c) => c.runtime_seconds <= currentSeconds,
      );
      //buffer current must now drain those comments out of it
      bufferRef.current = bufferRef.current.filter(
        (c) => c.runtime_seconds > currentSeconds,
      );
      //if there is something due set the comments array
      if (newlyDue.length > 0) {
        //else set the comments and deduplicate based on what is already rendered in the comments array
        setComments((prev) => {
          const existingIds = new Set(prev.map((c) => c.comment_id));
          const incoming = newlyDue.filter(
            (c) => !existingIds.has(c.comment_id),
          );
          return [...incoming, ...prev].sort(
            (a, b) => b.runtime_seconds - a.runtime_seconds,
          );
        });
      }
    }
  }, [currentSeconds]);
};

export default useCommentsPlayback;
