import * as React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import homeScreen from './src/screens/HomeScreen';
import MyBooksScreen from './src/screens/MyBooksScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import ProfilScreen from './src/screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const MyTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: 'green',
      tabBarInactiveTintColor: 'red',
      tabBarShowLabel: false,
      tabBarStyle: [
        {
          display: 'flex',
        },
        null,
      ],
    }}
  >
    <Tab.Screen
      name="List"
      component={homeScreen}
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
      name="Profil"
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
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'red',
  },
};

const App = () => (
  <NavigationContainer theme={MyTheme}>
    <MyTabs />
  </NavigationContainer>
);

export default App;
