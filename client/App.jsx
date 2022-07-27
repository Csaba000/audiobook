import * as React from 'react';
import 'react-native-gesture-handler';
import { useColorScheme } from 'react-native';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './src/screens/HomeScreen';
import MyBooksScreen from './src/screens/MyBooksScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import ProfilScreen from './src/screens/ProfileScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import SignInScreen from './src/screens/SingInScreen';
import COLORS from './src/constants/colors';
import DetailedBook from './src/screens/DetailedBook';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeNavigator = () => (
  <Stack.Navigator screenOptions = {{headerShown: false}} >
    <>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="DetailedBook" component={DetailedBook}options= {{headerShown: true, headerStyle:{backgroundColor:'#AECFA4'}}} />
    </>
  </Stack.Navigator>
);

const MyTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarHideOnKeyboard: true,
      tabBarActiveTintColor: 'black',
      tabBarShowLabel: false,
      tabBarStyle: [
        {
          backgroundColor: '#AECFA4',
          display: 'flex',
        },
        null,
      ],
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeNavigator}
      options={{
        tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />,
      }}
    />
    <Tab.Screen
      name="MyBooks"
      component={MyBooksScreen}
      options={{
        tabBarIcon: ({ color, size }) => <Ionicons name="book-outline" color={color} size={size} />,
      }}
    />
    <Tab.Screen
      name="Favorites"
      component={FavoritesScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="heart-outline" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfilScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="person-outline" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

const MyTheme = {
  dark: true,
  text: COLORS.white,
  background: 'black',
  colors: {
    ...DefaultTheme.colors,
  },
};

const App = () => {
  const isLoggedIn = true;

  return (
    <NavigationContainer>
      {!isLoggedIn ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <>
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            <Stack.Screen name="SignInScreen" component={SignInScreen} />
          </>
        </Stack.Navigator>
      ) : (
        <MyTabs />
      )}
    </NavigationContainer>
  );
};

export default App;
