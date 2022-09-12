import React, { useEffect, useState, useContext, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
  RefreshControl,
} from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../components/AuthProvider';
import { LoginContext } from '../components/IsLoggedIn';
import { headers } from '../utils/constants';
import { BACKEND_URL } from '../utils/constants';
import COLORS from '../constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { AudioContext } from '../components/AudioProvider';
import AudioPlayerModal from '../components/AudioPlayerModal';
import { CurrentAudio } from '../components/CurrentAudioProvider';

const FavoritesScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [search, setSearch] = useState('');
  const { token, setToken } = useContext(AuthContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const { currentAudio, currentIndex } = useContext(CurrentAudio);
  const { playbackObject, setPlaybackObject } = useContext(AudioContext);
  let favorites = [];

  useFocusEffect(
    useCallback(() => {
      if (token) {
        headers.headers.Authorization = `Bearer ${token}`;

        axios
          .post(`${BACKEND_URL}/users/listFavorites`, {}, headers)
          .then((resp) => {
            //console.log(resp.data);
            favorites = resp.data;
            setData(favorites);
            //console.log(data);
          })
          .catch(function (error) {
            console.log('Server error: ', error);
          })
          .finally(() => setLoading(false));
      } else {
        setIsLoggedIn(false);
        alert('Login token is not good');
      }
    }, [])
  );

  const FilteredBookItem = ({ item }) => {
    return (
      <View
        style={{
          padding: 15,
          margin: 5,
          backgroundColor: '#62466D',
          borderRadius: 10,
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate('DetailedBook', { id: item._id })}>
          <Image
            source={{
              uri: `${item.url}.jpg`,
            }}
            style={styles.itemPhotoFiltered}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              fontStyle: 'italic',
              textDecorationLine: 'underline',
              alignSelf: 'center',
              color:'white'
            }}
          >
            My Favorites
          </Text>
        </View>
        {data.length !== 0 ? (
          <FlatList
            overScrollMode="never"
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={data}
            renderItem={({ item }) => <FilteredBookItem item={item} />}
            keyExtractor={(item, index) => {
              return index;
            }}
            style={styles.list}
            numColumns={2}
            contentContainerStyle={{}}
            columnWrapperStyle={{
              justifyContent: 'space-evenly',
              paddingVertical: 5,
            }}
          ></FlatList>
        ) : (
          <View>
            {/* <Image source={require('../assets/nofavs.png')} style={styles.nofavs} /> */}
            <Text style={styles.nofavsText}>Like a book and see it here!</Text>
          </View>
        )}
        {playbackObject != null ? (
        <AudioPlayerModal></AudioPlayerModal>
      ) : (
        <View></View>
      )}
      </SafeAreaView>
    </View>
  );
};

const dimension = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    left: 1,
    right: 1,
    backgroundColor: '#391B45',
  },
  text: {
    color: '#fff',
    fontSize: 44,
  },
  header: {
    paddingTop: 10,
    marginBottom: 10,
    paddingBottom: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  itemTextFiltered: {
    color: COLORS.white,
    paddingTop: 5,
    paddingBottom: 5,
  },
  itemPhotoFiltered: {
    width: 140,
    height: 220,
  },
  nofavs: { alignSelf: 'center', height: 350, width: 350 },
  nofavsText: {
    color:'white',
    fontSize: 30,
    textAlign: 'center',
  },
  list: {},
});

export default FavoritesScreen;
