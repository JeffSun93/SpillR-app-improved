import { useEffect, useState, createContext, useContext } from "react";

export const EpisodeContext = createContext({});

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
