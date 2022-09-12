import { createContext, useState } from 'react';

export const AudioContext = createContext({
    playbackObject: null,
    setPlaybackObject: (playbackObject) => { },
});

export const AudioProvider = ({ children }) => {
    const [playbackObject, setPlaybackObject] = useState(null);

    return (
        <AudioContext.Provider value={{ playbackObject, setPlaybackObject }}>{children}</AudioContext.Provider>
    );
};
