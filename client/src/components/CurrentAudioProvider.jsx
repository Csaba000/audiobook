import { createContext, useState } from 'react';

export const CurrentAudio = createContext({
  currentAudio: null,
  setCurrentAudio: (currentAudio) => {}
});

export const CurrentAudioProvider = ({ children }) => {
  const [currentAudio, setCurrentAudio] = useState(null);

  return (
    <CurrentAudio.Provider value={{ currentAudio, setCurrentAudio }}>
      {children}
    </CurrentAudio.Provider>
  );
};
