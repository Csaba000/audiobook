import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, FlatList, StyleSheet, StatusBar, Dimensions } from 'react-native';
import { BookItem } from '../components/BookItem';
import { BookListHeader } from '../components/BookListHeader';
import axios from 'axios';
import { BACKEND_URL } from '../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../components/AuthProvider';
import { LoginContext, LoginProvider } from '../components/IsLoggedIn';

// export async function getToken() {

//   // // let token = await AsyncStorage.getItem('token')
//   // let obj = JSON.parse(token);
//   // let tokenValue = obj.access_token;
//   return token
// }

// export const getTokenFromStorage = async () => {
//   const { token, setToken } = useContext(AuthContext);

//   let tokenInStorage = await AsyncStorage.getItem('token');
//   setToken(tokenInStorage)
//   console.log(token)
//   return tokenInStorage
// }

const headers = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: '',
  },
};

const HomeScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { token, setToken } = useContext(AuthContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

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
        coverUrl={item.coverUrl}
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
    </SafeAreaView>
  );
};

const dimension = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#391B45',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
