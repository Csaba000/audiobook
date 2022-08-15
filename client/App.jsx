import * as React from 'react';
import 'react-native-gesture-handler';
import { Nav } from './src/screens/NavigationComp';
import { LoginProvider } from './src/components/IsLoggedIn';
import { AuthProvider } from './src/components/AuthProvider';

const App = () => {
  return (
    <AuthProvider>
      <LoginProvider>
        <Nav />
      </LoginProvider>
    </AuthProvider>
  );
};

export default App;
