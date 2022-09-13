import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, TouchableNativeFeedback, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { headers } from '../utils/constants';
import { LoginContext } from './IsLoggedIn';
import { BACKEND_URL } from '../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FavoritesScreen from '../screens/FavoritesScreen';
import { useFocusEffect } from '@react-navigation/native';

export const BookItem = ({
  title,
  description,
  url,
  author,
  navigation,
  lengthInSeconds,
  id,
  token,
  favorites,
}) => {
  const [iconName, setIconName] = useState('heart-outline');
  const [isLoading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [fav, setFav] = useState([]);
  const book = {
    title,
    description,
    url,
    author,
    lengthInSeconds,
    id,
  };


  useEffect(() => {
    readData();
    isFav();
  }, []);

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('fav', JSON.stringify(book));
    } catch (e) {
      alert('Failed to save the data to the storage');
    }
  };

  const readData = async () => {
    try {
      const value = await AsyncStorage.getItem('fav');

      if (value !== null) {
        setFav(value);
      }
    } catch (e) {
      alert('Failed to fetch the input from storage');
    }
  };

  const removeData = async (item) => {
    try {
      await AsyncStorage.removeItem('fav');
    } catch (e) {
      alert('Failed to remove data from the storage');
    }
  };

  const removeFromFavs = () => {
    if (token) {
      headers.headers.Authorization = `Bearer ${token}`;

      axios
        .post(`${BACKEND_URL}/users/removeFromFavorites`, { email, id }, headers)
        .then((resp) => {
        })
        .catch(function (error) {
          console.log('Server error: ', error);
        })
        .finally(() => setLoading(false));
    } else {
      setIsLoggedIn(false);
      alert('Login token is not good');
    }
  };

  const addToFavs = () => {
    if (token) {
      headers.headers.Authorization = `Bearer ${token}`;

      axios
        .post(`${BACKEND_URL}/users/favorites`, { email, id }, headers)
        .then((resp) => {
        })
        .catch(function (error) {
          console.log('Server error: ', error);
        })
        .finally(() => setLoading(false));
    } else {
      setIsLoggedIn(false);
      alert('Login token is not good');
    }
  };

  const getEmail = () => {
    if (token) {
      headers.headers.Authorization = `Bearer ${token}`;

      axios
        .post(`${BACKEND_URL}/users/currentUser`, { email }, headers)
        .then((resp) => {
          setEmail(resp.data);
        })
        .catch(function (error) {
          console.log('Server error: ', error);
        })
        .finally(() => setLoading(false));
    } else {
      setIsLoggedIn(false);
      alert('Login token is not good');
    }
  };

  const isFav = () => {
    favorites.some(async (elem) => {
      if (elem._id === id) {
        setIconName('heart-sharp');
      } else {
        setIconName('heart-outline');
      }
    });
  };

  return (
    <TouchableNativeFeedback
      onPress={() => {
        navigation.navigate('DetailedBook', { id: id });
      }}
    >
      <View style={styles.item}>
        <Image style={styles.logoImage} source={{ uri: url }} />
        <View style={styles.viewContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Ionicons
            style={styles.favoriteIcon}
            name={iconName}
            size={28}
            color="white"
            onPress={() => {
              if (iconName == 'heart-outline') {
                setIconName('heart-sharp');
                getEmail();
                addToFavs();
                saveData();

              }
              if (iconName == 'heart-sharp') {
                setIconName('heart-outline');
                removeFromFavs();
                removeData();

              }
            }}
          />

          <Text style={styles.author}>{author}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text numberOfLines={2} style={styles.description}>
              {description}
            </Text>
          </View>
          <View style={{ flexDirection: 'column' }}>
            <Text numberOfLines={2} style={styles.durationText}>
              Duration: {lengthInSeconds}s
            </Text>
            <Ionicons
              style={styles.favoriteIcon}
              name="play-circle-outline"
              size={28}
              color="white"
              onPress={() => {
                navigation.navigate('AudioPlayer', { selectedId: id });
              }}
            />
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  item: {
    elevation: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: '#62466D',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    marginRight: 25,
    color: 'white',
    paddingLeft: 8,
    fontSize: 17,
    fontWeight: 'bold',
  },
  author: {
    color: 'white',
    paddingLeft: 8,
    fontSize: 12,
  },
  description: {
    color: 'white',
    padding: 10,
    fontSize: 12.3,
    flexShrink: 1,
  },
  logoImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  viewContainer: {
    flexDirection: 'column',
    flexShrink: 1,
  },
  favoriteIcon: {
    alignSelf: 'flex-end',
    marginTop: -5,
    position: 'absolute',
  },
  durationText: {
    fontSize: 10,
    color: 'white',
    flexShrink: 1,
    paddingLeft: 10,
  },
});
