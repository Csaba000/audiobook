import * as React from 'react';
import 'react-native-gesture-handler';
import { Nav } from './src/screens/NavigationComp';
import { LoginProvider } from './src/components/IsLoggedIn';

const App = () => {
  return (
    <LoginProvider>
      <Nav />
    </LoginProvider>
  );
};

export default App;
