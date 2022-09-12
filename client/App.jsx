import * as React from 'react';
import 'react-native-gesture-handler';
import { Nav } from './src/screens/NavigationComp';
import { LoginProvider } from './src/components/IsLoggedIn';
import { AuthProvider } from './src/components/AuthProvider';
import { AudioProvider } from './src/components/AudioProvider';
import { CurrentAudioProvider } from './src/components/CurrentAudioProvider';

const App = () => {
  return (
    <AuthProvider>
      <LoginProvider>
        <AudioProvider>
          <CurrentAudioProvider>
            <Nav />
          </CurrentAudioProvider>
        </AudioProvider>
      </LoginProvider>
    </AuthProvider>
  );
};

export default App;
