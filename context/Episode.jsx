import { useEffect, useState, createContext, useContext } from "react";

export const EpisodeContext = createContext({});

export function EpisodeProvider(props) {
  const { episodeId, currentSecondsRef, children } = props;
  return (
    <EpisodeContext.Provider value={{ episodeId, currentSecondsRef }}>
      {children}
    </EpisodeContext.Provider>
  );
}

export function useEpisode() {
  return useContext(EpisodeContext);
}
