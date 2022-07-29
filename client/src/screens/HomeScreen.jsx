import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  StatusBar,
  Dimensions,
} from 'react-native';
import { BookItem } from '../components/BookItem';
import { BookListHeader } from '../components/BookListHeader';
import axios from 'axios';
import { BACKEND_URL } from '../utils/constants';

const headers = {
  headers: {
    "Content-Type": "application/json"
  }
}

const HomeScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);



  useEffect(() => {
    axios.get(`${BACKEND_URL}/books`, headers)
      .then(({ data }) => {
        setData(data)
      }).catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const renderItem = ({ item }) => {
    return (
      <BookItem title={item.title}
        description={item.description}
        coverUrl={item.coverUrl}
        author={item.author}
        navigation={navigation}
        lengthInSeconds={item.lengthInSeconds} id={item._id} />
    );
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <FlatList
        overScrollMode='never'
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
  }
});

export default HomeScreen;
