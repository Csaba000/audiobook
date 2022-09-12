import React, { useState, useEffect, useContext, useCallback } from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  StatusBar,
  Dimensions,
  View,
  TextInput,
  Image,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { BookItem } from '../components/BookItem';
import { BookListHeader } from '../components/BookListHeader';
import axios from 'axios';
import { BACKEND_URL } from '../utils/constants';
import { AuthContext } from '../components/AuthProvider';
import { LoginContext } from '../components/IsLoggedIn';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../constants/colors';
import { AudioContext } from '../components/AudioProvider';
import AudioPlayerModal from '../components/AudioPlayerModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const headers = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: '',
  },
};

const HomeScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [search, setSearch] = useState('');
  const { token, setToken } = useContext(AuthContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  
  const { playbackObject, setPlaybackObject } = useContext(AudioContext);
  const [favs, setFavs] = useState([]);
  let favorites = [];
  let [isLiked, setIsLiked] = useState(false);

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

      axios
        .post(`${BACKEND_URL}/users/listFavorites`, {}, headers)
        .then((resp) => {
          favorites = resp.data;
          setFavs(favorites);
          //console.log(favorites);
        })
        .then(saveFavs())
        .catch(function (error) {
          console.log('Server error: ', error);
        })
        .finally(() => setLoading(false));
    } else {
      setIsLoggedIn(false);
      alert('Login token is not good');
    }

    // if (token) {
    //   headers.headers.Authorization = `Bearer ${token}`;

    //   axios
    //     .post(`${BACKEND_URL}/users/listFavorites`, {}, headers)
    //     .then((resp) => {
    //       favorites = resp.data;
    //       setFavs(favorites);
    //     })
    //     .then(saveFavs())
    //     .catch(function (error) {
    //       console.log('Server error: ', error);
    //     })
    //     .finally(() => setLoading(false));
    // } else {
    //   setIsLoggedIn(false);
    //   alert('Login token is not good');
    // }
  }, []);

  // useFocusEffect(
  //   useCallback(() => {
  //     if (token) {
  //       headers.headers.Authorization = `Bearer ${token}`;

  //       axios
  //         .post(`${BACKEND_URL}/users/listFavorites`, {}, headers)
  //         .then((resp) => {
  //           favorites = resp.data;
  //           setFavs(favorites);
  //         })
  //         .then(saveFavs())
  //         .catch(function (error) {
  //           console.log('Server error: ', error);
  //         })
  //         .finally(() => setLoading(false));
  //     } else {
  //       setIsLoggedIn(false);
  //       alert('Login token is not good');
  //     }
  //   }, [])
  // );

  const saveFavs = async () => {
    //console.log(favs);
    const book = data.map((Book) => {
      const { _id, category, title, author, url, description, lengthInSeconds } = Book;

      //console.log(favs);
      favs.some(async (elem) => {
        if (elem._id === _id) {
          setIsLiked(true);
          try {
            await AsyncStorage.setItem('fav', JSON.stringify(Book));
            //alert('Data successfully saved');
          } catch (e) {
            alert('Failed to save the data to the storage');
          }
        } else {
          setIsLiked(false);
        }
      });
    });
    //console.log(isLiked);
  };

  const searchFilterFunction = (text) => {
    const bookData = data.map((Book) => {
      const { _id, category, title, author, url, description, lengthInSeconds } = Book;
      return {
        _id,
        category,
        title,
        author,
        url,
        description,
        lengthInSeconds,
      };
    });
    //console.log(bookData);
    if (text.trim().length !== 0) {
      const newData = bookData.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase() + item.author.toUpperCase() + item.category.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      //console.log(newData);
      setFilteredBooks(newData);
    }
    //console.log(filteredBooks);
    setSearch(text);
  };

  const renderItem = ({ item }) => {
    // console.log(favs);
    return (
      <BookItem
        title={item.title}
        description={item.description}
        url={`${item.url}.jpg`}
        author={item.author}
        navigation={navigation}
        lengthInSeconds={item.lengthInSeconds}
        id={item._id}
        token={token}
        favorites={favs}
      />
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            marginTop: 20,
            marginBottom: 10,
            paddingBottom: 10,
            paddingHorizontal: 10,
            top: 10,
            flexDirection: 'row',
          }}
        >
          <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
          <View
            style={[
              styles.inputContainer,
              {
                alignItems: 'center',
              },
            ]}
          >
            <Ionicons name="search" style={{ color: COLORS.box, fontSize: 22, marginRight: 10 }} />
            <TextInput
              autoCorrect={false}
              autoCapitalize="none"
              //clearButtonMode="always"
              style={{ color: COLORS.white, flex: 1 }}
              placeholderTextColor={COLORS.grey}
              placeholder="Search..."
              onChangeText={(text) => searchFilterFunction(text)}
              value={search}
              defaultValue={null}
              autoComplete="off"
            />
          </View>
        </View>
        {search ? (
          <FlatList
            overScrollMode="never"
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={filteredBooks}
            renderItem={renderItem}
            keyExtractor={(item, index) => {
              return index;
            }}
          ></FlatList>
        ) : (
          <FlatList
            overScrollMode="never"
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => {
              return index;
            }}
          ></FlatList>
        )}
        {playbackObject != null ? (
        <AudioPlayerModal></AudioPlayerModal>
      ) : (
        <View></View>
      )}
      </SafeAreaView>
    </View>

    // <SafeAreaView style={styles.mainContainer}>
    //   <FlatList
    //     overScrollMode="never"
    //     showsVerticalScrollIndicator={false}
    //     showsHorizontalScrollIndicator={false}
    //     data={data}
    //     ListHeaderComponent={BookListHeader}
    //     renderItem={renderItem}
    //     keyExtractor={(item, index) => {
    //       return index.toString();
    //     }}
    //     stickyHeaderIndices={[0]}
    //   ></FlatList>
    // </SafeAreaView>
  );
};

const dimension = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  // mainContainer: {
  //   backgroundColor: '#391B45',
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  container: {
    flex: 1,
    left: 1,
    right: 1,
    bottom: 1,

    backgroundColor: '#391B45',
  },
  inputContainer: {
    color: COLORS.white,
    height: 55,
    backgroundColor: COLORS.inputBackground,
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 0.5,
    borderRadius: 25,
    elevation: 10,
    flex: 1,
    marginHorizontal: 10,
  },
  logo: {
    width: 55,
    height: 55,
    marginHorizontal: 8,
  },
});

export default HomeScreen;
