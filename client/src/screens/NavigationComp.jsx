import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback
} from 'react';
import { TouchableNativeFeedback, View, ScrollView, Text } from 'react-native';
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
import CategoriesScreen from './CategoriesScreen';
import DetailedBook from './DetailedBook';
import { LoginContext } from '../components/IsLoggedIn';
import { AuthContext } from '../components/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AudioPlayer from '../components/AudioPlayer';
import AudioPlayerModal from '../components/AudioPlayerModal';
// import { AudioContext } from '../components/AudioProvider';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />

        <Stack.Screen name="AudioPlayer" component={AudioPlayer} />
        <Stack.Screen
          name="DetailedBook"
          component={DetailedBook}
          options={{
            headerLeft: () => (
              <TouchableNativeFeedback
                onPress={() => {
                  navigation.navigate('HomeScreen');
                }}
              >
                <Ionicons
                  name="arrow-back"
                  size={32}
                  style={{ padding: 10 }}
                  color={'white'}
                />
              </TouchableNativeFeedback>
            ),
            headerShown: true,
            title: 'Back',
            headerStyle: { backgroundColor: '#23042F' }
          }}
        />
      </>
    </Stack.Navigator>
  );
};

const CategoriesNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <>
        <Stack.Screen name="CategoriesScreen" component={CategoriesScreen} />
        <Stack.Screen
          name="DetailedBook"
          component={DetailedBook}
          options={{
            headerLeft: () => (
              <TouchableNativeFeedback
                onPress={() => {
                  navigation.navigate('CategoriesScreen');
                }}
              >
                <Ionicons name="arrow-back" size={32} style={{ padding: 10 }} color={'white'} />
              </TouchableNativeFeedback>
            ),
            headerShown: true,
            title: 'Back',
            headerStyle: { backgroundColor: '#23042F' },
          }}
        />
      </>
    </Stack.Navigator>
  );
};

const MyTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarHideOnKeyboard: true,
      tabBarInactiveTintColor: '#62466D',
      tabBarActiveTintColor: 'white',
      tabBarShowLabel: false,
      tabBarStyle: [
        {
          backgroundColor: '#23042F',
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
      name="Categories"
      component={CategoriesNavigator}
      options={{
        tabBarIcon: ({ color, size }) => <Ionicons name="list" color={color} size={size} />,
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

const checkToken = async () => {
  const { isLoggedIn, setIsLoggedIn } = React.useContext(LoginContext);
  const { token, setToken } = React.useContext(AuthContext);
  let tokenInStorage = await AsyncStorage.getItem('token');

  if (tokenInStorage) {
    setToken(tokenInStorage);
    setIsLoggedIn(true);
  } else {
    setIsLoggedIn(false);
  }
};

export const Nav = () => {
  const { isLoggedIn, setIsLoggedIn } = React.useContext(LoginContext);
  const { token, setToken } = React.useContext(AuthContext);
  // const { playbackObject } = React.useContext(AudioContext);

  checkToken();

  return (
    // <View>
    <NavigationContainer theme={DarkTheme}>
      {isLoggedIn ? (
        <MyTabs></MyTabs>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <>
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />

            <Stack.Screen name="SignInScreen" component={SignInScreen} />
          </>
        </Stack.Navigator>
      )}
    </NavigationContainer>
    // </View>
  );
};
