import { useEffect, useState, createContext } from "react";

export const EpisodeContext = createContext(null);

export function EpisodeProvider(props) {
  const { episodeId, children } = props;
  return (
    <EpisodeContext.Provider value={{ episodeId }}>
      {children}
    </EpisodeContext.Provider>
  );
}

export function useEpisode() {
  return useContext(EpisodeContext);
}
