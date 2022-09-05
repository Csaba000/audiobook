import { createContext, useState } from 'react';

export const CurrentAudio = createContext({
  currentAudio: null,
  setCurrentAudio: (currentAudio) => {},
  currentIndex: 0,
  setCurrentIndex: (currentIndex) => {},

  isPlaying: false,
  setIsPlaying: (isPlaying) => {},

  playbackStatus: null,
  setPlaybackStatus: (playbackStatus) => {},

  currentTime: null,
  setCurrentTime: (currentTime) => {},
});

export const CurrentAudioProvider = ({ children }) => {
  const [currentAudio, setCurrentAudio] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackStatus, setPlaybackStatus] = useState(null);
  const [currentTime, setCurrentTime] = useState(null)

  return (
    <CurrentAudio.Provider
      value={{
        currentAudio: [currentAudio, setCurrentAudio],
        currentIndex: [currentIndex, setCurrentIndex],
        isPlaying: [isPlaying, setIsPlaying],
        playbackStatus: [playbackStatus, setPlaybackStatus],
        currentTime: [currentTime, setCurrentTime]
      }}
    >
      {children}
    </CurrentAudio.Provider>
  );
};

