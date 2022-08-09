import * as React from 'react';
import 'react-native-gesture-handler';
import { Nav } from './src/screens/NavigationComp';
import { LoginProvider } from './src/components/IsLoggedIn';
import { AuthProvider } from './src/components/AuthProvider';
// import TrackPlayer from 'react-native-track-player';


const App = () => {
  // TrackPlayer.registerPlaybackService(() => require('./src/utils/service.js'));
  return (
    <AuthProvider>
      <LoginProvider>
        <Nav />
      </LoginProvider>
    </AuthProvider>
  );
};

export default App;
