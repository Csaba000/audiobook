import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import MyBooksScreen from './MyBooksScreen';
import FavoritesScreen from './FavoritesScreen';
import ProfilScreen from './ProfileScreen';
import SignInScreen from './SingInScreen';
import SignUpScreen from './SignUpScreen';
import { LoginContext } from '../components/IsLoggedIn';
import COLORS from '../constants/colors';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

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
      component={HomeScreen}
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

export const Nav = () => {
  const { isLoggedIn, setIsLoggedIn } = React.useContext(LoginContext);

  return (
    <NavigationContainer theme={{ colors: { background: COLORS.tabbar } }}>
      {isLoggedIn ? (
        <MyTabs />
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <>
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />

            <Stack.Screen name="SignInScreen" component={SignInScreen} />
          </>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};
