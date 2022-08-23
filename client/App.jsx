import * as React from 'react';
import 'react-native-gesture-handler';
import { Nav } from './src/screens/NavigationComp';
import { LoginProvider } from './src/components/IsLoggedIn';
import { AuthProvider } from './src/components/AuthProvider';
import { AudioProvider } from './src/components/AudioProvider';

const App = () => {
  return (
    <AuthProvider>
      <LoginProvider>
        <AudioProvider>
          <Nav />
        </AudioProvider>
      </LoginProvider>
    </AuthProvider>
  );
};

export default App;
