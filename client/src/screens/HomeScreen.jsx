import React, { useState, useEffect, useContext } from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  StatusBar,
  Dimensions,
  View
} from 'react-native';
import { BookItem } from '../components/BookItem';
import { BookListHeader } from '../components/BookListHeader';
import axios from 'axios';
import { BACKEND_URL } from '../utils/constants';
import { AuthContext } from '../components/AuthProvider';
import { LoginContext } from '../components/IsLoggedIn';
import AudioPlayerModal from '../components/AudioPlayerModal';
import { CurrentAudio } from '../components/CurrentAudioProvider';
import { AudioContext } from '../components/AudioProvider';

const headers = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: ''
  }
};

const HomeScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { token, setToken } = useContext(AuthContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const { playbackObject, setPlaybackObject } = useContext(AudioContext);
  const { currentAudio, setCurrentAudio } = useContext(CurrentAudio);
  

  useEffect(() => {
    if (token) {
      headers.headers.Authorization = `Bearer ${token}`;
      axios
        .get(`${BACKEND_URL}/books`, headers)
        .then(({ data }) => {
          setData(data);
        })
        .catch((error) => alert('Server error: ', error))
        .finally(() => setLoading(false));
    } else {
      setIsLoggedIn(false);
      alert('Login token is not good');
    }
  }, []);

  const renderItem = ({ item }) => {
    return (
      <BookItem
        title={item.title}
        description={item.description}
        url={`${item.url}.jpg`}
        author={item.author}
        navigation={navigation}
        lengthInSeconds={item.lengthInSeconds}
        id={item._id}
      />
    );
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <FlatList
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={data}
        ListHeaderComponent={BookListHeader}
        renderItem={renderItem}
        keyExtractor={(item, index) => {
          return index.toString();
        }}
        stickyHeaderIndices={[0]}
      ></FlatList>
       {playbackObject != null ? (
        <AudioPlayerModal></AudioPlayerModal>
      ) : (
        <View></View>
      )}
    </SafeAreaView>
    
  );
};

const dimension = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#391B45',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default HomeScreen;
