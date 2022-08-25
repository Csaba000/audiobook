import { createContext, useState } from 'react';

export const CurrentAudio = createContext({
  currentAudio: null,
  setCurrentAudio: (currentAudio) => {},
  currentIndex: 0,
  setCurrentIndex: (currentIndex) => {}

});

export const CurrentAudioProvider = ({ children }) => {
  const [currentAudio, setCurrentAudio] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <CurrentAudio.Provider
      value={{
        currentAudio: [currentAudio, setCurrentAudio],
        currentIndex: [currentIndex, setCurrentIndex]
      }}
    >
      {children}
    </CurrentAudio.Provider>
  );
};

