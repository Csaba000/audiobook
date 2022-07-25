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

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    logo: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg',
    title: 'Title1',
    author: 'Author1',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    logo: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg',
    title: 'Title2',
    author: 'Author2',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Title3',
    author: 'Author3',
    logo: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
  },
  {
    id: '48694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Title4',
    author: 'Author4',
    logo: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
  },
  {
    id: '38694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Title5',
    author: 'Author5',
    logo: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
  },
  {
    id: '28694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Title6',
    author: 'Author6',
    logo: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
  },
];

const HomeScreen = () => {
  const renderItem = ({ item }) => (
    <BookItem title={item.title} description={item.description} logo={item.logo} author={item.author} />
  );

  return (
    <SafeAreaView style={styles.mainContainer}>
      <FlatList
        overScrollMode='never'
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={DATA}
        ListHeaderComponent={BookListHeader}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        stickyHeaderIndices={[0]}
      ></FlatList>
    </SafeAreaView>
  );
};

const dimension = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  mainContainer: {
    top: 10,
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#6BBD99',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default HomeScreen;
