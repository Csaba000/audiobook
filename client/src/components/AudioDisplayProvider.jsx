import { createContext, useState } from 'react';

export const AudioDisplayContext = createContext({
  //false nagy display
  //true kicsi display
    audioDisplay: false,
    setAudioDisplay: (audioDisplay) => { },
});

export const AudioDisplayProvider = ({ children }) => {
    const [audioDisplay, setAudioDisplay] = useState(false);

    return (
        <AudioDisplayContext.Provider value={{ audioDisplay, setAudioDisplay }}>{children}</AudioDisplayContext.Provider>
    );
};
